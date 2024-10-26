"use client";
import ProductsCards from "@/components/dashboard/products/cards";
import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingProducts from "@/components/dashboard/products/heading-products";
import { useState } from "react";

export default function Products() {
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "productos", link: "/dashboard/products" },
  ];

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Cargando...</p>
          <p className="text-sm text-gray-500">Por favor espere</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingProducts />
      <ProductsCards />
    </div>
  );
}
