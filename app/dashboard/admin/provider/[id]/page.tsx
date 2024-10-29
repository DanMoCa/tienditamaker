import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingProvider from "@/components/dashboard/admin/provider/heading-provider";
import ProductsProvider from "@/components/dashboard/admin/provider/products-provider";

export default function Component() {
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "admin", link: "/dashboard/admin" },
    // { title: "proveedores", link: "/dashboard/admin/provider" },
    { title: "productos", link: "/dashboard/admin/provider/1" },
  ];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingProvider />
      <ProductsProvider />
    </div>
  );
}
