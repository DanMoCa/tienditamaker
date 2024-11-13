import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount, email } = await req.json();
    console.log(amount);
    console.log(req.body);

    console.log(email);
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    //  Esto es para crear un intento de pago con Stripe de suscripción por 89
    if (amount === 8900) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "mxn",
        setup_future_usage: "off_session",
        automatic_payment_methods: { enabled: true },
        metadata: {
          email: email,
        },
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "mxn",
        automatic_payment_methods: { enabled: true },
        metadata: {
          email: email,
        },
      });
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: `Error al crear el intento de pago: ${error}`,
      },
      { status: 500 }
    );
  }
}
