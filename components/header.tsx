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
            href="#inicio"
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
                <Link href="/api/auth/signin">
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
                  <Link href="/api/auth/signin">
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
      <div className="relative h-screen bg-gray-900 text-white" id="inicio">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src="https://res.cloudinary.com/do3k4ocu4/image/upload/v1729372881/nkdzhx4e3rizdsrddyzw.jpg"
          alt="Background"
          className="w-full h-screen object-cover"
          width={2160}
          height={1440}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            construye tu tienda
            <br />
            en minutos
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl">
            crea, administra y escala tu tienda en tienditamaker.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {user ? (
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  className="text-black text-lg sm:text-xl p-4 sm:p-6 bg-[#a3eef5] font-extrabold hover:bg-[#a3eef5]/80 w-full sm:w-auto"
                >
                  ir al dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/api/auth/signin">
                <Button
                  variant="secondary"
                  className="text-black text-lg sm:text-xl p-4 sm:p-6 bg-[#a3eef5] font-extrabold hover:bg-[#a3eef5]/80 w-full sm:w-auto"
                >
                  crear tienda
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
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
    const targetId = href?.substring(1);
    const targetElement = document.getElementById(targetId!);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
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
