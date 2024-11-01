"use client";
import type { Metadata } from "next";
import "@/app/(main)/globals.css";
import { Manrope } from "next/font/google";
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { UserProvider } from "@/utils/contexts/user-context";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/session-wrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeItem, setActiveItem] = useState("general");

  return (
    <html lang="es" className={`${manrope.className} dark`}>
      <head>
        <title>tiendita dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="tiendita dashboard" />
        <meta name="url" content="https://tienditamaker.com" />
      </head>
      <body>
        <SessionWrapper>
          <UserProvider>
            <div className="flex flex-col h-screen border-b border-neutral-700">
              <Header activeItem={activeItem} setActiveItem={setActiveItem} />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <main className="flex-1 overflow-auto p-4">{children}</main>
                <Toaster richColors />
              </div>
            </div>
          </UserProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
