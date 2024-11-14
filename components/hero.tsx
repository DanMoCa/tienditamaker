"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
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
          ¡vende sin preocuparte
          <br />
          por el inventario!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl">
          construye, gestiona y haz crecer tu tienda en tienditamaker
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
            <Link href="/api/auth/login">
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
  );
}
