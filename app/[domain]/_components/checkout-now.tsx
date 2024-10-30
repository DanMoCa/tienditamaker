"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { ProductCart } from "./add-to-bag";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image,
    price_id: price_id,
  };
  return (
    <Button
      variant="outline"
      className="text-white"
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      comprar ahora
    </Button>
  );
}
