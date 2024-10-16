"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { InsightsCard } from "@/components/dashboard/insight-card";
import { RecentSalesCard } from "@/components/dashboard/recents-sales";
import { SalesHistoryCard } from "@/components/dashboard/sales-history";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("General");
  const { data: session } = useSession();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <main className="flex-1 overflow-auto p-4">
        <MobileHeader activeItem={activeItem} setActiveItem={setActiveItem} />
        <h2 className="mb-4 text-xl font-semibold">{session?.user?.name}</h2>
        <InsightsCard />
        <div className="grid gap-4 md:grid-cols-2">
          <RecentSalesCard />
          <SalesHistoryCard />
        </div>
      </main>
    </div>
  );
}
