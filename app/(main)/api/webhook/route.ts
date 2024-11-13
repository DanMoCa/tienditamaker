import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { findCheckoutSession } from "@/lib/stripe";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const endpointSecret = "whsec_ztMgJqaieKejjs90tWdHPoKjYuiescYQ";
const resend = new Resend(process.env.RESEND_API_KEY!);

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

    // Manejar el evento de checkout completado
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("💳 Session:", session); // Debug log
      console.log("💳 Checkout Session:", session.id); // Debug log

      const email = session.customer_details?.email;
      const subscriptionId = session.subscription as string;

      console.log("📧 Email from session:", email); // Debug log
      console.log("🔄 Subscription ID:", subscriptionId); // Debug log

      if (!email) {
        throw new Error("No user email found in checkout session");
      }

      // Obtener detalles de la suscripción
      let priceId;
      if (session.subscription) {
        console.log("🔄 Subscription ID:", session.subscription); // Debug log
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        priceId = subscription.items.data[0].price.id;
      } else {
        // Para pagos únicos (lifetime), obtener el price ID directamente de la sesión
        priceId = session.line_items?.data[0]?.price!.id;
        if (!priceId) {
          // Fallback: intentar obtener de los metadatos o de otra fuente
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          );
          priceId = lineItems.data[0]?.price?.id;
        }
      }

      // Determinar el tipo de usuario basado en el price ID
      let userType: "free" | "initial" | "lifetime";
      switch (priceId) {
        case process.env.STRIPE_MONTHLY_PRICE_ID:
        case process.env.STRIPE_ANNUAL_PRICE_ID:
          userType = "initial";
          break;
        case process.env.STRIPE_LIFETIME_PRICE_ID:
          userType = "lifetime";
          break;
        default:
          userType = "free";
      }

      console.log(
        `💰 Processing subscription for ${email} with price ${priceId} to type ${userType}`
      ); // Debug log

      // Actualizar el usuario en la base de datos
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          userType: userType,
        },
      });

      // Enviar email de confirmación
      const { data, error } = await resend.emails.send({
        from: "tienditamaker<noreply@tienditamaker.com>",
        to: [email],
        subject: "gracias por tu suscripción en tienditamaker",
        react: EmailTemplate({ firstName: updatedUser.name }),
      });
      console.log("📧 Email sent:", data); // Debug log

      if (error) {
        console.error("❌ Email sending failed:", error); // Debug log
        return Response.json({ error }, { status: 500 });
      }

      if (!updatedUser) {
        console.error("❌ User not found for email:", email); // Debug log
        throw new Error("User not found");
      }

      console.log(`✅ Successfully updated user ${email} to ${userType}`); // Debug log

      // Crear tienda para el usuario
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
        message: `User ${updatedUser.email} updated to ${userType} plan and new store created`,
      });
    }

    // Manejar evento de suscripción cancelada
    // if (event.type === "customer.subscription.deleted") {
    //   const subscription = event.data.object as Stripe.Subscription;
    //   const email = subscription.metadata.email;

    //   if (email) {
    //     await prisma.user.update({
    //       where: { email },
    //       data: {
    //         userType: "free",
    //       },
    //     });
    //     console.log(
    //       `🔄 User ${email} subscription cancelled, reverted to free plan`
    //     );
    //   }
    // }

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
