"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/utils/hooks/use-toast";
import { getStoreConfigByUser } from "@/utils/actions/shops/store-config";
import { updateStoreConfig } from "@/utils/actions/shops/store-config";
import { useSession } from "next-auth/react";
import { getUserIdByEmail } from "@/utils/actions/session/get-id";

export default function StoreConfigDashboard() {
  const { data: session } = useSession();
  const userId = getUserIdByEmail(session?.user?.email as string);

  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState({
    name: "",
    subdomain: "",
    slogan: "",
    description: "",
    colors: ["#000000", "#ffffff"],
    logoUrl: "",
  });

  // const fetchStoreConfig = async () => {
  //   if (userId) {
  //     const store = await getStoreConfigByUser(userId);
  //     if (store) {
  //       setConfig({
  //         name: store.name,
  //         subdomain: store.subdomain,
  //         slogan: store.slogan,
  //         description: store.description,
  //         colors: [store.colors[0], store.colors[1]],
  //         logoUrl: store.logo,
  //       });
  //     }
  //   }
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "primaryColor" || name === "secondaryColor") {
      setConfig((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [name === "primaryColor" ? "primary" : "secondary"]: value,
        },
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
    if (config.logoUrl && !isValidUrl(config.logoUrl)) {
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
      await updateStoreConfig(userId, config);
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

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos existentes sin cambios */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la tienda</Label>
          <Input
            id="name"
            name="name"
            value={config.name}
            onChange={handleChange}
            placeholder="Mi tienda"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subdomain">Subdominio</Label>
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
          <Label htmlFor="slogan">Eslogan</Label>
          <Input
            id="slogan"
            name="slogan"
            value={config.slogan}
            onChange={handleChange}
            placeholder="¡Las mejores ofertas en un solo lugar!"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
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
            <Label htmlFor="primaryColor">Color primario</Label>
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
            <Label htmlFor="secondaryColor">Color secundario</Label>
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
          <Label htmlFor="logoUrl">URL del logo</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            type="url"
            value={config.logoUrl}
            onChange={handleChange}
            placeholder="https://mitienda.com/logo.png"
          />
        </div>
        <div className="py-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
