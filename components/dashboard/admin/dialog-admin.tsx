"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing/uploadthing";
import { toast } from "sonner";
import { setNewProvider } from "@/utils/actions/provider/provider";
import { X } from "lucide-react";

// Modificado el schema para manejar una sola imagen
const providerSchema = z.object({
  name: z.string().min(1, "El nombre del proveedor es requerido"),
  description: z.string().min(1, "La descripción del proveedor es requerida"),
  image: z.string().min(1, "La imagen del proveedor es requerida"),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

export default function DialogDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const resetForm = () => {
    form.reset({
      name: "",
      description: "",
      image: "",
    });
  };

  const onSubmit = async (data: ProviderFormValues) => {
    setIsSubmitting(true);
    try {
      await setNewProvider({
        name: data.name,
        description: data.description,
        image: data.image, // Ahora enviamos solo una URL de imagen
      });
      toast.success("Proveedor agregado correctamente");
      setIsOpen(false); // Cerrar el diálogo después de guardar
      resetForm(); // Resetear el formulario
    } catch (error) {
      toast.error("Ocurrió un error al agregar el proveedor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>agregar proveedor</DialogTitle>
          <DialogDescription>
            llena el formulario para agregar un nuevo proveedor
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>imagen del proveedor</FormLabel>
                  <div className="space-y-2">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(files) => {
                        if (files?.[0]) {
                          form.setValue("image", files[0].url);
                          toast.success("Imagen subida correctamente");
                        }
                      }}
                      onUploadError={(error) => {
                        toast.error(
                          `Error al subir la imagen: ${error.message}`
                        );
                      }}
                      className="mt-4 ut-button:bg-[#a3eef5] ut-button:ut-readying:bg-[#a3eef5]/50 ut-button:text-gray-900"
                    />
                    {field.value && (
                      <div className="relative">
                        <Input
                          value={field.value}
                          readOnly
                          disabled
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => form.setValue("image", "")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "guardando..." : "guardar proveedor"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
