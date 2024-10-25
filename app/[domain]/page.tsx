import { readStoreDomain } from "@/utils/actions/shops/read-store-domain";

export default async function page({ params }: { params: { domain: string } }) {
  const result = await readStoreDomain(params?.domain);
  return (
    <div className="flex flex-col mt-[1rem] justify-center items-center w-[90%]">
      <div className="flex flex-col items-center p-3 w-full">
        <div className="flex flex-col justify-start items-center gap-2 w-full">
          <div className="flex gap-3 justify-start items-center w-full">
            <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
              {result?.[0]?.name}
            </h1>
          </div>
          <div className="flex gap-3 justify-start items-center w-full border-b pb-4">
            <p className="text-gray-500">{result?.[0]?.description}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          hola
        </div>
      </div>
    </div>
  );
}
