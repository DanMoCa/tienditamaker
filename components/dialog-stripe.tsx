import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, useRef, useMemo } from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/lib/converToSubcurrency";
import { CheckoutPage } from "./checkout";
import { useSession } from "next-auth/react";
import LoginToPay from "./login-to-pay";

export default function Component({
  children,
  plan,
  isAnnual,
}: {
  children: React.ReactNode;
  plan: string;
  isAnnual: boolean;
}) {
  const { data: session, status } = useSession();
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Missing Stripe public key");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  // Use useMemo to compute plan details when dependencies change
  const planDetails = useMemo(() => {
    if (plan === "de por vida") {
      return {
        price: "price_lifetime_id", // ID del precio en Stripe
        mode: "payment" as const,
        title: "bienvenido al plan de por vida",
      };
    } else if (isAnnual) {
      return {
        price: "price_annual_id", // ID del precio en Stripe
        mode: "subscription" as const,
        title: "bienvenido al plan anual",
      };
    } else {
      return {
        price: "price_monthly_id", // ID del precio en Stripe
        mode: "subscription" as const,
        title: "bienvenido al plan mensual",
      };
    }
  }, [plan, isAnnual]);

  // Obtener el clientSecret cuando se abre el diálogo
  useEffect(() => {
    if (dialogoAbierto && session?.user?.email) {
      const createSubscription = async () => {
        const response = await fetch("/api/create-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: planDetails.price,
            email: session.user?.email,
          }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      };

      createSubscription();
    }
  }, [dialogoAbierto, session, planDetails.price]);

  const handleTriggerClick = () => {
    if (!session) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      localStorage.setItem("plan", plan);
    }
  };

  // Handle post-login dialog opening
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        setDialogoAbierto(true);
        localStorage.removeItem("redirectAfterLogin");
        localStorage.removeItem("plan");
      }
    }
  }, [status]);

  return (
    <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
      <DialogTrigger asChild onClick={handleTriggerClick}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!session ? (
          <LoginToPay plan={plan} />
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>{planDetails.title}</DialogTitle>
            </DialogHeader>
            {clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: planDetails.mode,
                  currency: "mxn",
                  locale: "es",
                  amount: convertToSubCurrency(parseInt(planDetails.price)),
                  appearance: {
                    theme: "night",
                    labels: "floating",
                  },
                }}
              >
                <CheckoutPage amount={parseInt(planDetails.price)} />
              </Elements>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
