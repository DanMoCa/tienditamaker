"use client";

import { ReactNode } from "react";
import { CartProvider as ProviderCart } from "use-shopping-cart";
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <ProviderCart
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl="http://localhost:3000/success"
      cancelUrl="http://localhost:3000"
      currency="MXN"
      billingAddressCollection={false}
      shouldPersist={true}
      language="es-MX"
    >
      {children}
    </ProviderCart>
  );
}
