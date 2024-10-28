import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems } = body;

    // Transformar los items del carrito al formato que espera Stripe
    const lineItems = cartItems.map((item: any) => {
      // Crear el objeto base del producto
      const lineItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description || undefined,
            images: [] as string[], // Define images as an array of strings
          },
          unit_amount: Math.round(item.price * 100), // Stripe espera el precio en centavos
        },
        quantity: item.quantity,
      };

      // Solo agregar imágenes si la URL es válida
      if (
        item.image &&
        typeof item.image === "string" &&
        item.image.startsWith("http")
      ) {
        lineItem.price_data.product_data.images = [item.image];
      }

      return lineItem;
    });

    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      {
        error: "Error creating checkout session",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
