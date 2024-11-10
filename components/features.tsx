"use client";

import FeaturesCards from "@/components/features-cards";

export default function Features() {
  return (
    <section className="bg-neutral-900 min-h-screen" id="proveedores">
      <div className="container mx-auto flex flex-col h-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8 md:gap-10">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          la plataforma para hacer{" "}
          <span className="text-[#a3eef5]">dropshipping</span> en mexico fácil y
          rápido
        </h2>
        <h3 className="text-white text-xl sm:text-2xl font-bold">
          elige productos 100% mexicanos,{" "}
          <span className="text-[#a3eef5]">crea y vende</span> en tu propia
          tienda online
        </h3>
        <FeaturesCards />
      </div>
    </section>
  );
}
