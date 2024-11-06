"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Package } from "lucide-react";
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
import { getOrdersByStoreId } from "@/utils/actions/store/shipping";
import { getStoreConfigByUser } from "@/utils/actions/store/store-config";
import { getUserIdByEmail } from "@/utils/actions/session/user";
import { useSession } from "next-auth/react";

interface CartItems {
  price: number;
  product: string;
  quantity: number;
  subtotal: number;
}
interface CustomerData {
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    line1: string;
    line2: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

interface Order {
  id: number;
  status: string;
  cartItems: CartItems[];
  customerData: CustomerData;
  createdAt: string;
  updatedAt: string;
}

const initialOrders: Order[] = [
  {
    id: 1,
    status: "Pendiente",
    cartItems: [
      {
        price: 100,
        product: "Producto 1",
        quantity: 2,
        subtotal: 200,
      },
      {
        price: 50,
        product: "Producto 2",
        quantity: 3,
        subtotal: 150,
      },
    ],
    customerData: {
      name: "Juan Perez",
      email: " [email protected]",
      phone: "1234567890",
      address: {
        city: "Ciudad",
        line1: "Calle 123",
        line2: "Colonia",
        state: "Estado",
        country: "País",
        postal_code: "12345",
      },
    },
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
];

export default function GestionPedidos() {
  const { data: session, status } = useSession();
  const [pedidos, setPedidos] = useState<Order[]>([]);
  const [expandidos, setExpandidos] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        setIsLoading(true);
        const userId = session?.user?.email
          ? await getUserIdByEmail(session.user.email)
          : 0;
        const storeId = userId ? await getStoreConfigByUser(userId) : 0;
        console.log(storeId);
        const data = storeId ? await getOrdersByStoreId(storeId.id) : [];

        setPedidos(Array.isArray(data) ? data : []);
        console.log(data);

        setIsLoading(false);
      };

      fetchOrders();
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  }, [session]);

  const toggleExpansion = (id: number) => {
    setExpandidos((prev) =>
      prev.includes(id)
        ? prev.filter((pedidoId) => pedidoId !== id)
        : [...prev, id]
    );
  };

  const getEstadoColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatedCreatedAt = (date: string) => {
    const createdAt = new Date(date);
    return `${createdAt.getDate()}/${
      createdAt.getMonth() + 1
    }/${createdAt.getFullYear()}`;
  };

  if (!pedidos.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <Package className="w-12 h-12 text-primary" />
        <p className="text-gray-500">No hay pedidos</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="space-y-4">
        {pedidos.map((pedido) => (
          <Card key={pedido.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Pedido {formatedCreatedAt(pedido.createdAt)}</span>
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
                  <p className="font-semibold">{pedido.customerData.name}</p>

                  <div className="flex">
                    <p className="text-sm text-gray-500">
                      email: {pedido.customerData.email} - {` `}
                    </p>
                    <p className="text-sm text-gray-500">
                      {` `}teléfono: {pedido.customerData.phone}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    direccion: {pedido.customerData.address.line1},{" "}
                    {pedido.customerData.address.city},{" "}
                    {pedido.customerData.address.state},{" "}
                    {pedido.customerData.address.country},{" "}
                    {pedido.customerData.address.postal_code}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getEstadoColor(pedido.status)}>
                    {pedido.status}
                  </Badge>
                  <span className="font-bold">
                    ${pedido.cartItems[0].subtotal}
                  </span>
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
                    {pedido.cartItems.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell>{producto.product}</TableCell>
                        <TableCell>{producto.quantity}</TableCell>
                        <TableCell>${producto.price.toFixed(2)}</TableCell>
                        <TableCell>
                          ${(producto.quantity * producto.price).toFixed(2)}
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
