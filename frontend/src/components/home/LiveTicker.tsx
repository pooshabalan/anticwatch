"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const DUMMY_LIVETICKER = [
  { id: 1, name: "Rolex Daytona Ref. 6263", price: "$124,500", change: "+2.3%", isUp: true },
  { id: 2, name: "Patek Philippe Nautilus", price: "$85,000", change: "-0.8%", isUp: false },
  { id: 3, name: "Audemars Piguet Royal Oak", price: "$65,200", change: "+1.4%", isUp: true },
  { id: 4, name: "Vacheron Constantin Overseas", price: "$42,000", change: "+0.5%", isUp: true },
];

export function LiveTicker() {
  return (
    <div className="w-full bg-muted/20 border-y border-muted overflow-hidden flex whitespace-nowrap py-3">
      <div className="animate-ticker flex gap-12 px-6">
        {[...DUMMY_LIVETICKER, ...DUMMY_LIVETICKER, ...DUMMY_LIVETICKER].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm font-sans min-w-max">
            <span className="text-parchment opacity-80">{item.name}</span>
            <span className="text-gold font-semibold">{item.price}</span>
            <span className={`flex items-center text-xs font-bold ${item.isUp ? 'text-success' : 'text-danger'}`}>
              {item.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
