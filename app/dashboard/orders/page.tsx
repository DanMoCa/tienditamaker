"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingOrders from "@/components/dashboard/orders/heading-orders";
import OrdersComponent from "@/components/dashboard/orders/orders";

export default function Orders() {
  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "pedidos", link: "/dashboard/orders" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingOrders />
      <OrdersComponent />
    </div>
  );
}
