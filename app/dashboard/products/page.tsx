"use client";
import ProductsCards from "@/components/dashboard/products/cards-products";
import { Breadcrumbs } from "@/components/breadcrumbs";
import HeadingProducts from "@/components/dashboard/products/heading-products";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserIdByEmail } from "@/utils/actions/session/user";
import { getStoreIdByUser } from "@/utils/actions/store/store-config";

export default function Products() {
  const { data: session } = useSession();
  const [storeId, setStoreId] = useState<number | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Añadimos este estado

  useEffect(() => {
    if (session?.user?.email) {
      getUserIdByEmail(session.user.email)
        .then((userId) => getStoreIdByUser(userId))
        .then((id) => setStoreId(id))
        .catch(console.error);
    }
  }, [session]);

  const handleUpdate = () => {
    setRefreshTrigger((prev) => prev + 1); // Incrementamos el contador para forzar el refetch
  };

  const breadcrumbItems = [
    { title: "dashboard", link: "/dashboard" },
    { title: "productos", link: "/dashboard/products" },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <HeadingProducts storeId={storeId!} onUpdate={handleUpdate} />
      <ProductsCards storeId={storeId!} refresh={refreshTrigger} />
    </div>
  );
}
