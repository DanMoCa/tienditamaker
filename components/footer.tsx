import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0"></div>

          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-4">
              <li>
                <a href="/" className="transition-colors">
                  inicio
                </a>
              </li>
              <li>
                <a href="#proveedores" className="transition-colors">
                  proveedores
                </a>
              </li>
              <li>
                <a href="#plantillas" className="transition-colors">
                  plantillas
                </a>
              </li>
              <li>
                <a href="#precios" className="transition-colors">
                  precios
                </a>
              </li>
              <li>
                <a href="/help" className="transition-colors">
                  ayuda
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex space-x-4">
            <Link
              href="https://x.com/saoko1x"
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com/saoko1x"
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://github.com/saoko1x"
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p>
            &copy;
            {new Date().getFullYear()} tienditamaker todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
