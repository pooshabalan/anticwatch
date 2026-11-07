"use client";
import { ArrowRightLeft, Lock, CheckCircle2, Clock } from "lucide-react";

export default function Transactions() {
  const tx = [
    { id: "TX-9901A", item: "Rolex Submariner 5513", amount: 24000, status: "Escrow Locked", date: "Today, 14:30" },
    { id: "TX-9900B", item: "Omega Speedmaster Ref 105.012", amount: 18500, status: "Awaiting Wire", date: "Yesterday" },
    { id: "TX-9899C", item: "Patek Philippe 2499", amount: 450000, status: "Settled", date: "Oct 12, 2026" },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <ArrowRightLeft className="text-gold" size={32} />
            Ledger & Escrow
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Review secured funds, wire transfers, and clearance states.</p>
        </div>
      </div>

       <div className="bg-noir border border-muted/20 rounded-md overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-muted/20 bg-muted/5 text-parchment/60 text-[10px] uppercase tracking-widest">
                  <th className="p-4 font-bold">Transaction ID</th>
                  <th className="p-4 font-bold">Asset</th>
                  <th className="p-4 font-bold">Total Amount</th>
                  <th className="p-4 font-bold">Date Executed</th>
                  <th className="p-4 font-bold">Status</th>
               </tr>
            </thead>
            <tbody>
               {tx.map((t, i) => (
                  <tr key={i} className="border-b border-muted/10 hover:bg-muted/5 transition-colors">
                     <td className="p-4 font-mono text-parchment/50 text-xs">{t.id}</td>
                     <td className="p-4 text-parchment font-medium">{t.item}</td>
                     <td className="p-4 font-mono text-gold text-sm">${t.amount.toLocaleString()}</td>
                     <td className="p-4 text-parchment/60 text-xs">{t.date}</td>
                     <td className="p-4">
                        <div className="flex items-center gap-2">
                           {t.status === "Escrow Locked" && <Lock size={14} className="text-blue-400" />}
                           {t.status === "Awaiting Wire" && <Clock size={14} className="text-orange-400" />}
                           {t.status === "Settled" && <CheckCircle2 size={14} className="text-green-400" />}
                           <span className={`text-[10px] uppercase tracking-widest font-bold ${t.status === 'Settled' ? 'text-green-400' : t.status === 'Escrow Locked' ? 'text-blue-400' : 'text-orange-400'}`}>
                              {t.status}
                           </span>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
}
