import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  getStoreConfigByUser,
  updateStoreConfig,
} from "@/utils/actions/store/store-config";
import { getUserIdByEmail } from "@/utils/actions/session/user";
import { UploadButton } from "@/utils/uploadthing/uploadthing";
import Link from "next/link";

interface StoreConfig {
  name: string;
  subdomain: string;
  slogan: string;
  description: string;
  colors: [string, string];
  logo: string;
}

const initialConfig: StoreConfig = {
  name: "",
  subdomain: "",
  slogan: "",
  description: "",
  colors: ["#000000", "#ffffff"],
  logo: "",
};

export default function StoreConfigDashboard() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<StoreConfig>(initialConfig);

  // Memoized function to fetch user ID
  const fetchUserId = useCallback(async (email: string) => {
    try {
      return await getUserIdByEmail(email);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      toast.error("No se pudo obtener el ID del usuario");
      return null;
    }
  }, []);

  // Memoized function to fetch store configuration
  const fetchStoreConfig = useCallback(async (userId: string) => {
    try {
      const storeConfig = await getStoreConfigByUser(userId);
      if (storeConfig) {
        setConfig({
          ...initialConfig,
          ...storeConfig,
          colors: [storeConfig.colors[0], storeConfig.colors[1]],
        });
      }
    } catch (error) {
      console.error("Error fetching store config:", error);
      toast.error("No se pudo obtener la configuración de la tienda");
    }
  }, []);

  // Unified useEffect for data fetching
  useEffect(() => {
    const initializeData = async () => {
      if (session?.user?.email) {
        const userId = await fetchUserId(session.user.email);
        if (userId) {
          await fetchStoreConfig(userId);
        }
      }
    };

    if (status === "authenticated") {
      initializeData();
    }
  }, [status, session, fetchUserId, fetchStoreConfig]);

  // Memoized change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      setConfig((prev) => {
        if (name === "primaryColor") {
          return { ...prev, colors: [value, prev.colors[1]] };
        }
        if (name === "secondaryColor") {
          return { ...prev, colors: [prev.colors[0], value] };
        }
        return { ...prev, [name]: value };
      });
    },
    []
  );

  // Memoized validation function
  const validateConfig = useCallback((config: StoreConfig) => {
    if (!config.name.trim()) return "El nombre de la tienda es requerido";
    if (!config.subdomain.trim()) return "El subdominio es requerido";
    if (!/^[a-zA-Z0-9-]+$/.test(config.subdomain)) {
      return "El subdominio solo puede contener letras, números y guiones";
    }
    if (config.logo && !config.logo.startsWith("http")) {
      return "La URL del logo no es válida";
    }
    return null;
  }, []);

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!session?.user?.email) {
        toast.error("Debes iniciar sesión");
        return;
      }

      const error = validateConfig(config);
      if (error) {
        toast.error(error);
        return;
      }

      setIsLoading(true);

      try {
        const userId = await fetchUserId(session.user.email);
        if (!userId) throw new Error("No se pudo obtener el ID del usuario");

        await updateStoreConfig(userId, config);
        toast.success("Configuración guardada exitosamente");
      } catch (error) {
        console.error("Error al guardar la configuración:", error);
        toast.error("No se pudo guardar la configuración");
      } finally {
        setIsLoading(false);
      }
    },
    [config, session, fetchUserId, validateConfig]
  );

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-end mb-4">
        {config.subdomain && (
          <Link
            href={`https://${config.subdomain}.tienditamaker.com`}
            passHref
            target="_blank"
          >
            <Button variant="outline">Visitar tienda</Button>
          </Link>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la tienda</Label>
          <Input
            id="name"
            name="name"
            value={config.name}
            onChange={handleChange}
            placeholder="Mi tienda"
            className="w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subdomain">subdominio</Label>
          <Input
            id="subdomain"
            name="subdomain"
            value={config.subdomain}
            onChange={handleChange}
            placeholder="mitienda"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slogan">eslogan</Label>
          <Input
            id="slogan"
            name="slogan"
            value={config.slogan}
            onChange={handleChange}
            placeholder="¡Las mejores ofertas en un solo lugar!"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={config.description}
            onChange={handleChange}
            placeholder="Describe tu tienda en pocas palabras..."
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">color primario</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="primaryColor"
                name="primaryColor"
                type="color"
                value={config.colors[0]}
                onChange={handleChange}
                className="w-12 h-12 p-1"
              />
              <Input
                value={config.colors[0]}
                onChange={handleChange}
                name="primaryColor"
                className="flex-grow"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">color secundario</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="secondaryColor"
                name="secondaryColor"
                type="color"
                value={config.colors[1]}
                onChange={handleChange}
                className="w-12 h-12 p-1"
              />
              <Input
                value={config.colors[1]}
                onChange={handleChange}
                name="secondaryColor"
                className="flex-grow"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">logo url</Label>
          <UploadButton
            className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
            endpoint="imageUploader"
            onClientUploadComplete={(url) => {
              setConfig((prev) => ({ ...prev, logo: url[0].url }));
              toast.success("Logo subido exitosamente");
            }}
          />

          <Input
            id="logo"
            name="logo"
            type="url"
            value={config.logo}
            onChange={handleChange}
            placeholder="https://mitienda.com/logo.png"
            disabled
          />
        </div>
        <div className="py-4">
          <Button
            type="submit"
            disabled={isLoading || status !== "authenticated"}
          >
            {isLoading ? "guardando..." : "guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
