"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProviders } from "@/utils/actions/provider/provider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Definir interfaces para el tipado
interface Product {
  id: string;
  name: string;
  price: number;
  // Añadir otros campos según necesites
}

interface Provider {
  id: string;
  name: string;
  description: string;
  image: string;
  products?: Product[];
}

// Componente Card separado y tipado
function ProviderCard({ provider }: { provider: Provider }) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const router = useRouter();

  return (
    <Card className="w-full max-w-[350px] mx-auto">
      <CardHeader>
        <div className="flex justify-start items-center gap-4">
          <Avatar>
            <AvatarImage
              src={provider.image}
              alt={`${provider.name}'s avatar`}
            />
            <AvatarFallback>{getInitials(provider.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl truncate">{provider.name}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">
          {provider.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Label className="text-sm font-medium">productos</Label>
          {provider.products && provider.products.length > 0 ? (
            <div className="space-y-2">
              {provider.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate">{product.name}</span>
                  <span className="font-medium">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              no hay productos disponibles
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            // Implementar lógica de edición
          }}
        >
          editar
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            // Implementar lógica para ver productos
            router.push(`/dashboard/admin/provider/${provider.id}`);
          }}
        >
          ver productos
        </Button>
      </CardFooter>
    </Card>
  );
}

// Componente principal con manejo de estados y error boundaries
export default function Providers() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        const data = await getProviders();
        setProviders(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar proveedores"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []);

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

  if (!providers.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <p className="text-gray-500">No hay proveedores disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
