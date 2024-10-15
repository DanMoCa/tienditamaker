"use client";

import Image from "next/image";

export default function Sell() {
  return (
    <div className="bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 lg:mb-0">
              vende productos{" "}
              <span className="text-[#a3eef5]">100% mexicanos</span> en tu
              tienda online
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              className="w-full h-auto object-cover rounded-xl"
              src="https://utfs.io/f/pypyrj2zEPRNRgVu2TPfVW7N20To4lGZE9S6bq3FdyPYXztC"
              alt="nino-gamer-shop"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
