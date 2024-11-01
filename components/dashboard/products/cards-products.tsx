"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Pencil, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { getProducts } from "@/utils/actions/product/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductDialog from "./dialog-products";

// Types
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

interface ProductsCardsProps {
  storeId: number;
  refresh?: number; // Añadimos esta prop
}

export default function ProductsCards({
  storeId,
  refresh,
}: ProductsCardsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!storeId) return;

    try {
      setIsLoading(true);
      const data = await getProducts(storeId);
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Error al cargar productos")
      );
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, refresh]); // Añadimos refresh como dependencia

  const handleUpdate = () => {
    fetchProducts();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <p className="text-red-500">{error.message}</p>
        <Button onClick={fetchProducts} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <ShoppingBag className="w-12 h-12 text-gray-400" />
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="w-full">
          <CardHeader>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <CardTitle className="mt-4 text-lg font-semibold truncate">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
            {product.providerProduct && (
              <p className="mt-2 text-sm font-bold text-green-600">
                precio del proveedor: ${product.providerProduct.price}
              </p>
            )}
            <p className="mt-2 text-lg font-bold">Precio: ${product.price}</p>
          </CardContent>
          <CardFooter>
            <ProductDialog
              storeId={storeId}
              productToEdit={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                providerProductId: product.providerProductId,
              }}
              mode="edit"
              onSuccess={handleUpdate}
            >
              <Button variant="outline" className="w-full">
                <Pencil className="w-4 h-4 mr-2" />
                editar
              </Button>
            </ProductDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
