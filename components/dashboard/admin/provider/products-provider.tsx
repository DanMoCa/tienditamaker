"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/utils/actions/provider/provider";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  images: any;
}

function ProductCard({ product }: { product: ProductData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-lg">
            ${product.price!.toFixed(2)}
          </Badge>
          <Button variant="outline" size="sm">
            ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Products() {
  const id = 1;

  console.log(id);

  // const providerId = id ? parseInt(id) : 0;
  const providerId = 9;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts(providerId);
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar productos"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [providerId]);

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
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <p className="text-gray-500">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
