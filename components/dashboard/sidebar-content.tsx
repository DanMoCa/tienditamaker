import {
  BarChart,
  ChevronLeft,
  HelpCircle,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { icon: LayoutDashboard, label: "general", href: "/dashboard" },
  { icon: Package, label: "products", href: "/dashboard/products" },
  { icon: ShoppingCart, label: "orders", href: "/dashboard/orders" },
  { icon: BarChart, label: "analysis", href: "/dashboard/analysis" },
  { icon: HelpCircle, label: "help", href: "/dashboard/help" },
];

export function SidebarContent({
  activeItem,
  setActiveItem,
  isCollapsed,
}: {
  activeItem: any;
  setActiveItem: any;
  isCollapsed?: boolean;
}) {
  const router = useRouter();

  return (
    <nav>
      <ul className="space-y-2">
        {sidebarItems.map((item) => (
          <li key={item.label}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activeItem === item.label && "bg-neutral-900 font-semibold"
              )}
              onClick={() => {
                setActiveItem(item.label);
                router.push(item.href);
              }}
            >
              <item.icon
                className={cn("h-5 w-5 ", isCollapsed ? "mr-0" : "mr-2")}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
