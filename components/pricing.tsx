"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogStripe from "@/components/dialog-stripe";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const plans = [
  {
    name: "inicial",
    description: "perfecto para iniciar tu negocio",
    price: "$599",
    billing: "al año",
    features: [
      "acceso a proveedores actuales",
      "actualizaciones",
      "soporte técnico por 1 año",
      "integraciones con costos adicionales",
    ],
    cta: "empieza ya",
  },
  {
    name: "de por vida",
    description: "para los que buscan un compromiso a largo plazo",
    price: "$2,499",
    billing: "pago único",
    features: [
      "acceso ilimitado a todos los proveedores",
      "soporte técnico de por vida",
      "integración funciones sin costos adicionales",
      "descuentos exclusivos para otros servicios relacionados (marketing, envíos, etc.)",
    ],
    cta: "¡obtenlo ya!",
  },
];

export default function PricingSection() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
  }, [status, router]);

  return (
    <section className="py-16" id="precios">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          sencillo, transparente y{" "}
          <span className="text-[#a3eef5]">accesible</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(plan.name && "border-primary shadow-lg")}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.name == "de por vida" ? "text-[#a3eef5]" : ""
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground"> {plan.billing}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <DialogStripe plan={plan.name!}>
                  <Button
                    className={`w-full ${
                      plan.name == "de por vida"
                        ? "bg-[#a3eef5] hover:bg-[#a3eef5]/80 text-black"
                        : ""
                    }`}
                    variant={plan.name == "de por vida" ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </DialogStripe>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
