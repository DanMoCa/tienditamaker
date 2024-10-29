import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProductCard() {
  const name = "Producto 1";
  const description = "Descripción del producto 1";
  const image = "/images/product-1.jpg";
  const price = 100.0;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="aspect-square relative">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-lg">
            ${price!.toFixed(2)}
          </Badge>
          <Button variant="outline" size="sm">
            Ver detalles
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Agregar al carrito</Button>
      </CardFooter>
    </Card>
  );
}
