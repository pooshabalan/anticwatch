"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, X } from "lucide-react";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [watches, setWatches] = useState<any[]>([]);

  useEffect(() => {
    if (isSearchOpen && watches.length === 0) {
      fetch('/api/watches').then(res => res.json()).then(data => setWatches(data));
    }
  }, [isSearchOpen]);
  
  // Close search on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsSearchOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : watches.filter(watch => 
        watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
        watch.model.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  return (
    <nav className="fixed top-0 w-full z-50 bg-noir/80 backdrop-blur-md border-b border-muted transition-all duration-300">
      <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <div className="flex items-center gap-8">

          {/* ── Logo Model 1: Minimalist Chronograph ── */}
          <Link href="/" className="flex items-center gap-3 group">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-transform duration-700 ease-in-out group-hover:scale-110" fill="none" stroke="currentColor">
              {/* Outer Bezel */}
              <circle cx="20" cy="20" r="18" strokeWidth="1" className="opacity-80" />
              <circle cx="20" cy="20" r="16" strokeWidth="0.5" className="opacity-40" />
              
              {/* Center Pin */}
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              
              {/* Hour hand pointing to 11 */}
              <line x1="20" y1="20" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" className="opacity-90" />
              
              {/* Minute hand pointing to 12 */}
              <line x1="20" y1="20" x2="20" y2="5" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Sweeping seconds hand */}
              <line x1="20" y1="20" x2="26" y2="28" strokeWidth="0.5" strokeLinecap="round" opacity="0.5" />
              <circle cx="26" cy="28" r="0.5" fill="currentColor" opacity="0.5" />

              {/* Hour tick marks at 12 / 3 / 6 / 9 */}
              <path d="M20 2 v2 M20 36 v2 M2 20 h2 M36 20 h2" strokeWidth="1.5" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl text-gold tracking-wide leading-none">TEH.</span>
              <span className="text-parchment/30 text-[8px] tracking-[0.25em] uppercase font-sans mt-0.5">The Eleventh Hour</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm text-parchment/80 font-medium">
            <Link href="/archive" className="hover:text-gold transition-colors">Archive</Link>
            <Link href="/auctions" className="hover:text-gold transition-colors">Auctions</Link>
            <Link href="/editorial" className="hover:text-gold transition-colors">Editorial</Link>
          </div>
        </div>

        <div className="flex items-center gap-6 text-parchment/80">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-gold transition-colors">
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <Link href="/auth" className="hover:text-gold transition-colors"><User size={20} /></Link>
          <Link href="/checkout" className="hover:text-gold transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-gold text-noir text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </Link>
        </div>

        {/* Real-time Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-noir border-b border-gold/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="max-w-3xl mx-auto p-6">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={20} />
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brands, models, references..." 
                  className="w-full bg-muted/10 border border-muted/20 text-parchment p-4 pl-12 focus:outline-none focus:border-gold/50 transition-colors placeholder:text-parchment/30 text-lg font-light"
                />
              </div>

              {searchQuery && searchResults.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-gold text-xs uppercase tracking-widest font-bold mb-2">Results</h3>
                  {searchResults.map(watch => (
                    <Link key={watch.id} href="/archive" onClick={() => setIsSearchOpen(false)} className="flex items-center justify-between p-3 hover:bg-muted/10 border border-transparent hover:border-gold/20 transition-all group">
                      <div className="flex items-center gap-4">
                        <img src={watch.image} alt={watch.model} className="w-12 h-12 object-cover rounded-sm opacity-80 group-hover:opacity-100" />
                        <div>
                          <p className="text-parchment text-sm font-medium group-hover:text-gold transition-colors">{watch.brand}</p>
                          <p className="text-parchment/60 text-xs">{watch.model}</p>
                        </div>
                      </div>
                      <span className="text-gold text-sm font-light">{watch.price}</span>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="py-8 text-center text-parchment/50">
                   No precise matches found for "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
