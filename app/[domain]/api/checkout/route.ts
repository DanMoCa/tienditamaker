import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Checkout body:", body);
    console.log("Checkout userId:", body.userId);
    console.log("Checkout subdomain:", body.subdomain);

    const { cartItems, subdomain, storeId } = body;

    // Transformar los items del carrito al formato que espera Stripe
    const lineItems = cartItems.map((item: any) => {
      // Crear el objeto base del producto
      const lineItem = {
        price_data: {
          currency: "mxn",
          product_data: {
            id: item.id,
            name: item.name,
            description: item.description || undefined,
            images: [] as string[], // Define images as an array of strings
          },
          unit_amount: Math.round(item.price * 100), // Stripe espera el precio en centavos
        },
        quantity: item.quantity,
      };
      console.log("Line item:", lineItem);

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
      payment_method_types: ["card", "oxxo"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["MX"],
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items: lineItems,
      mode: "payment",
      //   TODO: Update the success_url and cancel_url to match custom domain
      success_url: `http://${subdomain}.tienditamaker.com/success`,
      cancel_url: `http://${subdomain}.tienditamaker.com/cancel`,
      metadata: {
        cartItems: JSON.stringify(
          cartItems.map((item: any) => {
            return {
              product: item.name,
              quantity: item.quantity,
              price: item.price,
              subtotal: item.price * item.quantity,
            };
          })
        ),
        subdomain,
        storeId,
      },
    });
    console.log("Checkout session created:", session);
    console.log("Checkout session ID:", session.id);

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
