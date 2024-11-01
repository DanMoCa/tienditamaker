"use client";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Templates() {
  const [openStep, setOpenStep] = useState<number | null>(0);

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
    <section
      className="min-h-screen bg-neutral-900 text-white p-8 flex flex-col justify-center"
      id="plantillas"
    >
      <h1 className="text-4xl text-center font-bold mb-8">
        encuentra la plantilla <span className="text-[#a3eef5]">perfecta</span>{" "}
        para tu negocio
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
          {/* <Image
            src="https://utfs.io/f/rF2DW7sv5SQ0D1RZ5Qh3dVtRoPKUeYIrbO5LizFgC7Bsyl9p"
            alt="Invoice preview"
            width={1920}
            height={1080}
            className="object-cover rounded-lg"
          /> */}
          <video className="w-full rounded-lg" autoPlay loop muted playsInline>
            <source
              src="https://utfs.io/f/rF2DW7sv5SQ0D1RZ5Qh3dVtRoPKUeYIrbO5LizFgC7Bsyl9p"
              type="video/mp4"
            />
            tu navegador no soporta videos
          </video>
        </Card>
      </div>
    </section>
  );
}
