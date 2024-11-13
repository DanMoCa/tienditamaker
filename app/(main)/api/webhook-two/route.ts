import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { saveDataToDatabase } from "@/utils/actions/store/shipping";
import { z } from "zod"; // Para validación de datos
import { Resend } from "resend";
import { EmailTemplateTwo } from "@/components/ui/email-template-two";

// Validación del environment
const requiredEnvVars = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  STRIPE_WEBHOOK_SECRET_TWO: process.env.STRIPE_WEBHOOK_SECRET_TWO!,
} as const;

// Validar variables de entorno al inicio
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

// Inicializar Stripe con tipo strict
const stripe = new Stripe(requiredEnvVars.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY!);

// Schema actualizado para incluir la dirección completa
const AddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  line1: z.string(),
  line2: z.string().optional(),
  postal_code: z.string(),
  state: z.string(),
});

const CustomerDataSchema = z.object({
  address: AddressSchema,
  email: z.string().email(),
  name: z.string(),
  phone: z.string(),
});
// Schema de validación para los datos de envío
const ShippingDataSchema = z.object({
  customerData: CustomerDataSchema,
  storeId: z.string(),
  cartItems: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().int().positive(),
      subtotal: z.number().int().positive(),
    })
  ),
});

// Tipos basados en el schema
type ShippingData = z.infer<typeof ShippingDataSchema>;

// Clase personalizada para errores del webhook
class WebhookError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public operational: boolean = true
  ) {
    super(message);
    this.name = "WebhookError";
  }
}

// Handler principal del webhook
export async function POST(req: NextRequest) {
  try {
    const { payload, event } = await verifyAndParseWebhook(req);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event);
      return NextResponse.json({
        status: "success",
        message: "Shipping data processed successfully",
      });
    }

    // Respuesta para otros tipos de eventos
    return NextResponse.json({
      status: "success",
      message: `Webhook received: ${event.type}`,
    });
  } catch (error) {
    return handleWebhookError(error);
  }
}

// Función para verificar y parsear el webhook
async function verifyAndParseWebhook(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    throw new WebhookError("No signature found in request", 400);
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      requiredEnvVars.STRIPE_WEBHOOK_SECRET_TWO
    );
    return { payload, event };
  } catch (err) {
    throw new WebhookError(
      `Webhook signature verification failed: ${
        err instanceof Error ? err.message : "Unknown error"
      }`,
      400
    );
  }
}

// Manejador específico para checkout completado
async function handleCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.metadata?.storeId || !session.metadata?.cartItems) {
    throw new WebhookError("Missing required metadata in session");
  }

  const shippingData = parseShippingData(session);

  try {
    const result = await saveDataToDatabase(shippingData);
    console.info("Shipping data saved successfully:", {
      storeId: shippingData.storeId,
    });
    // Enviar correo electrónico después del pago
    const { data, error } = await resend.emails.send({
      from: "jorge de tienditamaker<jemg2510@gmail.com>",
      to: [shippingData.customerData.email], // Asegúrate de que el email esté disponible
      subject: "gracias por tu compra",
      react: EmailTemplateTwo({ firstName: shippingData.customerData.name }),
    });
    console.log("📧 Email sent:", data);

    return result;
  } catch (error) {
    console.error("Failed to save shipping data:", error);
    throw new WebhookError("Failed to process shipping data", 500);
  }
}

// Parser para los datos de envío
function parseShippingData(session: Stripe.Checkout.Session): ShippingData {
  const { metadata, customer_details } = session;

  if (!metadata?.cartItems) {
    throw new WebhookError("Missing cart items in session metadata");
  }

  const parsedData = {
    customerData: customer_details || {},
    storeId: metadata.storeId,
    cartItems: JSON.parse(metadata.cartItems),
  };

  // Validar datos contra el schema
  const result = ShippingDataSchema.safeParse(parsedData);

  if (!result.success) {
    throw new WebhookError(`Invalid shipping data: ${result.error.message}`);
  }

  return result.data;
}

// Manejador de errores centralizado
function handleWebhookError(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";
  const statusCode = error instanceof WebhookError ? error.statusCode : 500;

  console.error("Webhook error:", {
    message: errorMessage,
    statusCode,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}
