import {
  BarChart,
  HelpCircle,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "General", href: "#" },
  { icon: Package, label: "Products", href: "#" },
  { icon: ShoppingCart, label: "Orders", href: "#" },
  { icon: BarChart, label: "Analysis", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
];

export function SidebarContent({
  activeItem,
  setActiveItem,
}: {
  activeItem: any;
  setActiveItem: any;
}) {
  return (
    <nav>
      <ul className="space-y-2">
        {sidebarItems.map((item) => (
          <li key={item.label}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activeItem === item.label && "bg-gray-100 font-semibold"
              )}
              onClick={() => setActiveItem(item.label)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
