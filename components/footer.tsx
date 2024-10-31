import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-14">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <svg
              className="h-8 w-auto"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

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
            </ul>
          </nav>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
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
