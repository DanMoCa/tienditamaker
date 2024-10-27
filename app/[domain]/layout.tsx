import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { readStoreDomain } from "@/utils/actions/store/read-store-domain";
import Navbar from "./_components/navbar";
import ShoppingCartModal from "./_components/shopping-modal";
import CartProvider from "./_components/providers";

interface SiteLayoutProps {
  params: { domain: string };
  children: ReactNode;
}

// Función para generar metadata dinámica
export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata> {
  // Obtener los datos de la tienda
  const result = await readStoreDomain(params?.domain);

  // Si no hay resultados, puedes retornar metadata por defecto o manejar el error
  if (!result || !result[0]) {
    return {
      title: "tiendita no encontrada",
      description: "la tienda que buscas no existe",
    };
  }

  const { subdomain, description } = result[0];

  return {
    title: `tiendita de ${subdomain}`,
    description: description || `compra en la tiendita de ${subdomain}`,
    // Puedes agregar más propiedades de metadata aquí
    openGraph: {
      title: `tiendita de ${subdomain}`,
      description: description || `compra en la tiendita de ${subdomain}`,
      siteName: subdomain,
    },
    twitter: {
      card: "summary_large_image",
      title: `tiendita de ${subdomain}`,
      description: description || `compra en la tiendita de ${subdomain}`,
    },
  };
}

export default async function SiteLayout({
  params,
  children,
}: SiteLayoutProps) {
  console.log("SiteLayout params:", params);

  const result = await readStoreDomain(params?.domain);

  if (!result) {
    notFound();
  }

  const siteName = result?.[0]?.name;
  const siteDomain = result?.[0]?.subdomain;
  const siteDescription = result?.[0]?.description;
  const siteLogo = result?.[0]?.logo;
  const siteColors = result?.[0]?.colors;

  return (
    <html lang="es" className="bg-white">
      <body>
        <CartProvider>
          <Navbar siteName={siteName} colors={siteColors} />
          <ShoppingCartModal />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
