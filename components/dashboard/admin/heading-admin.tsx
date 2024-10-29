import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import DialogAdmin from "./dialog-admin";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="admin dashboard"
          description=" maneja tu tienda y productos"
        />
        <DialogAdmin>
          <Button variant="outline">agregar proveedor</Button>
        </DialogAdmin>
      </div>
      <Separator />
    </>
  );
}
