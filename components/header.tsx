"use client";

import Link from "next/link";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { motion } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser(session.user?.name || null);
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      setIsScrolled(window.scrollY > headerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative">
      <nav
        className={`fixed w-full z-10 py-4 px-4 sm:px-6 flex items-center justify-between transition-colors duration-300 ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex items-center space-x-4 sm:space-x-8 text-xl font-semibold justify-between w-full">
          <NavItem
            text="tienditamaker"
            href="/"
            className="text-[#a3eef5] font-bold text-xl sm:text-2xl"
          />
          <div className="hidden md:flex space-x-6 flex-1 justify-center">
            <NavItem text="proveedores" hasDropdown href="#proveedores" />
            <NavItem text="plantillas" href="#plantillas" />
            <NavItem text="precios" href="#precios" />
          </div>
          <div className="hidden md:flex items-center space-x-4 text-base sm:text-xl font-semibold">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <span className="text-white cursor-pointer">
                      hola, {user.toLowerCase()}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <Link href="/dashboard">
                      <DropdownMenuItem>
                        <User />
                        <span>dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut />
                      <span>cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/api/auth/login">
                  <Button
                    variant="outline"
                    className="text-sm sm:text-lg font-bold bg-[#a3eef5] hover:bg-[#a3eef5]/80 text-black"
                  >
                    ingresar
                  </Button>
                </Link>
              </>
            )}
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-neutral-900"
            >
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-[#a3eef5] font-bold text-2xl mb-4"
                >
                  tienditamaker
                </Link>
                <NavItem text="proveedores" hasDropdown href="#proveedores" />
                <NavItem text="plantillas" href="#plantillas" />
                <NavItem text="precios" href="#precios" />
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <span className="text-white cursor-pointer">
                        hola, {user.toLowerCase()}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <Link href="/dashboard">
                        <DropdownMenuItem>
                          <User />
                          <span>dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut />
                        <span>cerrar sesión</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/api/auth/login">
                    <Button
                      variant="outline"
                      className="w-full text-lg font-bold bg-[#a3eef5] hover:bg-[#a3eef5]/80 text-black"
                    >
                      ingresar
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function NavItem({
  text,
  hasDropdown = false,
  href,
  className,
}: {
  text: string;
  hasDropdown?: boolean;
  href?: string;
  className?: string;
}) {
  const handleScroll = (event: React.MouseEvent) => {
    event.preventDefault();
    if (href === "/") {
      window.location.href = href;
    } else {
      const targetId = href?.substring(1);
      const targetElement = document.getElementById(targetId!);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative group">
      <Link href={href!} onClick={handleScroll}>
        <motion.button className={` flex items-center ${className}`}>
          {text}
          {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
        </motion.button>
      </Link>
    </div>
  );
}
