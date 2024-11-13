import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, useRef, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
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

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Missing Stripe public key");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  // Use useMemo to compute plan details when dependencies change
  const planDetails = useMemo(() => {
    if (plan === "de por vida") {
      return {
        price: 2499,
        mode: "payment" as const,
        title: "bienvenido al plan de por vida",
      };
    } else if (isAnnual) {
      return {
        price: 899,
        mode: "payment" as const,
        title: "bienvenido al plan anual",
      };
    } else {
      return {
        price: 89,
        mode: "subscription" as const,
        title: "bienvenido al plan mensual",
      };
    }
  }, [plan, isAnnual]);

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
            {/* Condicional si es de 89 entonces element con setupfutureusage, sino sin eso */}
            {planDetails.price === 89 ? (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: planDetails.mode,
                  setup_future_usage: "off_session",
                  currency: "mxn",
                  locale: "es",
                  amount: convertToSubCurrency(planDetails.price),
                  appearance: {
                    theme: "night",
                    labels: "floating",
                  },
                }}
              >
                <CheckoutPage amount={planDetails.price} />
              </Elements>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: planDetails.mode,
                  currency: "mxn",
                  locale: "es",
                  amount: convertToSubCurrency(planDetails.price),
                  appearance: {
                    theme: "night",
                    labels: "floating",
                  },
                }}
              >
                <CheckoutPage amount={planDetails.price} />
              </Elements>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
