"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function ShoppingCartModal({ storeId }: { storeId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  const handleCheckoutClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Preparar los items del carrito
      const cartItems = Object.values(cartDetails ?? {}).map((item) => ({
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        image: typeof item.image === "string" ? item.image : null,
      }));

      const subdomain = window.location.hostname.split(".")[0];

      // Llamar a nuestra API para crear la sesión de Stripe
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, storeId, subdomain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.details || "Error al crear la sesión de checkout"
        );
      }

      const { sessionId } = await response.json();

      // Redirigir al checkout de Stripe
      const stripe = await stripePromise;
      if (!stripe) throw new Error("No se pudo cargar Stripe");

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Error:", error);
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error al procesar el checkout: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw] bg-white">
        <SheetHeader>
          <SheetTitle className="text-secondary">carrito</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between bg-white">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">no hay productos en tu carrito.</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            cantidad: {entry.quantity}
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-secondary hover:text-secondary/80"
                            >
                              eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>subtotal:</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              envío e impuestos se calculan al finalizar la compra.
            </p>

            <div className="mt-6">
              <Button
                onClick={handleCheckoutClick}
                className="w-full bg-secondary hover:bg-secondary/80 text-primary"
                // disabled={cartCount === 0 || isLoading}
              >
                {isLoading ? "procesando..." : "pagar"}
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                o{" "}
                <button
                  onClick={() => handleCartClick()}
                  className="font-medium text-secondary hover:text-secondary/80"
                >
                  seguir comprando
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
