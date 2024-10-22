"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Component({
  searchParams: { amount },
}: {
  searchParams: {
    amount: string;
  };
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">
            ¡Pago Exitoso!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <p className="text-xl font-semibold text-center text-neutral-900">
            Gracias por tu pago
          </p>
          <p className="text-gray-600 text-center">
            Hemos recibido tu pago de ${amount} correctamente.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="w-full max-w-xs bg-neutral-900 text-white hover:bg-neutral-900/80"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Ir al dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
