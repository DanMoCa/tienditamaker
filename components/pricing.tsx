import * as React from "react";
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

const plans = [
  {
    name: "inicial",
    description: "perfecto para iniciar tu negocio",
    price: "$599",
    billing: "al año",
    features: [
      "actualizaciones de correcciones críticas",
      "soporte técnico durante el horario laboral",
      "acceso a proveedores actuales",
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
      "acceso ilimitado a todos los proveedores, tanto actuales como futuros",
      "soporte técnico premium de por vida",
      "Priority support",
      "integración funciones y herramientas en la plataforma (sin costos adicionales)",
      "descuentos exclusivos para otros servicios relacionados (marketing, envíos, etc.)",
    ],
    cta: "¡obtenlo ya!",
    popular: true,
  },
];

export default function PricingSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          sencillo, transparente y accesible
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(plan.popular && "border-primary shadow-lg")}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
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
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
