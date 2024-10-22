"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/lib/converToSubcurrency";
import { CheckoutPage } from "./checkout";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing Stripe public key");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const amount = 600;

export default function Payment() {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        currency: "mxn",
        amount: convertToSubCurrency(amount),
      }}
    >
      <CheckoutPage amount={amount} />
    </Elements>
  );
}
