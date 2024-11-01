import type { Metadata } from "next";
import "@/app/(main)/globals.css";
import { Manrope } from "next/font/google";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { readStoreDomain } from "@/utils/actions/store/read-store-domain";
import Navbar from "./_components/navbar";
import ShoppingCartModal from "./_components/shopping-modal";
import CartProvider from "./_components/providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});
interface SiteLayoutProps {
  params: { domain: string };
  children: ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata> {
  const result = await readStoreDomain(params?.domain);

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
  const result = await readStoreDomain(params?.domain);

  if (!result) {
    notFound();
  }

  const siteName = result?.[0]?.name;
  const siteDomain = result?.[0]?.subdomain;
  const siteDescription = result?.[0]?.description;
  const siteLogo = result?.[0]?.logo;
  const siteColors = result?.[0]?.colors;
  const siteStoreId = result?.[0]?.userId;

  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Navbar siteName={siteName} colors={siteColors} />
          <ShoppingCartModal storeId={siteStoreId} />
          <main className="container mx-auto px-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
