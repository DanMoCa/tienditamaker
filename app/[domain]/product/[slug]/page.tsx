import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import ImageGallery from "../../_components/image-gallery";
import AddToBag from "../../_components/add-to-bag";
import CheckoutNow from "../../_components/checkout-now";

export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  const data = {
    _id: "1",
    name: "Producto 1",
    categoryName: "Categoría 1",
    price: 200,
    price_id: "price_1Jd8e1Lw8e1Lw8e1Lw8e1Lw",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo auctor, ultrices nunc ac, ultricies odio. Nullam in turpis ut nunc varius varius. Nullam id justo nec justo congue feugiat. Nullam in turpis ut nunc varius varius. Nullam id justo nec justo congue feugiat. Nullam in turpis ut nunc varius varius. Nullam id justo nec justo congue feugiat.",
    images: [
      {
        id: "1",
        url: "https://via.placeholder.com/800x800",
      },
      {
        id: "2",
        url: "https://via.placeholder.com/800x800",
      },
      {
        id: "3",
        url: "https://via.placeholder.com/800x800",
      },
    ],
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 reseñas
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                incluye impuestos y envío
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 días de envío</span>
            </div>

            <div className="flex gap-2.5">
              <AddToBag
                currency="MXN"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <CheckoutNow
                currency="MXN"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
