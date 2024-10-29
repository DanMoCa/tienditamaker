import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Providers() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-start items-center gap-4">
          <Avatar>
            <AvatarImage src="https://avatar.iran.liara.run/public" />
            <AvatarFallback>
              <span>jm</span>
            </AvatarFallback>
          </Avatar>
          <CardTitle>jorge montanez</CardTitle>
        </div>
        <CardDescription>
          vendedor de ropa y a veces cosas ilegales
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* muestra los productos del vendedor */}
        <div>
          <Label>Productos</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>playera</span>
              <span>$100</span>
            </div>
            <div className="flex items-center justify-between">
              <span>pantalon</span>
              <span>$200</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">editar</Button>
        <Button>ver productos</Button>
      </CardFooter>
    </Card>
  );
}
