import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

// Validación de variables de entorno
const requiredEnvVars = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS?.split(",") || [
    "tienditamaker.com",
  ],
} as const;

// Verificar variables de entorno
if (!requiredEnvVars.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

// Inicializar Stripe con configuración tipada
const stripe = new Stripe(requiredEnvVars.STRIPE_SECRET_KEY!);

// Schemas de validación
const CartItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  image: z.string().url().optional(),
  size: z.string().optional(),
});

const CheckoutRequestSchema = z.object({
  cartItems: z.array(CartItemSchema),
  subdomain: z.string().min(1),
  storeId: z.number().min(1),
});

type CartItem = z.infer<typeof CartItemSchema>;
type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;

// Clase para errores personalizados
class CheckoutError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public code?: string
  ) {
    super(message);
    this.name = "CheckoutError";
  }
}

export async function POST(request: Request) {
  try {
    const checkoutData = await validateRequest(request);
    const session = await createCheckoutSession(checkoutData);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return handleCheckoutError(error);
  }
}

async function validateRequest(request: Request): Promise<CheckoutRequest> {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    throw new CheckoutError("Invalid request body", 400);
  }

  const result = CheckoutRequestSchema.safeParse(body);

  if (!result.success) {
    console.error("Validation error:", result.error.format());
    throw new CheckoutError("Invalid request data", 400);
  }

  return result.data;
}

function createLineItems(cartItems: CartItem[]) {
  return cartItems.map((item) => {
    // Definimos el product_data primero para asegurar su tipo
    const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData =
      {
        name: item.name + (item.size ? ` - ${item.size}` : ""),
        description: item.description,
        images: item.image ? [item.image] : [],
      };

    // Creamos el line item con el product_data ya tipado
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "mxn",
        unit_amount: Math.round(item.price * 100),
        product_data: productData, // Ahora está correctamente tipado
      },
      quantity: item.quantity,
    };

    return lineItem;
  });
}

function createMetadata(
  cartItems: CartItem[],
  subdomain: string,
  storeId: number
) {
  return {
    cartItems: JSON.stringify(
      cartItems.map((item) => ({
        product: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        subtotal: item.price * item.quantity,
      }))
    ),
    subdomain,
    storeId,
  };
}

function validateDomain(subdomain: string): string {
  const baseDomain = requiredEnvVars.ALLOWED_DOMAINS[0];
  const fullDomain = `${subdomain}.${baseDomain}`;

  // Aquí podrías agregar validaciones adicionales del dominio
  return fullDomain;
}

async function createCheckoutSession(data: CheckoutRequest) {
  const { cartItems, subdomain, storeId } = data;
  const domain = validateDomain(subdomain);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "oxxo"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["MX"],
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items: createLineItems(cartItems),
      mode: "payment",
      success_url: `http://${domain}/success`,
      cancel_url: `http://${domain}/cancel`,
      metadata: createMetadata(cartItems, subdomain, storeId),
    });

    console.info("Checkout session created successfully", {
      sessionId: session.id,
      storeId,
      itemCount: cartItems.length,
    });

    return session;
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    throw new CheckoutError(
      "Failed to create checkout session",
      500,
      "STRIPE_SESSION_FAILED"
    );
  }
}

function handleCheckoutError(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : "Unknown error occurred";
  const statusCode = error instanceof CheckoutError ? error.statusCode : 500;

  console.error("Checkout error:", {
    message: errorMessage,
    code: error instanceof CheckoutError ? error.code : "UNKNOWN_ERROR",
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      error: errorMessage,
    },
    { status: statusCode }
  );
}
