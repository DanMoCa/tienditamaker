"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProducts } from "@/utils/actions/product/product";
import {
  getStoreIdByUser,
  getUserIdByEmail,
} from "@/utils/actions/session/user";
import { Loader2, Pencil, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useCallback, memo } from "react";
import { getProducts as getProductsProvider } from "@/utils/actions/provider/provider";
// Types
interface ProductData {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  providerProductId: string;
}

interface FetchState<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

// Custom hook para manejar el estado de la tienda
const useStoreId = (userEmail: string | null | undefined) => {
  const [storeId, setStoreId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStoreId = useCallback(async () => {
    if (!userEmail) return;

    try {
      setIsLoading(true);
      const userId = await getUserIdByEmail(userEmail);
      const id = await getStoreIdByUser(userId);
      setStoreId(id);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Error obteniendo la tienda")
      );
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchStoreId();
  }, [fetchStoreId]);

  return { storeId, isLoading, error, refetch: fetchStoreId };
};

// Custom hook para manejar los productos
const useProducts = (storeId: number | null) => {
  const [state, setState] = useState<FetchState<ProductData[]>>({
    data: [],
    isLoading: true,
    error: null,
  });

  const fetchProducts = useCallback(async () => {
    if (!storeId) return;

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const products = await getProducts(storeId);

      // Extraer los IDs de los productos del proveedor
      const providerProductIds = products.map(
        (product: ProductData) => product.providerProductId
      );

      // Obtener los precios del proveedor para todos los productos
      const providerProducts = await getProductsProvider(providerProductIds);

      // Crear un mapa de id -> precio para fácil acceso
      const providerPricesMap = new Map(
        providerProducts.map((product: any) => [product.id, product.price])
      );

      // Combinar los productos con sus precios de proveedor correspondientes
      const productsWithProviderPrices = products.map(
        (product: ProductData) => ({
          ...product,
          providerPrice:
            providerPricesMap.get(product.providerProductId) || null,
        })
      );

      setState({
        data: productsWithProviderPrices,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: [],
        isLoading: false,
        error:
          err instanceof Error ? err : new Error("Error cargando productos"),
      });
    }
  }, [storeId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { ...state, refetch: fetchProducts };
};

// Componente de producto con memo para evitar re-renders innecesarios
const ProductCard = memo(
  ({
    product,
  }: {
    product: ProductData & { providerPrice: string | null };
  }) => {
    const handleEdit = useCallback(() => {
      // TODO: Implementar lógica de edición
      console.log("Editar producto:", product.id);
    }, [product.id]);

    return (
      <Card className="w-full">
        <CardHeader>
          <div className="aspect-square relative overflow-hidden rounded-lg">
            {product.images && product.images.length > 0 ? (
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

          {product.providerPrice !== null && (
            <p className="mt-2 text-sm font-bold text-green-600">
              precio del proveedor: ${product.providerPrice}
            </p>
          )}
          <p className="mt-2 text-lg font-bold">Precio: ${product.price}</p>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" className="w-full" onClick={handleEdit}>
            <Pencil className="w-4 h-4 mr-2" />
            editar
          </Button>
        </CardFooter>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

// Componentes de estado
const LoadingState = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
    <p className="text-red-500">{message}</p>
    <Button onClick={onRetry} variant="outline">
      Reintentar
    </Button>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
    <ShoppingBag className="w-12 h-12 text-gray-400" />
    <p className="text-gray-500">No hay productos disponibles</p>
  </div>
);

// Componente principal
export default function ProductsView() {
  const { data: session, status } = useSession();
  const {
    storeId,
    isLoading: isLoadingStore,
    error: storeError,
    refetch: refetchStore,
  } = useStoreId(session?.user?.email);

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts(storeId);

  // Manejo de estados
  if (status === "loading" || isLoadingStore || isLoadingProducts) {
    return <LoadingState />;
  }

  if (storeError) {
    return <ErrorState message={storeError.message} onRetry={refetchStore} />;
  }

  if (productsError) {
    return (
      <ErrorState message={productsError.message} onRetry={refetchProducts} />
    );
  }

  if (!products.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product as ProductData & { providerPrice: string | null }}
        />
      ))}
    </div>
  );
}
