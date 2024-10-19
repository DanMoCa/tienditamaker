"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Edit, Scale, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Templates() {
  const templates = [
    {
      imageUrl:
        "https://res.cloudinary.com/do3k4ocu4/image/upload/v1728778795/g4gbivsxb6o88v0lvh08.png",
      title: "tienda de ropa",
      description: "una tienda de ropa con un estilo moderno y minimalista.",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/do3k4ocu4/image/upload/v1728778795/iztqj4cujouhrkb1wqhj.png",
      title: "tienda de tecnologia",
      description:
        "una tienda de tecnologia con un estilo moderno y minimalista.",
    },
  ];

  const [openStep, setOpenStep] = useState<number | null>(3);

  const steps = [
    {
      title: "llena la información de tu tienda",
      content:
        "rellena el formulario con tu nombre, colores, logo y todo tu contenido perfecto",
    },
    {
      title: "elige tu plantilla ideal",
      content:
        "conecta tu idea con la plantilla por excelencia que ofrecemos para ti",
    },
    {
      title: "lanza tu tienda al público",
      content:
        "el mundo está esperando por tu tienda, lánzala y comienza a vender tus productos",
      // features: [
      //   { icon: Shield, text: "Protected data" },
      //   { icon: Edit, text: "Editable invoices" },
      //   { icon: Scale, text: "EU compliant template" },
      // ],
    },
  ];

  return (
    <section className="min-h-screen bg-neutral-900 text-white p-8 flex flex-col justify-center">
      <h1 className="text-4xl text-center font-bold mb-8">
        encuentra la plantilla perfecta para tu negocio
      </h1>
      <div className="grid md:grid-cols-2 gap-8 md:px-40 items-center justify-center">
        <div className="space-y-4">
          <Accordion type="single" collapsible defaultValue="item-2">
            {steps.map((step, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className={cn(
                    "text-lg font-medium",
                    openStep === index && "text-[#a3eef5]"
                  )}
                  onClick={() => setOpenStep(index)}
                >
                  {index + 1}. {step.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">{step.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Card>
          <Image
            src="https://res.cloudinary.com/do3k4ocu4/image/upload/v1729375314/mzabytoowu49x1og9xix.png"
            alt="Invoice preview"
            width={1920}
            height={1080}
            className="object-cover rounded-lg"
          />
        </Card>
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
          ver plantilla <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
