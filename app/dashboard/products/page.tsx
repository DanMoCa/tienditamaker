"use client";
import ProductsCards from "@/components/dashboard/products/cards";
import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingProducts from "@/components/dashboard/products/heading-products";

export default function Products() {
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "productos", link: "/dashboard/products" },
  ];
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingProducts />
      <ProductsCards />
    </div>
  );
}
