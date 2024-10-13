"use client";

import Image from "next/image";

export default function Sell() {
  return (
    <div className="bg-black h-1/4">
      <div className="container mx-auto flex h-full py-20 gap-10 items-center">
        <h2 className="text-white text-5xl font-bold">
          vende productos <span className="text-[#a3eef5]">100% mexicanos</span>{" "}
          en tu tienda online
        </h2>
        <Image
          className="w-1/2 h-full object-cover rounded-xl"
          src="https://utfs.io/f/pypyrj2zEPRNRgVu2TPfVW7N20To4lGZE9S6bq3FdyPYXztC"
          alt="nino-gamer-shop"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}
