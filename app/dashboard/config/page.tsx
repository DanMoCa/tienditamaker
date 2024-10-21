import { Breadcrumbs } from "@/components/breadcrumbs";
import StoreConfigDashboard from "@/components/dashboard/config/store-config";
import HeadingConfig from "@/components/dashboard/config/heading-config";

export default function Page() {
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "config", link: "/dashboard/config" },
  ];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingConfig />
      <StoreConfigDashboard />
    </div>
  );
}
