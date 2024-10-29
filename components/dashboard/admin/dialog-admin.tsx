"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es requerido"),
  description: z.string().min(1, "La descripción del producto es requerida"),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "El precio debe ser un número válido",
  }),
  images: z
    .any()
    .refine((files) => files?.length > 0, "La imagen es requerida"),
});

const providerSchema = z.object({
  name: z.string().min(1, "El nombre del proveedor es requerido"),
  description: z.string().min(1, "La descripción del proveedor es requerida"),
  image: z.any().refine((files) => files?.length > 0, "La imagen es requerida"),
  products: z.array(productSchema),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

export default function DialogDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: "",
      description: "",
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSubmit = async (data: ProviderFormValues) => {
    setIsSubmitting(true);
    // Aquí iría la lógica para enviar los datos al servidor
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula una operación asíncrona
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>agregar proveedor</DialogTitle>
          <DialogDescription>
            Llena el formulario para agregar un nuevo proveedor
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nombre del proveedor</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre del proveedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>descripción del proveedor</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="descripción del proveedor"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>imagen del proveedor</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "guardando..." : "guardar proveedor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
