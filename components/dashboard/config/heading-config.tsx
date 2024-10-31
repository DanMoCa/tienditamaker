import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface HeadingConfigProps {
  subdomain: string;
}

export default function Component({ subdomain }: HeadingConfigProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="configuración de la tienda"
          description="personaliza la apariencia y detalles de tu tienda"
        />
        <div className="flex justify-end mb-4">
          <Link
            href={`https://${subdomain}.tienditamaker.com`}
            passHref
            target="_blank"
          >
            <Button variant="outline">visitar tienda</Button>
          </Link>
        </div>
      </div>
      <Separator />
    </>
  );
}
