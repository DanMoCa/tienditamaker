import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default async function Newest() {
  const data = [
    {
      _id: "1",
      name: "Polo de algodón",
      categoryName: "Hombres",
      price: 25.0,
      imageUrl:
        "https://utfs.io/f/1xhj3j2zEPRNfrHN7dC6s1S0R75wL3lAVCbqKGjiPoQx9zge",
      slug: "polo-de-algodon",
    },
    {
      _id: "2",
      name: "Pantalón de mezclilla",
      categoryName: "Hombres",
      price: 45.0,
      imageUrl:
        "https://utfs.io/f/1xhj3j2zEPRNfrHN7dC6s1S0R75wL3lAVCbqKGjiPoQx9zge",
      slug: "pantalon-de-mezclilla",
    },
    {
      _id: "3",
      name: "Blusa de algodón",
      categoryName: "Mujeres",
      price: 30.0,
      imageUrl:
        "https://utfs.io/f/1xhj3j2zEPRNfrHN7dC6s1S0R75wL3lAVCbqKGjiPoQx9zge",
      slug: "blusa-de-algodon",
    },
    {
      _id: "4",
      name: "Falda de mezclilla",
      categoryName: "Mujeres",
      price: 40.0,
      imageUrl:
        "https://utfs.io/f/1xhj3j2zEPRNfrHN7dC6s1S0R75wL3lAVCbqKGjiPoQx9zge",
      slug: "falda-de-mezclilla",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            productos nuevos
          </h2>

          <Link className="text-primary flex items-center gap-x-1" href="/all">
            ver todos{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
