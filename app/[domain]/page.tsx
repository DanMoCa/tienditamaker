import { readStoreDomain } from "@/utils/actions/store/read-store-domain";
import Hero from "./_components/hero";
import Newest from "./_components/newest";

export default async function page({ params }: { params: { domain: string } }) {
  const result = await readStoreDomain(params?.domain);

  const siteName = result?.[0]?.name;
  const siteDomain = result?.[0]?.subdomain;
  const siteDescription = result?.[0]?.description;
  const siteLogo = result?.[0]?.logo;
  const siteSlogan = result?.[0]?.slogan;
  const siteId = result?.[0]?.id;
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero
        fullData={{
          slogan: siteSlogan,
          logo: siteLogo,
          name: siteName,
        }}
      />
      <Newest id={siteId} />
    </div>
  );
}
