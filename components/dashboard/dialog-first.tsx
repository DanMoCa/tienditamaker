"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Loader2, Store, ShoppingBag, Package, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadButton } from "@/utils/uploadthing/uploadthing";
import {
  getStoreConfigByUser,
  updateStoreConfig,
} from "@/utils/actions/store/store-config";
import { getUserIdByEmail } from "@/utils/actions/session/user";

// Define interfaces for type safety
interface StoreConfig {
  name: string;
  subdomain: string;
  slogan: string;
  description: string;
  colors: [string, string];
  logo: string;
  template?: string;
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
  template: "basica",
};

interface StoreInfoDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function StoreInfoDialog({
  onClose,
  isOpen,
}: StoreInfoDialogProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<StoreConfig>(initialConfig);

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
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(null);

    setConfig((prev) => {
      if (name === "colorPrimario") {
        return { ...prev, colors: [value, prev.colors[1]] };
      }
      if (name === "colorSecundario") {
        return { ...prev, colors: [prev.colors[0], value] };
      }
      // Map Spanish field names to English ones
      const fieldMap: { [key: string]: string } = {
        nombre: "name",
        eslogan: "slogan",
        descripcion: "description",
      };
      const fieldName = fieldMap[name] || name;
      return { ...prev, [fieldName]: value };
    });
  }, []);

  const handleTemplateChange = useCallback((value: string) => {
    setConfig((prev) => ({ ...prev, template: value }));
  }, []);

  // Memoized validation function
  const validateConfig = useCallback(
    (config: StoreConfig): FormError | null => {
      if (!config.name.trim()) {
        return {
          field: "name",
          message: "El nombre de la tienda es requerido",
        };
      }
      if (!config.subdomain.trim()) {
        return { field: "subdomain", message: "El subdominio es requerido" };
      }
      if (!/^[a-zA-Z0-9-]+$/.test(config.subdomain)) {
        return {
          field: "subdomain",
          message:
            "El subdominio solo puede contener letras, números y guiones",
        };
      }
      if (config.logo && !config.logo.startsWith("http")) {
        return { field: "logo", message: "La URL del logo no es válida" };
      }
      if (!config.template) {
        return {
          field: "template",
          message: "Debes seleccionar una plantilla",
        };
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

        const result = await updateStoreConfig(userId, config);

        if (result?.code === "SUBDOMAIN_EXISTS") {
          toast.error("El subdominio ya está en uso. Por favor, elige otro.");
          setIsSaving(false);
          return;
        }

        toast.success("Tienda creada exitosamente");
        onClose();
      } catch (error) {
        console.error("Error al guardar la configuración:", error);
        setError("No se pudo guardar la configuración");
      } finally {
        setIsSaving(false);
      }
    },
    [config, session, fetchUserId, validateConfig, onClose]
  );

  const handlePreview = (template: string) => {
    window.open("https://jorge.tienditamaker.com", "_blank");
    // toast.info(`Vista previa de la plantilla ${template}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>crea tu tienda</DialogTitle>
          <DialogDescription>
            ingresa la información de tu tienda y selecciona una plantilla para
            comenzar.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error && !config.name ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              reintentar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={config.name}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subdomain" className="text-right">
                  subdominio
                </Label>
                <Input
                  id="subdomain"
                  name="subdomain"
                  value={config.subdomain}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                  placeholder="mitienda"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="eslogan" className="text-right">
                  eslogan
                </Label>
                <Input
                  id="eslogan"
                  name="eslogan"
                  value={config.slogan}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  descripción
                </Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  value={config.description}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="colorPrimario" className="text-right">
                  color primario
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    type="color"
                    id="colorPrimario"
                    name="colorPrimario"
                    value={config.colors[0]}
                    onChange={handleChange}
                    className="w-12 h-10"
                  />
                  <Input
                    value={config.colors[0]}
                    onChange={handleChange}
                    name="colorPrimario"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="colorSecundario" className="text-right">
                  color secundario
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    type="color"
                    id="colorSecundario"
                    name="colorSecundario"
                    value={config.colors[1]}
                    onChange={handleChange}
                    className="w-12 h-10"
                  />
                  <Input
                    value={config.colors[1]}
                    onChange={handleChange}
                    name="colorSecundario"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo" className="text-right">
                  logo
                </Label>
                <div className="col-span-3">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(url) => {
                      setConfig((prev) => ({ ...prev, logo: url[0].url }));
                      toast.success("Logo subido exitosamente");
                    }}
                  />
                  {config.logo && (
                    <Input value={config.logo} className="mt-2" disabled />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">plantilla</Label>
                <RadioGroup
                  value={config.template}
                  onValueChange={handleTemplateChange}
                  className="col-span-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basica" id="basica" />
                      <Label htmlFor="basica" className="flex items-center">
                        <Store className="mr-2 h-4 w-4" />
                        básica
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview("default")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      ver demo
                    </Button>
                  </div>
                  {/* // TODO: Implementar plantillas avanzadas */}
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderna" id="moderna" />
                      <Label htmlFor="moderna" className="flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Moderna
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview("modern")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver demo
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="avanzada" id="avanzada" />
                      <Label htmlFor="avanzada" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        Avanzada
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview("advanced")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver demo
                    </Button>
                  </div> */}
                </RadioGroup>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    guardando...
                  </>
                ) : (
                  "guardar tienda"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
