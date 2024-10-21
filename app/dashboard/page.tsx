import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingDashboard from "@/components/dashboard/heading-dashboard";
import DashboardComponent from "@/components/dashboard/dashboard";

export default function Dashboard() {
  const breadcrumbItems = [{ title: "dashboard", link: "/dashboard" }];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingDashboard />
      <DashboardComponent />
    </div>
  );
}
