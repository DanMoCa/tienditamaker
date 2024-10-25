"use client";

import { useEffect, useState } from "react";
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
import { useUser } from "@/utils/contexts/user-context";
import { useRouter } from "next/navigation";

const faqs = [
  {
    question: "¿Cuál es el tiempo de entrega?",
    answer:
      "Nuestro tiempo de entrega estándar es de 3 a 5 días hábiles. Para pedidos urgentes, ofrecemos envío express con entrega en 1-2 días hábiles por un costo adicional.",
  },
  {
    question: "¿Cómo puedo hacer un cambio o devolución?",
    answer:
      "Puedes solicitar un cambio o devolución dentro de los 30 días posteriores a la compra. Visita nuestra página de devoluciones para iniciar el proceso. Asegúrate de que el artículo esté en su estado original con todas las etiquetas.",
  },
  {
    question: "¿Ofrecen envío internacional?",
    answer:
      "Sí, ofrecemos envíos internacionales a la mayoría de los países. Los costos y tiempos de envío varían según el destino. Puedes ver las opciones disponibles durante el proceso de pago.",
  },
  {
    question: "¿Cómo puedo rastrear mi pedido?",
    answer:
      "Una vez que tu pedido haya sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar este número en nuestra página de 'Rastrear Pedido' o directamente en el sitio web del servicio de paquetería.",
  },
  {
    question: "¿Tienen tiendas físicas?",
    answer:
      "Actualmente, operamos exclusivamente en línea. Esto nos permite ofrecer los mejores precios y llegar a clientes en todo el país. Sin embargo, estamos considerando abrir tiendas físicas en el futuro.",
  },
];

const enlaces = [
  { titulo: "Política de Privacidad", url: "/privacidad" },
  { titulo: "Términos y Condiciones", url: "/terminos" },
  { titulo: "Guía de Tallas", url: "/guia-tallas" },
  { titulo: "Cuidado de Prendas", url: "/cuidado-prendas" },
  { titulo: "Programa de Lealtad", url: "/lealtad" },
];

export default function SeccionAyuda() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", { nombre, email, mensaje });
    // Resetear el formulario
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.userType === "free") {
        // Redirige a la página de inicio o a una página de actualización
        router.push("/upgrade"); // Cambia "/upgrade" a la ruta que desees
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Centro de Ayuda</h1>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
          <TabsTrigger value="enlaces">Enlaces Útiles</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Encuentra respuestas a las preguntas más comunes
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
              <CardTitle>Contáctanos</CardTitle>
              <CardDescription>
                Estamos aquí para ayudarte. Envíanos un mensaje y te
                responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Enviar Mensaje</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>ayuda@tutienda.com</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="enlaces">
          <Card>
            <CardHeader>
              <CardTitle>Enlaces Útiles</CardTitle>
              <CardDescription>
                Información adicional que puede ser de tu interés
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
