import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="dashboard"
          description="análisis y estadísticas de tu tienda"
        />
      </div>
      <Separator />
    </>
  );
}
