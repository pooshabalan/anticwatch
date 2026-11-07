import { HeroSection } from "@/components/home/HeroSection";
import { LiveTicker } from "@/components/home/LiveTicker";
import { FeaturedTimepieces } from "@/components/home/FeaturedTimepieces";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-noir">
      <HeroSection />
      <LiveTicker />
      <FeaturedTimepieces />
    </main>
  );
}
