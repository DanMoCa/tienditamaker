import { SidebarContent } from "./sidebar-content";
import { useSidebar } from "@/utils/hooks/use-sidebar";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Sidebar({
  activeItem,
  setActiveItem,
}: {
  activeItem: any;
  setActiveItem: any;
}) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    setIsSidebarCollapsed(!isSidebarCollapsed);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
        status && "duration-500",
        !isMinimized ? "w-60" : "w-[72px]"
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <SidebarContent
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isCollapsed={isSidebarCollapsed}
      />
    </aside>
  );
}
