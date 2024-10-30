"use client";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import ImageGallery from "../../_components/image-gallery";
import AddToBag from "../../_components/add-to-bag";
import CheckoutNow from "../../_components/checkout-now";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { getProductById } from "@/utils/actions/store/store-config";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPageSlug({
  params,
}: {
  params: { slug: string };
}) {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const id = searchParams.get("id");
        let productData;

        // Intentar primero obtener por ID si está disponible
        if (id) {
          productData = await getProductById(id);
          console.log({ productData });
        }

        if (!productData) {
          throw new Error("Producto no encontrado");
        }

        setProduct(productData[0]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el producto"
        );
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.slug, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                deportes
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>
              <span className="text-sm text-gray-500 transition duration-100">
                56 reseñas
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${product.price + 30}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                incluye impuestos y envío
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 días de envío</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                currency="MXN"
                description={product.description}
                image={product.images[0]}
                name={product.name}
                price={product.price}
                key={product.id}
                price_id={product.id}
              />
              <CheckoutNow
                currency="MXN"
                description={product.description}
                image={product.images[0]}
                name={product.name}
                price={product.price}
                key={product.id}
                price_id={product.id}
              />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
