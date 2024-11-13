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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import DialogStripe from "@/components/dialog-stripe";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const monthlyPlan = {
  name: "inicial",
  description: "perfecto para iniciar tu negocio",
  price: "$89",
  billing: "al mes",
  features: [
    "acceso a proveedores actuales",
    "actualizaciones",
    "soporte técnico",
    "integraciones con costos adicionales",
  ],
  cta: "empieza ya",
};

const lifetimePlan = {
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
};

export default function Component() {
  const router = useRouter();
  const { status } = useSession();
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
  }, [status, router]);

  const getBasicPlanPrice = () => {
    if (isAnnual) {
      return {
        price: "$899",
        billing: "al año",
        savings: "ahorra 2 meses",
      };
    }
    return {
      price: monthlyPlan.price,
      billing: monthlyPlan.billing,
      savings: null,
    };
  };

  const basicPlanPricing = getBasicPlanPrice();

  return (
    <section className="py-16 bg-neutral-900" id="precios">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          sencillo, transparente y{" "}
          <span className="text-[#a3eef5]">accesible</span>
        </h2>

        <div className="flex justify-center items-center gap-4 mb-8">
          <Label htmlFor="billing-toggle" className="text-sm">
            Pago Mensual
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="billing-toggle" className="text-sm">
            Pago Anual
          </Label>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-primary shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{monthlyPlan.name}</CardTitle>
              <CardDescription>{monthlyPlan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-extrabold">
                  {basicPlanPricing.price}
                  <span className="text-xs">MXN</span>
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  {basicPlanPricing.billing}
                </span>
                {basicPlanPricing.savings && (
                  <p className="text-sm text-[#a3eef5] mt-1">
                    {basicPlanPricing.savings}
                  </p>
                )}
              </div>
              <ul className="space-y-2">
                {monthlyPlan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <DialogStripe plan={monthlyPlan.name} isAnnual={isAnnual}>
                <Button className="w-full" variant="outline">
                  {monthlyPlan.cta}
                </Button>
              </DialogStripe>
            </CardFooter>
          </Card>

          <Card className="border-primary shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{lifetimePlan.name}</CardTitle>
              <CardDescription>{lifetimePlan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-extrabold text-[#a3eef5]">
                  {lifetimePlan.price}
                  <span className="text-xs">MXN</span>
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  {lifetimePlan.billing}
                </span>
              </div>
              <ul className="space-y-2">
                {lifetimePlan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <DialogStripe plan={lifetimePlan.name} isAnnual={isAnnual}>
                <Button className="w-full bg-[#a3eef5] hover:bg-[#a3eef5]/80 text-black">
                  {lifetimePlan.cta}
                </Button>
              </DialogStripe>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
