import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import ProductDialog from "./dialog-products";
import { getProducts } from "@/utils/actions/product/product";
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  providerProductId: string;
  providerProduct?: {
    id: string;
    price: string;
  };
}
interface ProductsViewProps {
  storeId: number;
}

interface HeadingProductsProps {
  storeId: number;
  onUpdate: () => void; // Añadimos esta prop
}

export default function HeadingProducts({
  storeId,
  onUpdate,
}: HeadingProductsProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="productos"
          description="administra los productos de tu tienda"
        />
        <div>
          <ProductDialog storeId={storeId} onSuccess={onUpdate}>
            <Button>agregar producto</Button>
          </ProductDialog>
        </div>
      </div>
      <Separator />
    </>
  );
}
