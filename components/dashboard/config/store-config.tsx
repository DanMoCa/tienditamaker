"use client";
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
import { Loader2 } from "lucide-react";
import { CardContent, CardFooter } from "@/components/ui/card";

// Define interfaces for type safety
interface StoreConfig {
  name: string;
  subdomain: string;
  slogan: string;
  description: string;
  colors: [string, string];
  logo: string;
}

interface FormError {
  field: keyof StoreConfig;
  message: string;
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
  const { data: sessionData, status } = useSession();
  const [session, setSession] = useState(sessionData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<StoreConfig>(initialConfig);

  useEffect(() => {
    setSession(sessionData);
  }, [sessionData]);

  // Memoized function to fetch user ID
  const fetchUserId = useCallback(async (email: string) => {
    try {
      return await getUserIdByEmail(email);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError("No se pudo obtener el ID del usuario");
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
      setError("No se pudo obtener la configuración de la tienda");
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
      setIsLoading(false);
    };

    if (status === "authenticated") {
      initializeData();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
      setError("Debes iniciar sesión para acceder a esta página");
    }
  }, [status, session, fetchUserId, fetchStoreConfig]);

  // Memoized change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setError(null);

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
  const validateConfig = useCallback(
    (config: StoreConfig): FormError | null => {
      if (!config.name.trim()) {
        return {
          field: "name",
          message: "el nombre de la tienda es requerido",
        };
      }
      if (!config.subdomain.trim()) {
        return { field: "subdomain", message: "el subdominio es requerido" };
      }
      if (!/^[a-zA-Z0-9-]+$/.test(config.subdomain)) {
        return {
          field: "subdomain",
          message:
            "el subdominio solo puede contener letras, números y guiones",
        };
      }
      if (config.logo && !config.logo.startsWith("http")) {
        return { field: "logo", message: "la URL del logo no es válida" };
      }
      return null;
    },
    []
  );

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!session?.user?.email) {
        setError("Debes iniciar sesión");
        return;
      }

      const validationError = validateConfig(config);
      if (validationError) {
        setError(validationError.message);
        return;
      }

      setIsSaving(true);

      try {
        const userId = await fetchUserId(session.user.email);
        if (!userId) throw new Error("No se pudo obtener el ID del usuario");

        await updateStoreConfig(userId, config);
        toast.success("Configuración guardada exitosamente");
      } catch (error) {
        console.error("Error al guardar la configuración:", error);
        setError("No se pudo guardar la configuración");
      } finally {
        setIsSaving(false);
      }
    },
    [config, session, fetchUserId, validateConfig]
  );

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Handle error state
  if (error && !config.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">nombre de la tienda</Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                toast.success("logo subido exitosamente");
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
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          disabled={isSaving || status !== "authenticated"}
          onClick={handleSubmit}
          className="w-full"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "guardar cambios"
          )}
        </Button>
      </CardFooter>
    </div>
  );
}
