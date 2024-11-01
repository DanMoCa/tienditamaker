import Features from "@/components/features";
import Sell from "@/components/sell";
import Templates from "@/components/templates";
import PricingSection from "@/components/pricing";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="bg-black">
      <main>
        <Hero />
        <Features />
        <Sell />
        <Templates />
        <Providers />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
