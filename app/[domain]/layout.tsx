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

// Función auxiliar para generar clases CSS basadas en los colores de la tienda
const generateThemeClasses = (colors: any) => {
  if (!colors) return "";

  // Asegúrate de que colors tenga un formato válido
  const {
    primary = "#000000",
    secondary = "#ffffff",
    background = "#ffffff",
    text = "#000000",
  } = colors;

  return `
    [--color-primary:${primary}]
    [--color-secondary:${secondary}]
    [--color-background:${background}]
    [--color-text:${text}]
  `
    .replace(/\s+/g, " ")
    .trim();
};

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

  // Genera las clases de tema basadas en los colores de la tienda
  const themeClasses = generateThemeClasses(siteColors);

  return (
    <html
      lang="es"
      className={`
        ${themeClasses}
        bg-[var(--color-background)]
        text-[var(--color-text)]
      `}
    >
      <body className="min-h-screen">
        <CartProvider>
          <Navbar siteName={siteName} colors={siteColors} />
          <ShoppingCartModal />
          <main className="container mx-auto px-4">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
