"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import StoreConfigDashboard from "@/components/dashboard/config/store-config";
import HeadingConfig from "@/components/dashboard/config/heading-config";
import { useEffect, useState } from "react";
import { getUserIdByEmail } from "@/utils/actions/session/user";
import { getStoreConfigByUser } from "@/utils/actions/store/store-config";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      getUserIdByEmail(session.user.email)
        .then((userId) => getStoreConfigByUser(userId))
        .then((data) => setSubdomain(data.subdomain))
        .catch(console.error);
    }
  }, [session]);

  console.log(subdomain);
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "configuración", link: "/dashboard/config" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingConfig subdomain={subdomain!} />
      <StoreConfigDashboard />
    </div>
  );
}
