import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/lib/converToSubcurrency";
import { CheckoutPage } from "./checkout";
import { useSession } from "next-auth/react";
import LoginToPay from "./login-to-pay";

export default function Component({
  children,
  plan,
}: {
  children: React.ReactNode;
  plan: string;
}) {
  const { data: session } = useSession();
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Missing Stripe public key");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  const planPrice = plan == "de por vida" ? 2499 : 599;
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const planRef = useRef(plan);
  const planPriceRef = useRef(planPrice);

  const { status } = useSession();

  const handleTriggerClick = (e: React.MouseEvent) => {
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    if (redirectPath) {
      e.preventDefault(); // Prevenir la apertura por trigger si hay redirect pendiente
    }
  };

  useEffect(() => {
    // Solo abrimos el diálogo si:
    // 1. El usuario está autenticado
    // 2. Existe redirectAfterLogin
    // 3. El diálogo NO está ya abierto
    if (status === "authenticated" && !dialogoAbierto) {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      const planType = localStorage.getItem("plan");
      if (redirectPath) {
        if (planType === "de por vida") {
          planRef.current = "de por vida";
          planPriceRef.current = 2499;
          setDialogoAbierto(true);
        }
        localStorage.removeItem("redirectAfterLogin");
        localStorage.removeItem("plan");
      }
    }
  }, [status, dialogoAbierto]);

  return (
    <div className="flex justify-between items-center mb-6">
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogTrigger asChild onClick={handleTriggerClick}>
          {children}
        </DialogTrigger>
        <DialogContent className="">
          {!session ? (
            <LoginToPay plan={plan} />
          ) : (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle>bienvenido al plan {planRef.current}</DialogTitle>
              </DialogHeader>
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  currency: "mxn",
                  locale: "es",
                  amount: convertToSubCurrency(planPriceRef.current),
                  appearance: {
                    theme: "night",
                    labels: "floating",
                  },
                }}
              >
                <CheckoutPage amount={planPriceRef.current} />
              </Elements>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
