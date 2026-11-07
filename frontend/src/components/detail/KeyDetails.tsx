import { ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function KeyDetails({ watch }: { watch: any }) {
  return (
    <div className="flex flex-col h-full md:sticky md:top-32">
      <div className="mb-8 border-b border-muted/30 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={16} className="text-success" />
          <span className="text-xs uppercase tracking-widest text-parchment/60 font-sans font-medium">Verified Authentic & Certified</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-serif text-parchment mb-2">{watch.brand}</h1>
        <h2 className="text-xl text-parchment/80 font-light mb-8">{watch.model}</h2>
        
        <div className="flex items-end gap-5 mb-4">
          <span className="text-4xl md:text-5xl text-gold font-serif tracking-wide">{watch.price}</span>
          <span className="text-sm text-parchment/60 flex items-center gap-1 mb-2">
            <ArrowUpRight size={14} className="text-success" /> +2.3% (30d)
          </span>
        </div>
        
        <p className="text-xs text-muted max-w-sm leading-relaxed">
          Price includes fully insured international delivery in luxury archival packaging. Local duties and taxes calculated at checkout.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 mb-10">
        <Link href="/checkout" className="w-full">
          <Button variant="primary" size="lg" className="w-full text-base tracking-widest uppercase font-semibold h-14">
            Acquire Immediately
          </Button>
        </Link>
        <button className="relative w-full border border-gold/50 text-gold flex flex-col items-center justify-center rounded-sm hover:bg-gold/10 transition-colors h-16 group">
          <span className="text-base tracking-widest uppercase font-semibold">Place Bid</span>
          <span className="text-[10px] text-parchment/50 font-sans group-hover:text-parchment/80 transition-colors">Current highest bid: {watch.price.replace("4","2")}</span>
        </button>
        
        <div className="flex justify-center items-center mt-3 text-xs text-parchment/60 gap-2 font-medium">
          <Clock size={14} className="text-danger" /> Auction concludes in 12h 45m
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-auto pt-8 flex gap-12 border-t border-muted/30">
        <div>
          <p className="text-parchment/50 text-xs font-sans uppercase tracking-widest mb-2">Seller Archive</p>
          <p className="text-gold text-sm font-medium">The Primary Vault</p>
        </div>
        <div>
          <p className="text-parchment/50 text-xs font-sans uppercase tracking-widest mb-2">Location</p>
          <p className="text-parchment/90 text-sm font-medium">Geneva, CH</p>
        </div>
      </div>
    </div>
  );
}
