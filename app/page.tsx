import Header from "@/components/header";
import Features from "@/components/features";
import Sell from "@/components/sell";
import Templates from "@/components/templates";
import PricingSection from "@/components/pricing";
import Footer from "@/components/footer";
import Providers from "@/components/providers";

export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <main>
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
