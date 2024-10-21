"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Pedido {
  id: number;
  fecha: string;
  cliente: string;
  total: number;
  estado: "Pendiente" | "Enviado" | "Entregado";
  productos: Producto[];
}

const pedidosIniciales: Pedido[] = [
  {
    id: 1,
    fecha: "2023-05-15",
    cliente: "María García",
    total: 599,
    estado: "Pendiente",
    productos: [
      { id: 1, nombre: "Playera Clásica", cantidad: 2, precio: 299 },
      { id: 2, nombre: "Gorra Deportiva", cantidad: 1, precio: 199 },
    ],
  },
  {
    id: 2,
    fecha: "2023-05-14",
    cliente: "Juan Pérez",
    total: 349,
    estado: "Enviado",
    productos: [
      { id: 3, nombre: "Playera Estampada", cantidad: 1, precio: 349 },
    ],
  },
  {
    id: 3,
    fecha: "2023-05-13",
    cliente: "Ana Martínez",
    total: 747,
    estado: "Entregado",
    productos: [
      { id: 4, nombre: "Gorra Snapback", cantidad: 1, precio: 249 },
      { id: 1, nombre: "Playera Clásica", cantidad: 1, precio: 299 },
      { id: 3, nombre: "Playera Estampada", cantidad: 1, precio: 349 },
    ],
  },
];

export default function GestionPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);
  const [expandidos, setExpandidos] = useState<number[]>([]);

  const toggleExpansion = (id: number) => {
    setExpandidos((prev) =>
      prev.includes(id)
        ? prev.filter((pedidoId) => pedidoId !== id)
        : [...prev, id]
    );
  };

  const getEstadoColor = (estado: Pedido["estado"]) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-500";
      case "Enviado":
        return "bg-blue-500";
      case "Entregado":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container">
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <Card key={pedido.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Pedido #{pedido.id}</span>
                <Button
                  variant="ghost"
                  onClick={() => toggleExpansion(pedido.id)}
                >
                  {expandidos.includes(pedido.id) ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{pedido.cliente}</p>
                  <p className="text-sm text-gray-500">{pedido.fecha}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getEstadoColor(pedido.estado)}>
                    {pedido.estado}
                  </Badge>
                  <span className="font-bold">${pedido.total.toFixed(2)}</span>
                </div>
              </div>
              {expandidos.includes(pedido.id) && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedido.productos.map((producto) => (
                      <TableRow key={producto.id}>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.cantidad}</TableCell>
                        <TableCell>${producto.precio.toFixed(2)}</TableCell>
                        <TableCell>
                          ${(producto.cantidad * producto.precio).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
