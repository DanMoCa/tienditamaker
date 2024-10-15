"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function Templates() {
  const templates = [
    {
      imageUrl:
        "https://res.cloudinary.com/do3k4ocu4/image/upload/v1728778795/g4gbivsxb6o88v0lvh08.png",
      title: "Tienda de ropa",
      description: "Una tienda de ropa con un estilo moderno y minimalista.",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/do3k4ocu4/image/upload/v1728778795/iztqj4cujouhrkb1wqhj.png",
      title: "Tienda de tecnologia",
      description:
        "Una tienda de tecnologia con un estilo moderno y minimalista.",
    },
  ];
  return (
    <section className="min-h-screen bg-neutral-900 text-white p-8 flex flex-col justify-center">
      <h2 className="text-4xl font-bold text-center mb-8">
        encuentra el template perfecto para tu negocio
      </h2>
      <div className=" max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <FeatureCard
          title={templates[0].title}
          description={templates[0].description}
          image={templates[0].imageUrl}
          alt={templates[0].title}
        />
        <FeatureCard
          title={templates[1].title}
          description={templates[1].description}
          image={templates[1].imageUrl}
          alt={templates[1].title}
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  image,
  alt,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
}) {
  return (
    <Card className="bg-[#a3eef5]/40 border-none text-white h-full w-full flex flex-col justify-between">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={alt}
          className="object-cover rounded-t-lg h-96 w-full"
          width={1920}
          height={1080}
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
        <CardDescription className="text-teal-100">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="text-teal-300 hover:text-teal-100 p-0"
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
