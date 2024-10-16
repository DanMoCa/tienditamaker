import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";

export function MobileHeader({
  activeItem,
  setActiveItem,
}: {
  activeItem: any;
  setActiveItem: any;
}) {
  return (
    <div className="mb-4 flex items-center justify-between md:hidden">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <LayoutDashboard className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarContent
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
