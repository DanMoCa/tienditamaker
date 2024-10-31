import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { saveDataToDatabase } from "@/utils/actions/store/shipping";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = "whsec_F9CyGFJ19vTiXhvboEJLWjUC0PtTdLzx";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    // Verificar que el evento viene de Stripe
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (err: any) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Manejar el evento de pago exitoso
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Aquí puedes guardar la dirección en tu base de datos
      const address = session.shipping_details;
      const metadata = session.metadata;
      const userId = metadata!.userId;
      console.log("🏠 Address4 from session:", address); // Debug log
      console.log("🏠 Metadata from session:", { metadata }); // Debug log
      console.log("🏠 User ID from metadata:", userId); // Debug log

      if (address) {
        await saveDataToDatabase(address); // Implementa esta función según tu lógica
      }
    }

    return NextResponse.json({
      status: "success",
      message: "Webhook received",
    });
  } catch (error: any) {
    console.error("💥 Webhook error:", error);
    return NextResponse.json(
      {
        error: `Webhook Error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
