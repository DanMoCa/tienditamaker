"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface StoreConfig {
  name: string;
  slogan: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
}

export default function StoreConfigDashboard() {
  const [config, setConfig] = useState<StoreConfig>({
    name: "",
    slogan: "",
    description: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    logoUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar la configuración
    console.log("configuración guardada:", config);
    toast({
      title: "configuración guardada",
      description:
        "los cambios en la configuración de tu tienda han sido guardados exitosamente.",
    });
  };

  return (
    <div className="w-full mx-auto">
      <div>
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
            <Label htmlFor="slogan">eslogan</Label>
            <Input
              id="slogan"
              name="slogan"
              value={config.slogan}
              onChange={handleChange}
              placeholder="¡las mejores ofertas en un solo lugar!"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">description</Label>
            <Textarea
              id="description"
              name="description"
              value={config.description}
              onChange={handleChange}
              placeholder="describe tu tienda en pocas palabras..."
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
                  value={config.primaryColor}
                  onChange={handleChange}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={config.primaryColor}
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
                  value={config.secondaryColor}
                  onChange={handleChange}
                  className="w-12 h-12 p-1"
                />
                <Input
                  value={config.secondaryColor}
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
        </form>
      </div>
      <div>
        <Button type="submit" onClick={handleSubmit} className="w-full">
          guardar cambios
        </Button>
      </div>
    </div>
  );
}
