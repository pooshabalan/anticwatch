"use client";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BRANDS = ["All Timepieces", "Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Cartier"];

interface FilterBarProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onToggleFilters: () => void;
}

export function FilterBar({ selectedBrand, onSelectBrand, sortBy, onSortChange, onToggleFilters }: FilterBarProps) {
  return (
    <div className="w-full bg-noir border-y border-muted/30 sticky top-20 z-40 backdrop-blur-md bg-opacity-90">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Horizontal scrollable brands for mobile / desktop */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 text-sm font-sans mr-6">
          {BRANDS.map((brand) => (
            <button 
              key={brand} 
              onClick={() => onSelectBrand(brand)}
              className={`whitespace-nowrap transition-colors ${selectedBrand === brand ? 'text-gold font-medium border-b border-gold pb-1' : 'text-parchment/60 hover:text-parchment'}`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Global Filters & Sort */}
        <div className="flex items-center gap-4 border-l border-muted/30 pl-6 shrink-0 relative">
          <select 
            className="flex items-center gap-2 text-sm text-parchment/80 bg-transparent hover:text-gold transition-colors outline-none cursor-pointer appearance-none pr-6"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="Latest" className="bg-noir text-parchment">Sort: Latest</option>
            <option value="Price: Low to High" className="bg-noir text-parchment">Price: Low to High</option>
            <option value="Price: High to Low" className="bg-noir text-parchment">Price: High to Low</option>
          </select>
          <ChevronDown size={14} className="absolute right-[115px] md:right-32 pointer-events-none text-parchment/80 hidden sm:block" />
          
          <Button variant="outline" size="sm" className="h-9 px-4 hidden md:flex gap-2" onClick={onToggleFilters}>
            <SlidersHorizontal size={14} />
            Filters
          </Button>
          
          {/* Mobile filter button */}
          <button className="md:hidden text-parchment hover:text-gold" onClick={onToggleFilters}>
            <Filter size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
