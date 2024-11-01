"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Formulario enviado", { nombre, email, mensaje });
    // Reiniciar los campos del formulario
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          ¿Eres proveedor y quieres llegar a más clientes?
        </CardTitle>
        <CardDescription className="text-center">
          ¡Contáctame y descubre cómo puedo ayudarte!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Textarea
              id="mensaje"
              placeholder="¿Cómo puedo ayudarte?"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-center text-gray-500">
        Nos pondremos en contacto contigo pronto.
      </CardFooter>
    </Card>
  );
}
