"use client";
import { useState, useEffect } from "react";
import { FilterBar } from "@/components/archive/FilterBar";
import { WatchCard } from "@/components/ui/WatchCard";

export default function ArchivePage() {
  const [watches, setWatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedBrand, setSelectedBrand] = useState("All Timepieces");
  const [sortBy, setSortBy] = useState("Latest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch('/api/watches')
      .then(res => res.json())
      .then(data => { setWatches(data); setLoading(false); });
  }, []);
  
  // Filter States
  const [filters, setFilters] = useState({
    decades: [] as string[],
    complications: [] as string[],
    materials: [] as string[]
  });

  const toggleFilter = (category: 'decades' | 'complications' | 'materials', value: string) => {
    setFilters(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      };
    });
  };

  const getPrice = (priceStr: string) => Number(priceStr.replace(/[^0-9.-]+/g,""));

  const filteredData = watches.filter(watch => {
    // Brand Filter
    if (selectedBrand !== "All Timepieces" && watch.brand !== selectedBrand) return false;
    // Advanced Filters
    if (filters.decades.length > 0 && !filters.decades.includes(watch.decade)) return false;
    if (filters.complications.length > 0 && !filters.complications.includes(watch.complication)) return false;
    if (filters.materials.length > 0 && !filters.materials.includes(watch.material)) return false;
    return true;
  }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return getPrice(a.price) - getPrice(b.price);
      if (sortBy === "Price: High to Low") return getPrice(b.price) - getPrice(a.price);
      return 0; // Default or "Latest" roughly retains the source order
    });
  return (
    <main className="flex min-h-screen flex-col w-full bg-noir pt-20">
      {/* Archive Header */}
      <section className="px-6 py-16 max-w-screen-2xl mx-auto w-full text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6 border-b border-muted/10">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-gold mb-4 tracking-wide">
            The Archive
          </h1>
          <p className="text-parchment/70 font-sans max-w-xl text-lg font-light leading-relaxed">
            Browse our meticulously curated collection of rare, vintage, and historically significant timepieces. Waitlist available for highly sought-after pieces.
          </p>
        </div>
        <p className="text-muted tracking-[0.2em] uppercase text-xs font-bold shrink-0">
          Showing {filteredData.length} Timepiece{filteredData.length !== 1 ? 's' : ''}
        </p>
      </section>

      <FilterBar 
        selectedBrand={selectedBrand} 
        onSelectBrand={setSelectedBrand} 
        sortBy={sortBy}
        onSortChange={setSortBy}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Expandable Advanced Filters */}
      {showFilters && (
        <section className="px-6 py-8 border-b border-muted/10 bg-noir/50">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-gold font-sans uppercase tracking-widest text-xs font-bold mb-2">Decade</h4>
              {["1940s", "1950s", "1960s", "1970s", "1980s", "1990s"].map(dec => (
                <label key={dec} className="flex items-center gap-3 text-parchment/70 text-sm hover:text-gold cursor-pointer">
                  <input type="checkbox" className="accent-gold" checked={filters.decades.includes(dec)} onChange={() => toggleFilter('decades', dec)} /> {dec}
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gold font-sans uppercase tracking-widest text-xs font-bold mb-2">Complications</h4>
              {["Chronograph", "Perpetual Calendar", "None"].map(comp => (
                <label key={comp} className="flex items-center gap-3 text-parchment/70 text-sm hover:text-gold cursor-pointer">
                  <input type="checkbox" className="accent-gold" checked={filters.complications.includes(comp)} onChange={() => toggleFilter('complications', comp)} /> {comp}
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-gold font-sans uppercase tracking-widest text-xs font-bold mb-2">Case Material</h4>
              {["Stainless Steel", "Yellow Gold", "Platinum"].map(mat => (
                <label key={mat} className="flex items-center gap-3 text-parchment/70 text-sm hover:text-gold cursor-pointer">
                  <input type="checkbox" className="accent-gold" checked={filters.materials.includes(mat)} onChange={() => toggleFilter('materials', mat)} /> {mat}
                </label>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="px-6 py-12 max-w-screen-2xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredData.length > 0 ? (
            filteredData.map((watch, idx) => (
              <WatchCard key={watch.id} {...watch} delay={(idx % 4) * 0.15} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-muted">
              <p>No timepieces found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
