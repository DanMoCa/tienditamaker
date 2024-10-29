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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
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

const providerSchema = z.object({
  name: z.string().min(1, "El nombre del proveedor es requerido"),
  description: z.string().min(1, "La descripción del proveedor es requerida"),
  image: z.array(z.string().min(1, "La imagen del proveedor es requerida")),
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
    },
  });

  const onSubmit = async (data: ProviderFormValues) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      await setNewProvider({
        name: data.name,
        description: data.description,
        image: data.image,
      });
      toast.success("Proveedor agregado correctamente");
    } catch (error) {
      toast.error("Ocurrió un error al agregar el proveedor");
    }

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
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>imagen del proveedor</FormLabel>
                  <FormControl>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(files) => {
                        form.setValue(
                          "image",
                          files.map((file) => file.url)
                        );
                        toast.success("imagen subida correctamente");
                      }}
                      className="mt-4 ut-button:bg-[#a3eef5] ut-button:ut-readying:bg-[#a3eef5]/50 ut-button:text-gray-900"
                    />
                  </FormControl>
                  {/* mostrar url del archivo en un input disabled */}
                  <FormControl>
                    <Input
                      value={value}
                      onChange={onChange}
                      placeholder="url de la imagen"
                      disabled
                      className="mt-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "guardando..." : "guardar proveedor"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
