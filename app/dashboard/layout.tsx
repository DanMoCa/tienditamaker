"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { UserProvider } from "@/utils/contexts/user-context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeItem, setActiveItem] = useState("general");

  return (
    <UserProvider>
      <div className="flex flex-col h-screen border-b border-neutral-700">
        <Header activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
          <main className="flex-1 overflow-auto p-4">
            <h2 className="mb-4 text-xl font-semibold">la tienda de jorge</h2>
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
