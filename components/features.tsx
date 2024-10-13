"use client";
import FeaturesCards from "@/components/features-cards";
export default function Features() {
  return (
    <div className="bg-neutral-900 h-fit">
      <div className="container mx-auto flex flex-col h-full py-20 gap-10">
        <h2 className="text-white text-6xl font-bold">
          la plataforma para hacer{" "}
          <span className="text-[#a3eef5]">dropshipping</span> en mexico fácil y
          rápido
        </h2>
        <h3 className="text-white text-2xl font-bold">
          elige productos 100% mexicanos y vende en tu tienda online
        </h3>
        <FeaturesCards />
      </div>
    </div>
  );
}
