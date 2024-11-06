"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Mail, Phone } from "lucide-react";

const faqs = [
  {
    question: "¿cuál es el tiempo de entrega?",
    answer:
      "nuestro tiempo de entrega estándar es de 3 a 5 días hábiles. pero dependiendo del proveedor de envíos, puede variar. te enviaremos un correo electrónico con tu número de seguimiento una vez que tu pedido haya sido enviado.",
  },
  {
    question: "¿cómo puedo hacer un cambio/devolución?",
    answer:
      "puedes solicitar un cambio o devolución dentro de los 30 días posteriores a la compra. visita nuestra página de devoluciones para iniciar el proceso. asegúrate de que el artículo esté en su estado original con todas las etiquetas.",
  },
  {
    question: "¿ofrecen envío internacional?",
    answer:
      "no ofrecemos envío internacional en este momento solo en méxico. sin embargo, estamos trabajando para expandirnos a otros países en el futuro. mantente atento a actualizaciones en nuestra página de envíos.",
  },
  {
    question: "¿cómo puedo rastrear mi pedido?",
    answer:
      "una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento. puedes usar este número directamente en el sitio web del servicio de paquetería.",
  },
  {
    question: "¿tienen tiendas físicas?",
    answer:
      "actualmente, operamos exclusivamente en línea. esto nos permite ofrecer los mejores precios y llegar a clientes en todo el país. sin embargo, estamos considerando abrir tiendas físicas en el futuro.",
  },
];

const enlaces = [
  { titulo: "política de privacidad", url: "/privacidad" },
  { titulo: "términos y condiciones", url: "/terminos" },
  { titulo: "guía de tallas", url: "/guia-tallas" },
  { titulo: "cuidado de prendas", url: "/cuidado-prendas" },
  { titulo: "programa de lealtad", url: "/lealtad" },
];

export default function SeccionAyuda() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", { nombre, email, mensaje });
    // Resetear el formulario
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto pt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">centro de ayuda</h1>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">preguntas frecuentes</TabsTrigger>
          <TabsTrigger value="contacto">contacto</TabsTrigger>
          <TabsTrigger value="enlaces">enlaces útiles</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>preguntas frecuentes</CardTitle>
              <CardDescription>
                encuentra respuestas a las preguntas más comunes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto">
          <Card>
            <CardHeader>
              <CardTitle>contáctanos</CardTitle>
              <CardDescription>
                estamos aquí para ayudarte. envíanos un mensaje y te
                responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">nombre</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">mensaje</Label>
                  <Textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">enviar mensaje</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+52 614 353 46 30</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>jemg2510@gmail.com</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="enlaces">
          <Card>
            <CardHeader>
              <CardTitle>enlaces útiles</CardTitle>
              <CardDescription>
                información adicional que puede ser de tu interés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {enlaces.map((enlace, index) => (
                  <li key={index}>
                    <a
                      href={enlace.url}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {enlace.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
