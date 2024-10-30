"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { setNewProduct } from "@/utils/actions/product/product";
import { getProducts, getProviders } from "@/utils/actions/provider/provider";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing/uploadthing";
import { X } from "lucide-react";

const formSchema = z.object({
  providerProductId: z
    .string()
    .min(1, "por favor selecciona un producto del proveedor"),
  name: z.string().min(1, "nombre es requerido"),
  description: z.string().min(1, "descripción es requerida"),
  price: z.number().min(0, "El precio del producto es requerido"),
  images: z
    .array(z.string().url("La URL de la imagen no es válida"))
    .min(1, "Se requiere al menos una imagen"),
  customizations: z.record(z.string()).optional(),
});

type ProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  storeId: number;
};

export default function ProductDialog({
  isOpen,
  onClose,
  storeId,
}: ProductDialogProps) {
  const [selectedProviderProduct, setSelectedProviderProduct] =
    useState<any>(null);
  const [groupedProducts, setGroupedProducts] = useState<{
    [key: string]: any;
  }>({});
  const [providers, setProviders] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      providerProductId: "",
      name: "",
      description: "",
      price: 0,
      images: [],

      customizations: {},
    },
  });

  useEffect(() => {
    const fetchProviderProducts = async () => {
      const providersData = await getProviders();
      setProviders(providersData);

      const groupedProductsData: { [key: string]: any } = {};

      await Promise.all(
        providersData.map(async (provider: any) => {
          const products = await getProducts(provider.id);
          groupedProductsData[provider.name] = products.map((product: any) => ({
            ...product,
            providerId: provider.id,
          }));
        })
      );

      setGroupedProducts(groupedProductsData);
    };

    fetchProviderProducts();
  }, []);

  const handleProviderProductChange = (value: string) => {
    const product = Object.values(groupedProducts)
      .flat()
      .find((p: any) => p.id.toString() === value);

    setSelectedProviderProduct(product || null);
    if (product) {
      form.setValue("name", product.name);
      form.setValue("description", product.description);
      form.setValue("price", product.price);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        images: data.images,
        storeId: storeId,
        providerProductId: parseInt(data.providerProductId),
      };

      await setNewProduct(productData);
      onClose();
      toast.success("producto creado correctamente");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Ocurrió un error al crear el producto");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>agregar nuevo producto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="providerProductId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>producto del proveedor</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleProviderProductChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="selecciona un producto del proveedor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(groupedProducts).map(
                        ([providerName, products]) => (
                          <SelectGroup key={providerName}>
                            <div className="flex my-4">
                              <Avatar>
                                <AvatarImage
                                  src={
                                    providers.find(
                                      (p) => p.name === providerName
                                    )?.image
                                  }
                                />
                                <AvatarFallback>
                                  {providerName
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <SelectLabel className="font-bold">
                                {providerName}
                              </SelectLabel>
                            </div>
                            {products.map((product: any) => (
                              <SelectItem
                                key={product.id}
                                value={product.id.toString()}
                              >
                                <div className="flex gap-4">
                                  <Image
                                    width={24}
                                    height={24}
                                    src={product.images[0]}
                                    alt={product.name}
                                  />
                                  {product.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>descripción</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
                  <FormLabel>precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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

            <DialogFooter>
              <Button type="submit">guardar cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
