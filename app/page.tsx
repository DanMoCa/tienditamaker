import Header from "@/components/header";
import Features from "@/components/features";
import Sell from "@/components/sell";
import Templates from "@/components/templates";
import PricingSection from "@/components/pricing";
import Payment from "@/components/payment";

export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <Features />
        <Sell />
        <Templates />
        <PricingSection />
      </main>
    </div>
  );
}
