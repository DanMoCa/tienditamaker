import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            estado del pedido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-semibold text-center">
              ¡tu pago se realizó completamente!
            </h2>
            <p className="text-center text-gray-600">
              te enviaremos un correo de confirmación cuando tu pedido esté
              listo y en camino.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="w-full max-w-xs"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            volver a la tienda
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
