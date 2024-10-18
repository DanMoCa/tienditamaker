import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
}

export default function Component() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState<Omit<Producto, "id">>({
    nombre: "",
    precio: 0,
    imagen: "",
    descripcion: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value,
    }));
  };

  const agregarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    setProductos((prev) => [...prev, { ...nuevoProducto, id: Date.now() }]);
    setNuevoProducto({ nombre: "", precio: 0, imagen: "", descripcion: "" });
    setDialogoAbierto(false);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">gestión de productos</h1>
      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Producto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>agregar nuevo producto</DialogTitle>
          </DialogHeader>
          <form onSubmit={agregarProducto} className="space-y-4">
            <div>
              <Label htmlFor="nombre">nombre del producto</Label>
              <Input
                id="nombre"
                name="nombre"
                value={nuevoProducto.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="precio">precio</Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="imagen">url de la imagen</Label>
              <Input
                id="imagen"
                name="imagen"
                value={nuevoProducto.imagen}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="descripcion">descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">guardar producto</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
