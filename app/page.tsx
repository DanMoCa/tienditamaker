import Header from "@/components/header";
import Features from "@/components/features";
import Sell from "@/components/sell";
import Templates from "@/components/templates";

export default function Home() {
  return (
    <div className="bg-black">
      <Header />
      <main>
        <Features />
        <Sell />
        <Templates />
      </main>
    </div>
  );
}
