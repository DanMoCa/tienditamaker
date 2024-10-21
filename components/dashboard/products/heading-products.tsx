import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ProductsDialog from "@/components/dashboard/products/dialog";

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="productos"
          description="administra los productos de tu tienda"
        />
        <ProductsDialog />
      </div>
      <Separator />
    </>
  );
}
