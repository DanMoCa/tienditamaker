import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingAdmin from "@/components/dashboard/admin/heading-admin";
import ProviderForm from "@/components/dashboard/admin/provider-form";

export default function Admin() {
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "admin", link: "/dashboard/admin" },
  ];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingAdmin />
      <ProviderForm />
    </div>
  );
}
