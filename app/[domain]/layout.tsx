import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { readStoreDomain } from "@/utils/actions/store/read-store-domain";

interface SiteLayoutProps {
  params: { domain: string };
  children: ReactNode;
}

export default async function SiteLayout({
  params,
  children,
}: SiteLayoutProps) {
  const result = await readStoreDomain(params?.domain);

  if (!result) {
    notFound();
  }

  const siteName = result?.[0]?.name;
  const siteDomain = result?.[0]?.subdomain;
  const siteDescription = result?.[0]?.description;
  const siteLogo = result?.[0]?.logo;

  return (
    <div className="flex flex-col mt-[1rem] justify-center items-center w-[90%]">
      <div className="flex flex-col items-center p-3 w-full">
        <div className="flex flex-col justify-start items-center gap-2 w-full">
          <div className="flex gap-3 justify-start items-center w-full">
            <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
              {siteName} . {siteDomain}
            </h1>
          </div>
          <div className="flex gap-3 justify-start items-center w-full border-b pb-4">
            <p className="text-gray-500">{siteDescription}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full">
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          {children}
        </div>
      </div>
    </div>
  );
}
