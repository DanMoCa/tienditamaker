"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "inicio", href: "/" },
  { name: "productos", href: "/products" },
];

export default function Navbar({
  siteName,
  colors,
}: {
  siteName: string;
  colors: [string, string];
}) {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  const getLastWord = (str: string) => str.split(" ").pop();
  const getWithoutLastWord = (str: string) =>
    str.split(" ").slice(0, -1).join(" ");

  const primaryColor = colors[0];
  console.log(primaryColor);

  const secondaryColor = colors[1];

  return (
    <header className="border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            {getWithoutLastWord(siteName)}{" "}
            <span style={{ color: primaryColor }}>{getLastWord(siteName)}</span>
          </h1>
        </Link>

        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex divide-x border-r sm:border-l">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              carrito
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
