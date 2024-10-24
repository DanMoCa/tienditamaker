import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/config/database";
import User from "@/models/user";
import Shop from "@/models/shop";

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

      // Conectar a MongoDB
      await dbConnect();

      // Determinar el tipo de usuario basado en el monto
      let isPaidUser: "free" | "initial" | "lifetime";
      if (amount === 59900) {
        isPaidUser = "initial";
      } else if (amount === 249900) {
        isPaidUser = "lifetime";
      } else {
        console.error("❌ Invalid amount:", amount); // Debug log
        throw new Error("Invalid payment amount");
      }

      console.log(
        `💰 Processing payment for ${email} with amount ${amount} to type ${isPaidUser}`
      ); // Debug log

      // Actualizar el usuario en la base de datos
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { isPaidUser: isPaidUser },
        { new: true }
      );

      if (!updatedUser) {
        console.error("❌ User not found for email:", email); // Debug log
        throw new Error("User not found");
      }

      console.log(`✅ Successfully updated user ${email} to ${isPaidUser}`); // Debug log

      const nuevaTienda = await Shop.create({
        subdominio: "",
        nombre: `tiendita de ${updatedUser.name}`,
        colores: [
          { nombre: "colorPrimario", valor: "#fff" },
          { nombre: "colorSecundario", valor: "#000" },
        ],
        logo: "",
        eslogan: `la mejor tienda de ${updatedUser.name}`,
        template: "default",
        user: updatedUser._id, // Relacionar la tienda con el usuario
      });

      console.log(`✅ Tienda creada`); // Debug log

      return NextResponse.json({
        status: "success",
        message:
          `User ${updatedUser.email} updated to ${isPaidUser} plan` +
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

export const config = {
  api: {
    bodyParser: false,
  },
};
