import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";

const productos = [
  {
    id: 1,
    nombre: "iphone 13",
    precio: 999.99,
    imagen:
      "https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    descripcion: "el nuevo iPhone 13 con 5G.",
  },
  {
    id: 2,
    nombre: "macbook pro",
    precio: 1999.99,
    imagen:
      "https://images.pexels.com/photos/249538/pexels-photo-249538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    descripcion: "la nueva MacBook Pro con chip M1.",
  },
];
export default function Component() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <Card key={producto.id} className="flex flex-col justify-between">
          <CardHeader>
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-cover mb-4 rounded-md"
              width={300}
              height={200}
            />
            <CardTitle>{producto.nombre}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{producto.descripcion}</p>
            <p className="text-xl font-bold mt-2">
              ${producto.precio.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" /> agregar al carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
