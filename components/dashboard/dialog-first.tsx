"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Store, ShoppingBag, Package, Eye } from "lucide-react";
import dbConnect from "@/config/database";

export default function StoreInfoDialog({ onClose }: { onClose: () => void }) {
  async function handleCreateStore() {
    // Conectar a MongoDB
    await dbConnect();
    // Aquí puedes agregar la lógica para crear la tienda
  }

  const [storeData, setStoreData] = useState({
    nombre: "",
    eslogan: "",
    descripcion: "",
    colorPrimario: "#000000",
    colorSecundario: "#ffffff",
    logo: "",
    template: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTemplateChange = (value: string) => {
    setStoreData((prev) => ({ ...prev, template: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de la tienda:", storeData);
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    onClose();
  };

  const handlePreview = (template: string) => {
    // Aquí puedes agregar la lógica para mostrar la vista previa de la plantilla
    console.log(`Mostrando vista previa de la plantilla: ${template}`);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea tu tienda</DialogTitle>
          <DialogDescription>
            Ingresa la información de tu tienda y selecciona una plantilla para
            comenzar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                name="nombre"
                value={storeData.nombre}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eslogan" className="text-right">
                Eslogan
              </Label>
              <Input
                id="eslogan"
                name="eslogan"
                value={storeData.eslogan}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">
                Descripción
              </Label>
              <Input
                id="descripcion"
                name="descripcion"
                value={storeData.descripcion}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="colorPrimario" className="text-right">
                Color Primario
              </Label>
              <Input
                type="color"
                id="colorPrimario"
                name="colorPrimario"
                value={storeData.colorPrimario}
                onChange={handleInputChange}
                className="col-span-3 h-10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="colorSecundario" className="text-right">
                Color Secundario
              </Label>
              <Input
                type="color"
                id="colorSecundario"
                name="colorSecundario"
                value={storeData.colorSecundario}
                onChange={handleInputChange}
                className="col-span-3 h-10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo URL
              </Label>
              <Input
                id="logo"
                name="logo"
                value={storeData.logo}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/logo.png"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Plantilla</Label>
              <RadioGroup
                value={storeData.template}
                onValueChange={handleTemplateChange}
                className="col-span-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basica" id="basica" />
                    <Label htmlFor="basica" className="flex items-center">
                      <Store className="mr-2 h-4 w-4" />
                      Básica
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview("basica")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver demo
                  </Button>
                </div>
                <div className="flex items-center justify-between">
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
                    onClick={() => handlePreview("moderna")}
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
                    onClick={() => handlePreview("avanzada")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver demo
                  </Button>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Crear tienda</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
