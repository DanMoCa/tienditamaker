import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
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
  plan: boolean;
}) {
  const { data: session } = useSession();
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Missing Stripe public key");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  const planType = plan ? "de por vida" : "inicial";
  const planPrice = plan ? 2499 : 599;
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="">
          {
            // Si no hay sesión, mostrar un mensaje de error
            !session ? (
              <LoginToPay />
            ) : (
              // Mostrar el contenido normal del diálogo si hay sesión
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle>bienvenido al plan {planType}</DialogTitle>
                </DialogHeader>
                <Elements
                  stripe={stripePromise}
                  options={{
                    mode: "payment",
                    currency: "mxn",
                    amount: convertToSubCurrency(planPrice),
                    appearance: {
                      theme: "night",
                      labels: "floating",
                    },
                  }}
                >
                  <CheckoutPage amount={planPrice} />
                </Elements>
              </div>
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}
