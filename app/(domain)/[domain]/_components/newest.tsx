import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  getProductsByStoreId,
  getStoreIdByDomain,
} from "@/utils/actions/store/store-config";

interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  images: any;
}

export default async function Newest({ id }: { id: number }) {
  const data = await getProductsByStoreId(id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            productos nuevos
          </h2>

          <Link
            className="text-primary flex items-center gap-x-1"
            href="/products"
          >
            ver todos{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product: ProductData) => (
            <div key={product.id} className="group relative">
              <Link
                href={`/product/${product.name.trim().replace(/ /g, "-")}?id=${
                  product.id
                }`}
                passHref
              >
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.images[0]}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>
              </Link>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link
                      href={`/product/${product.name
                        .trim()
                        .replace(/ /g, "-")}?id=${product.id}`}
                      passHref
                    >
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
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
