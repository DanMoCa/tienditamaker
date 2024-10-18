import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { MobileHeader } from "./mobile-header";

export function Header({
  activeItem,
  setActiveItem,
}: {
  activeItem: any;
  setActiveItem: any;
}) {
  return (
    <header className="border-b px-4 py-3 flex items-center justify-between ">
      <MobileHeader activeItem={activeItem} setActiveItem={setActiveItem} />
      <h1 className="text-xl font-semibold hidden md:block">
        tiendita dashboard
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User profile" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
