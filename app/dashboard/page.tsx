"use client";
import { InsightsCard } from "@/components/dashboard/insight-card";
import { RecentSalesCard } from "@/components/dashboard/recents-sales";
import { SalesHistoryCard } from "@/components/dashboard/sales-history";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">{session?.user?.name}</h2>
      <InsightsCard />
      <div className="grid gap-4 md:grid-cols-2">
        <RecentSalesCard />
        <SalesHistoryCard />
      </div>
    </div>
  );
}
