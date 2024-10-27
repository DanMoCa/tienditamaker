"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/utils/hooks/use-toast";
import {
  getStoreConfigByUser,
  updateStoreConfig,
} from "@/utils/actions/store/store-config";
import { useSession } from "next-auth/react";
import { getUserIdByEmail } from "@/utils/actions/session/user";

// Definir la interfaz para la configuración
interface StoreConfig {
  name: string;
  subdomain: string;
  slogan: string;
  description: string;
  colors: [string, string];
  logo: string;
}

// Estado inicial con valores por defecto
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
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [config, setConfig] = useState<StoreConfig>(initialConfig);

  // Efecto para obtener el userId
  useEffect(() => {
    async function fetchUserId() {
      if (session?.user?.email) {
        try {
          const id = await getUserIdByEmail(session.user.email);
          console.log("User ID:", id);
          console.log("User id type:", typeof id);

          setUserId(id);
        } catch (error) {
          console.error("Error fetching user ID:", error);
          toast({
            title: "Error",
            description: "No se pudo obtener la información del usuario",
            variant: "destructive",
          });
        }
      }
    }

    if (status === "authenticated") {
      fetchUserId();
    }
  }, [session?.user?.email, status]);

  // Efecto para obtener la configuración
  useEffect(() => {
    async function fetchStoreConfig() {
      if (!userId) return;

      try {
        const storeConfig = await getStoreConfigByUser(userId);
        console.log("Store config:", storeConfig);

        if (storeConfig) {
          // Asegurarse de que los datos tengan la estructura correcta
          setConfig({
            ...initialConfig,
            ...storeConfig,
            colors: [storeConfig.colors[0], storeConfig.colors[1]],
          });
        }
      } catch (error) {
        console.error("Error fetching store config:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la configuración de la tienda",
          variant: "destructive",
        });
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchStoreConfig();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "primaryColor" || name === "secondaryColor") {
      setConfig((prev) => ({
        ...prev,
        colors:
          name === "primaryColor"
            ? [value, prev.colors[1]]
            : [prev.colors[0], value],
      }));
    } else {
      setConfig((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateConfig = (config: any) => {
    if (!config.name.trim()) return "El nombre de la tienda es requerido";
    if (!config.subdomain.trim()) return "El subdominio es requerido";
    if (!/^[a-zA-Z0-9-]+$/.test(config.subdomain)) {
      return "El subdominio solo puede contener letras, números y guiones";
    }
    if (config.logo && !isValidUrl(config.logo)) {
      return "La URL del logo no es válida";
    }
    return null;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast({
        title: "Error",
        description: "No se pudo identificar al usuario",
        variant: "destructive",
      });
      return;
    }

    const error = validateConfig(config);
    if (error) {
      toast({
        title: "Error de validación",
        description: error,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateStoreConfig(userId, config);
      console.log("Configuración guardada:", result);

      toast({
        title: "Configuración guardada",
        description:
          "Los cambios en la configuración de tu tienda han sido guardados exitosamente.",
      });
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      toast({
        title: "Error",
        description:
          "Hubo un error al guardar la configuración. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isInitialLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Cargando configuración...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Por favor, inicia sesión para acceder a la configuración.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">nombre de la tienda</Label>
          <Input
            id="name"
            name="name"
            value={config.name}
            onChange={handleChange}
            placeholder="mi tienda"
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
          <Input
            id="logo"
            name="logo"
            type="url"
            value={config.logo}
            onChange={handleChange}
            placeholder="https://mitienda.com/logo.png"
          />
        </div>
        <div className="py-4">
          <Button type="submit" disabled={isLoading || !userId}>
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
