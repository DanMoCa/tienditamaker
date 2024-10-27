import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import SessionWrapper from "@/components/session-wrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tienditamaker.com"),
  keywords: [
    "tiendita maker",
    "tiendita",
    "maker",
    "dropshipping",
    "tienda online",
    "proveedores mexicanos",
  ],
  openGraph: {
    description:
      "tiendita maker es una plataforma para crear tiendas online de dropshipping en un solo click, facil y rapido. ¡PROVEEDORES MEXICANOS!",
    images: [
      "https://utfs.io/f/pypyrj2zEPRN7v9UcAGCFvaxZLG5U9KlPH1ythr4RNYqoJVe",
    ],
  },
  title: {
    default: "tiendita maker",
    template: "%s | tiendita maker",
  },
  description:
    "crea tu tiendita online de dropshipping en un solo click, facil y rapido. ¡PROVEEDORES MEXICANOS!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.className} dark`}>
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
