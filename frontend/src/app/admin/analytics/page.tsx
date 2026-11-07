"use client";
import { LineChart, BarChart } from "lucide-react";

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <LineChart className="text-gold" size={32} />
            Data Analytics
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Macro collection telemetry and user engagement heatmap.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-noir border border-muted/20 p-6 rounded-md shadow-xl h-80 flex flex-col justify-between">
            <h2 className="font-serif text-lg text-parchment">User Conversion Flow</h2>
            <div className="flex-1 border-b border-l border-muted/20 mt-4 flex items-end justify-around pb-0 pt-4 cursor-crosshair">
               {/* Mock bars */}
               <div className="bg-blue-500/20 w-16 h-[90%] border-t border-blue-500/50 relative group">
                  <span className="absolute -top-6 text-[10px] uppercase text-parchment/40">Visits</span>
               </div>
               <div className="bg-blue-500/40 w-16 h-[50%] border-t border-blue-500/50 relative group">
                  <span className="absolute -top-6 text-[10px] uppercase text-parchment/40">Reg</span>
               </div>
               <div className="bg-gold w-16 h-[30%] border-t border-gold relative group shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <span className="absolute -top-6 text-[10px] uppercase text-gold font-bold">Bids</span>
               </div>
            </div>
         </div>

         <div className="bg-noir border border-muted/20 p-6 rounded-md shadow-xl h-80 flex flex-col">
            <h2 className="font-serif text-lg text-parchment mb-4">Traffic Heatmap (Last 24h)</h2>
            <div className="flex-1 grid grid-cols-6 grid-rows-4 gap-1">
               {Array(24).fill(0).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.8 ? 'bg-gold/80' : Math.random() > 0.4 ? 'bg-gold/30' : 'bg-muted/10'}`}></div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
