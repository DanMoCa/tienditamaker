import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const amount = paymentIntent.amount;

      // Obtener el email del metadata
      const email = paymentIntent.metadata?.email;

      console.log("📧 Email from metadata:", email); // Debug log

      if (!email) {
        throw new Error("No user email found in payment intent metadata");
      }

      // Determinar el tipo de usuario basado en el monto
      let userType: "free" | "initial" | "lifetime";
      if (amount === 59900) {
        userType = "initial";
      } else if (amount === 249900) {
        userType = "lifetime";
      } else {
        console.error("❌ Invalid amount:", amount); // Debug log
        throw new Error("Invalid payment amount");
      }

      console.log(
        `💰 Processing payment for ${email} with amount ${amount} to type ${userType}`
      ); // Debug log

      // Actualizar el usuario en la base de datos
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { userType: userType },
      });

      if (!updatedUser) {
        console.error("❌ User not found for email:", email); // Debug log
        throw new Error("User not found");
      }

      console.log(`✅ Successfully updated user ${email} to ${userType}`); // Debug log

      const newStore = await prisma.store.create({
        data: {
          name: `tiendita de ${updatedUser.name}`,
          subdomain: "",
          description: `La mejor tienda de ${updatedUser.name}`,
          colors: ["#fff", "#000"],
          slogan: `la mejor tienda de ${updatedUser.name}`,
          logo: "",
          template: "default",
          user: { connect: { email: updatedUser.email } },
        },
      });

      if (!newStore) {
        console.error("❌ Store creation failed for user:", updatedUser.email); // Debug log
        throw new Error("Store creation failed");
      }

      console.log(`✅ Tienda creada`); // Debug log

      return NextResponse.json({
        status: "success",
        message:
          `User ${updatedUser.email} updated to ${userType} plan` +
          ` and new store created`,
      });
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
