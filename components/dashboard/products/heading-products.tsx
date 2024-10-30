import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductDialog from "./dialog-products";

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="productos"
          description="administra los productos de tu tienda"
        />
        <div>
          <Button onClick={() => setIsDialogOpen(true)}>
            agregar producto
          </Button>
          <ProductDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            storeId={1}
          />
        </div>
      </div>
      <Separator />
    </>
  );
}
