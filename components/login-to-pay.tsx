"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn, ShieldCheck, Zap } from "lucide-react";

export default function Component() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            inicia sesión para pagar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <LogIn className="w-16 h-16 text-blue-500" />
          </div>
          <p className="text-center text-gray-600">
            para continuar con el pago de tu plan, necesitas iniciar sesión en
            tu cuenta.
          </p>
          <div className="p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">detalles del plan:</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                acceso premium a todas las funciones
              </li>
              <li className="flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                soporte prioritario 24/7
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="w-full max-w-xs"
            onClick={() => {
              window.location.href = "/api/auth/signin";
            }}
          >
            <LogIn className="w-4 h-4 mr-2" />
            iniciar sesión
          </Button>
        </CardFooter>
      </div>
    </div>
  );
}
