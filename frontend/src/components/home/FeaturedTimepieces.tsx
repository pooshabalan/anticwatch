"use client";
import { useEffect, useState } from "react";
import { WatchCard } from "@/components/ui/WatchCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function FeaturedTimepieces() {
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/watches')
      .then(res => res.json())
      .then(data => setFeatured(data.slice(0, 3)));
  }, []);
  return (
    <section className="py-32 px-6 max-w-screen-2xl mx-auto w-full relative z-10 bg-noir">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-muted/30 pb-8">
        <div>
          <h2 className="text-xs font-sans tracking-[0.3em] text-gold uppercase mb-4 opacity-80">Curated Collection</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-parchment">Featured Timepieces</h3>
        </div>
        <Link href="/archive" className="mt-6 md:mt-0">
          <Button variant="outline" className="px-8 w-full md:w-auto">
            View Full Archive
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((watch, idx) => (
          <WatchCard key={watch.id} {...watch} delay={idx * 0.2} />
        ))}
      </div>
    </section>
  );
}
