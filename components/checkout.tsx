"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/converToSubcurrency";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export const CheckoutPage = ({ amount }: { amount: number }) => {
  const { data: session } = useSession();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubCurrency(amount),
        email: session?.user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [amount, session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setError(submitError.message ? submitError.message : "error desconocido");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setError(error.message ? error.message : "error desconocido");
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {error && <p>{error}</p>}
      <Button
        disabled={!stripe || loading}
        className="w-full p-5 mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {loading ? "cargando..." : `pagar $${amount} MXN`}
      </Button>
    </form>
  );
};
