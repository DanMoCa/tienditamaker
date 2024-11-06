import { Button } from "@/components/ui/button";
import { Lock, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function MobileMockup({
  name,
  subdomain,
  logo,
  slogan,
  primaryColor,
  secondaryColor,
}: {
  name: string;
  subdomain: string;
  logo: string;
  slogan: string;
  primaryColor: string;
  secondaryColor: string;
}) {
  const getLastWord = (str: string) => str.split(" ").pop();
  const getWithoutLastWord = (str: string) =>
    str.split(" ").slice(0, -1).join(" ");
  return (
    <div className="relative mx-auto border-neutral-800 dark:border-neutral-800 bg-gray-100 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      <div className="h-[32px] w-[3px] bg-gray-100 dark:bg-gray-100 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-100 dark:bg-gray-100 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-100 dark:bg-gray-100 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-100 dark:bg-gray-100 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-100 text-black mx-auto max-w-2xl px-2">
        <div className="flex justify-center items-center text-xs my-2 gap-2">
          <Lock size={16} />
          <p className="font-extralight">
            https://
            <span style={{ color: primaryColor, fontWeight: "bold" }}>
              {subdomain}
            </span>
            .tienditamaker.com
          </p>
        </div>
        <div className="flex items-center justify-between mx-auto max-w-2xl px-4">
          <h1 className="text-lg font-extrabold">
            {" "}
            {getWithoutLastWord(name)}{" "}
            <span style={{ color: primaryColor }}>{getLastWord(name)}</span>
          </h1>
          <div className="flex divide-x">
            <Button
              variant="ghost"
              className="flex flex-col gap-y-1.5 h-12 w-12 rounded-none bg-transparent"
            >
              <ShoppingBag color="#000" />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                carrito
              </span>
            </Button>
          </div>
        </div>
        <div className="mb-12 flex w-full">
          <div>
            <div className="mb-6 mt-6 flex w-full flex-col justify-center">
              <h1 className="mb-4 text-3xl font-extrabold text-black ">
                {slogan}
              </h1>
              <p className="text-sm leading-relaxed text-gray-500 ">
                los productos más exclusivos y de alta calidad, simplemente los
                mejores.
              </p>
            </div>
            <div className="mb-12 flex w-full">
              <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                <Image
                  // Si el logo no existe, se puede usar un placeholder
                  src={
                    logo ||
                    "https://utfs.io/f/rF2DW7sv5SQ0y26zGxad0ubJeKm6RifY7XDLqHxWM2zTln3a"
                  }
                  alt={`logo de ${name}`}
                  className="h-full w-full object-cover object-center"
                  priority
                  width={500}
                  height={500}
                />
              </div>

              <div className="overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                <Image
                  // Si el logo no existe, se puede usar un placeholder
                  src={
                    logo ||
                    "https://utfs.io/f/rF2DW7sv5SQ0y26zGxad0ubJeKm6RifY7XDLqHxWM2zTln3a"
                  }
                  alt={`logo de ${name}`}
                  className="h-full w-full object-cover object-center"
                  priority
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
