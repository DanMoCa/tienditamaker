"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Pencil, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { deleteProduct, getProducts } from "@/utils/actions/product/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductDialog from "./dialog-products";
import { Badge } from "@/components/ui/badge";

// Types
interface Product {
  id: number;
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

function ProductCard({
  product,
  storeId,
  fetchProducts,
}: {
  product: Product;
  storeId: number;
  fetchProducts: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleUpdate = () => {
    fetchProducts();
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="aspect-square relative">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
          {product.images.length > 1 && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <Button onClick={handlePrevImage} variant="ghost">
                ←
              </Button>
            </div>
          )}
          {product.images.length > 1 && (
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <Button onClick={handleNextImage} variant="ghost">
                →
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
        <p className="text-muted-foreground mb-4">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex-col items-center justify-center flex gap-2">
            <Badge variant="destructive" className="text-xs line-through">
              ${product.providerProduct?.price}
            </Badge>
            <Badge variant="secondary" className="text-lg">
              ${product.price!}
            </Badge>
          </div>
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
            <Button variant="outline">
              <Pencil className="w-4 h-4 mr-2" />
              editar
            </Button>
          </ProductDialog>

          {/* Button delete */}
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteProduct(product.id).then(() => {
                fetchProducts();
              });
            }}
          >
            eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
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
          reintentar
        </Button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <ShoppingBag className="w-12 h-12 text-gray-400" />
        <p className="text-gray-500">no hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          storeId={storeId}
          fetchProducts={fetchProducts}
        />
      ))}
    </div>
  );
}
