"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link
            href="/"
            className="text-[#a3eef5] font-bold text-xl sm:text-2xl"
          >
            tienditamaker
          </Link>
          <div className="hidden md:flex space-x-6 flex-1 justify-center">
            <NavItem text="proveedores" hasDropdown />
            <NavItem text="plantillas" />
            <NavItem text="precios" />
          </div>
          <div className="hidden md:flex items-center space-x-4 text-base sm:text-xl font-semibold">
            <Link href="/login" className="text-white">
              ingresar
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="text-sm sm:text-lg font-bold bg-[#a3eef5] hover:bg-[#a3eef5]/80"
              >
                prueba gratuita
              </Button>
            </Link>
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
                <NavItem text="proveedores" hasDropdown />
                <NavItem text="plantillas" />
                <NavItem text="precios" />
                <Link
                  href="/login"
                  className="text-foreground font-semibold text-white"
                >
                  ingresar
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full text-lg font-bold bg-[#a3eef5] hover:bg-[#a3eef5]/80"
                  >
                    prueba gratuita
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="relative h-screen bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <Image
          src="https://images.unsplash.com/photo-1528278235776-5abe0b52b5a3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            <Link href="/">
              <Button
                variant="secondary"
                className="text-lg sm:text-xl p-4 sm:p-6 bg-[#a3eef5] font-extrabold hover:bg-[#a3eef5]/80 w-full sm:w-auto"
              >
                iniciar prueba gratuita
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  text,
  hasDropdown = false,
}: {
  text: string;
  hasDropdown?: boolean;
}) {
  return (
    <div className="relative group">
      <button className="text-foreground flex items-center text-white">
        {text}
        {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
      </button>
    </div>
  );
}
