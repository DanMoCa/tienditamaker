"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { PlusCircle, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

export default function AddProviderForm() {
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
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Agregar Nuevo Proveedor</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Proveedor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del proveedor" {...field} />
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
                  <FormLabel>Descripción del Proveedor</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del proveedor"
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
                  <FormLabel>Imagen del Proveedor</FormLabel>
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

            <div>
              <h3 className="text-lg font-semibold mb-4">Productos</h3>
              {fields.map((field, index) => (
                <Card key={field.id} className="mb-4">
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name={`products.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del Producto</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`products.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción del Producto</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`products.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio del Producto</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`products.${index}.images`}
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Imágenes del Producto</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({ name: "", description: "", price: "", images: null })
                }
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Producto
              </Button>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Proveedor"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
