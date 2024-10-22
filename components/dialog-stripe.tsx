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

export default function Component({
  children,
  plan,
}: {
  children: React.ReactNode;
  plan: boolean;
}) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("Missing Stripe public key");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

  const planType = plan ? "de por vida" : "inicial";
  const planPrice = plan ? 2499 : 599;
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold"></h1>
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-neutral-900">
              bienvenido al plan {planType}
            </DialogTitle>
          </DialogHeader>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              currency: "mxn",
              amount: convertToSubCurrency(planPrice),
              appearance: {
                theme: "stripe",
                labels: "above",
              },
            }}
          >
            <CheckoutPage amount={planPrice} />
          </Elements>
        </DialogContent>
      </Dialog>
    </div>
  );
}
