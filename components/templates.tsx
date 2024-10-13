"use client";

import Image from "next/image";

export default function Templates() {
  return (
    <section className="h-screen flex flex-col justify-center items-center p-4 bg-neutral-900">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-white">
        plantillas que dan vida a tu tienda
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card
          imageUrl="https://res.cloudinary.com/do3k4ocu4/image/upload/v1728778795/g4gbivsxb6o88v0lvh08.png"
          title="Imagen 1"
        />
        <Card
          imageUrl="https://res.cloudinary.com/do3k4ocu4/image/upload/v1728778795/iztqj4cujouhrkb1wqhj.png"
          title="Imagen 2"
        />
      </div>
    </section>
  );
}

function Card({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        width={1920}
        height={720}
        className="w-full h-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
      </div>
    </div>
  );
}
