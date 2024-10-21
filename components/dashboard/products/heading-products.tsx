import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="productos"
          description="administra los productos de tu tienda"
        />
      </div>
      <Separator />
    </>
  );
}
