"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import DialogProvider from "./dialog-provider";

export default function Component() {
  const id = 9;
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="admin dashboard proveedores"
          description="administra los proveedores de tu tienda"
        />
        <DialogProvider providerId={id}>
          <Button variant="outline">agregar producto</Button>
        </DialogProvider>
      </div>
      <Separator />
    </>
  );
}
