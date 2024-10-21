import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="pedidos"
          description="revisa y gestiona los pedidos de tu tienda"
        />
      </div>
      <Separator />
    </>
  );
}
