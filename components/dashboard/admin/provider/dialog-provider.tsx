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
import { setNewProduct } from "@/utils/actions/provider/provider";
import { X } from "lucide-react";

// Modificado el schema para manejar múltiples imágenes
const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es requerido"),
  description: z.string().min(1, "La descripción del producto es requerida"),
  price: z.string().min(1, "El precio del producto es requerido"),
  images: z
    .array(z.string().url("La URL de la imagen no es válida"))
    .min(1, "Se requiere al menos una imagen"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function DialogDemo({
  children,
  providerId,
}: {
  children: React.ReactNode;
  providerId: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      images: [],
    },
  });

  const resetForm = () => {
    form.reset({
      name: "",
      description: "",
      price: "0",
      images: [],
    });
  };

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const trans = await setNewProduct(providerId, {
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
      });
      console.log({ trans });

      toast.success("Producto agregado correctamente");
      setIsOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Ocurrió un error al agregar el producto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>agregar productos</DialogTitle>
          <DialogDescription>
            llena el formulario para agregar un nuevo producto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nombre del producto</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre del producto" {...field} />
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
                  <FormLabel>descripción del producto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>precio del producto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="precio del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>imágenes del producto</FormLabel>
                  <div className="space-y-2">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(files) => {
                        if (files?.length) {
                          // Agregar las nuevas URLs al array existente
                          const newUrls = files.map((file) => file.url);
                          const currentUrls = field.value || [];
                          form.setValue("images", [...currentUrls, ...newUrls]);
                          toast.success("Imágenes subidas correctamente");
                        }
                      }}
                      onUploadError={(error) => {
                        toast.error(
                          `Error al subir las imágenes: ${error.message}`
                        );
                      }}
                      className="mt-4 ut-button:bg-[#a3eef5] ut-button:ut-readying:bg-[#a3eef5]/50 ut-button:text-gray-900"
                    />
                    <div className="space-y-2">
                      {field.value?.map((url, index) => (
                        <div key={index} className="relative">
                          <Input
                            value={url}
                            readOnly
                            disabled
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => {
                              const newUrls = [...field.value];
                              newUrls.splice(index, 1);
                              form.setValue("images", newUrls);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "guardando..." : "guardar producto"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
