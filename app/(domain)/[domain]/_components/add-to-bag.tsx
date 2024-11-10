"use client";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  size: string;
  onSizeError?: () => void;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  size,
  onSizeError,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  const handleAddToBag = () => {
    if (!size) {
      onSizeError?.();
      return;
    }

    const product = {
      name: name,
      description: description,
      price: price,
      currency: currency,
      image: image,
      id: `${price_id}_${size}`, // ID único que incluye la talla
      price_id: price_id,
      size: size,
    };

    addItem(product);
    handleCartClick();
  };

  return (
    <Button
      variant="default"
      onClick={handleAddToBag}
      disabled={!size}
      className={!size ? "opacity-50 cursor-not-allowed" : ""}
    >
      {!size ? "selecciona una talla" : "añadir al carrito"}
    </Button>
  );
}
