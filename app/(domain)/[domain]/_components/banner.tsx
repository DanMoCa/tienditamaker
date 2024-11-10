"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center relative">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-sm sm:text-base font-medium">
          ¡30% de descuento en toda la tienda! aprovecha ahora
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
