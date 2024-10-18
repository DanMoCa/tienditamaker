import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import SessionWrapper from "@/components/session-wrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Tiendita Maker",
  description:
    "Crea tu tiendita online de dropshipping en un solo click, facil y rapido. ¡PROVEEDORES MEXICANOS!",
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
