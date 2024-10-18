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
    <div className="flex items-center justify-center md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <LayoutDashboard className="h-5 w-5" />
            <span className="sr-only">toggle menu</span>
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
