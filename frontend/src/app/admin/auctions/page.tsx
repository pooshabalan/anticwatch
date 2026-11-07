"use client";
import { useState } from "react";
import { Gavel, AlertOctagon, PauseCircle, StopCircle, PlayCircle, Plus, X } from "lucide-react";

export default function AuctionsManagement() {
  const [auctions, setAuctions] = useState([
    { id: 4492, watch: "Rolex Daytona 6263", highestBid: 125000, bidder: "UAE_Collector", timeRemaining: "02:14:30", status: "Active", fraudRisk: "Low" },
    { id: 4493, watch: "Patek Nautilus", highestBid: 190000, bidder: "SwissVault", timeRemaining: "14:00:22", status: "Active", fraudRisk: "Medium" },
    { id: 4494, watch: "Cartier Crash '91", highestBid: 65000, bidder: "Anonymous", timeRemaining: "00:05:12", status: "Active", fraudRisk: "High" }
  ]);

  const [showDeployModal, setShowDeployModal] = useState(false);
  const [newAuction, setNewAuction] = useState({ watch: "", startingBid: "" });

  const togglePause = (id: number) => {
    setAuctions(prev => prev.map(auc => {
      if (auc.id === id) {
        if (auc.status === "Active") return { ...auc, status: "Paused" };
        if (auc.status === "Paused") return { ...auc, status: "Active" };
      }
      return auc;
    }));
  };

  const forceStop = (id: number) => {
    setAuctions(prev => prev.map(auc => {
      if (auc.id === id) {
        return { ...auc, status: "Terminated", timeRemaining: "00:00:00" };
      }
      return auc;
    }));
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuction.watch || !newAuction.startingBid) return;
    
    const newEntry = {
      id: Math.floor(Math.random() * 1000) + 5000,
      watch: newAuction.watch,
      highestBid: parseInt(newAuction.startingBid),
      bidder: "---",
      timeRemaining: "24:00:00",
      status: "Active",
      fraudRisk: "Low"
    };
    
    setAuctions([newEntry, ...auctions]);
    setShowDeployModal(false);
    setNewAuction({ watch: "", startingBid: "" });
  };

  const activeCount = auctions.filter(a => a.status === 'Active').length;
  const fraudAlerts = auctions.filter(a => a.fraudRisk === 'High').length;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <Gavel className="text-gold" size={32} />
            Live Auction Command
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Monitor ongoing bids, detect anomalous behavior, and control vault operations.</p>
        </div>
        <button 
          onClick={() => setShowDeployModal(true)}
          className="bg-gold text-noir px-6 py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-gold/80 flex items-center gap-2 transition-all"
        >
          <Plus size={16} /> Deploy New Auction
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
         <div className={`bg-noir border ${fraudAlerts > 0 ? 'border-red-500/30' : 'border-muted/20'} p-5 rounded-md shadow-xl flex flex-col justify-between relative overflow-hidden transition-colors`}>
             <div className="absolute top-0 right-0 p-3">
               <AlertOctagon className={fraudAlerts > 0 ? "text-red-500/20" : "text-muted/10"} size={48}/>
             </div>
             <h3 className={`${fraudAlerts > 0 ? 'text-red-400' : 'text-parchment/60'} uppercase tracking-widest text-[10px] font-bold mb-2`}>Anti-Fraud Engine</h3>
             <div>
                <p className={`font-serif text-2xl ${fraudAlerts > 0 ? 'text-parchment' : 'text-parchment/60'}`}>{fraudAlerts} Alert{fraudAlerts !== 1 ? 's' : ''}</p>
                <p className="text-parchment/40 text-[10px] mt-1">{fraudAlerts > 0 ? "Shill bidding suspected" : "All systems nominal"}</p>
             </div>
         </div>
         <div className="bg-noir border border-muted/20 p-5 rounded-md shadow-xl">
             <h3 className="text-parchment/60 uppercase tracking-widest text-[10px] font-bold mb-2">Active Auctions</h3>
             <p className="font-serif text-2xl text-parchment">{activeCount}</p>
         </div>
         <div className="bg-noir border border-muted/20 p-5 rounded-md shadow-xl">
             <h3 className="text-parchment/60 uppercase tracking-widest text-[10px] font-bold mb-2">Total Bids Today</h3>
             <p className="font-serif text-2xl text-parchment">412</p>
         </div>
         <div className="bg-noir border border-muted/20 p-5 rounded-md shadow-xl">
             <h3 className="text-parchment/60 uppercase tracking-widest text-[10px] font-bold mb-2">Clearance Rate</h3>
             <p className="font-serif text-2xl text-green-400">94.2%</p>
         </div>
      </div>

      <div className="bg-noir border border-muted/20 rounded-md overflow-hidden min-h-[300px]">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b border-muted/20 bg-muted/5 text-parchment/60 text-[10px] uppercase tracking-widest">
                  <th className="p-4 font-bold">Lot #</th>
                  <th className="p-4 font-bold">Timepiece</th>
                  <th className="p-4 font-bold">Current Bid</th>
                  <th className="p-4 font-bold">Lead Bidder</th>
                  <th className="p-4 font-bold">Time Left</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Integrity</th>
                  <th className="p-4 font-bold text-right">Actions</th>
               </tr>
            </thead>
            <tbody>
               {auctions.map((auc) => (
                  <tr key={auc.id} className={`border-b border-muted/10 transition-colors ${auc.status === 'Terminated' ? 'bg-red-500/5 opacity-50' : auc.status === 'Paused' ? 'bg-orange-500/5' : 'hover:bg-muted/5'}`}>
                     <td className="p-4 font-mono text-gold text-sm">#{auc.id}</td>
                     <td className="p-4 text-parchment font-medium">{auc.watch}</td>
                     <td className="p-4 text-parchment/90 font-mono">${auc.highestBid.toLocaleString()}</td>
                     <td className="p-4 text-parchment/70 text-sm">@{auc.bidder}</td>
                     <td className="p-4 text-parchment text-sm">
                        <span className={auc.timeRemaining.startsWith("00:") && auc.status === 'Active' ? "text-red-400 font-bold animate-pulse" : ""}>{auc.timeRemaining}</span>
                     </td>
                     <td className="p-4">
                        <span className={`text-[10px] uppercase tracking-widest font-bold ${auc.status === 'Active' ? 'text-green-400' : auc.status === 'Paused' ? 'text-orange-400' : 'text-red-500'}`}>
                           {auc.status}
                        </span>
                     </td>
                     <td className="p-4">
                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold ${auc.fraudRisk === 'High' ? 'bg-red-500/10 text-red-500' : auc.fraudRisk === 'Medium' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
                           {auc.fraudRisk}
                        </span>
                     </td>
                     <td className="p-4 flex gap-2 justify-end">
                        <button 
                           onClick={() => togglePause(auc.id)}
                           disabled={auc.status === "Terminated"}
                           className="p-2 text-parchment/50 hover:text-gold hover:bg-gold/10 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-parchment/50" 
                           title={auc.status === "Paused" ? "Resume Auction" : "Pause Auction"}
                        >
                           {auc.status === "Paused" ? <PlayCircle size={16}/> : <PauseCircle size={16}/>}
                        </button>
                        <button 
                           onClick={() => forceStop(auc.id)}
                           disabled={auc.status === "Terminated"}
                           className="p-2 text-parchment/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-parchment/50" 
                           title="Force Terminate"
                        >
                           <StopCircle size={16}/>
                        </button>
                     </td>
                  </tr>
               ))}
               {auctions.length === 0 && (
                  <tr>
                     <td colSpan={8} className="p-8 text-center text-parchment/50 uppercase tracking-widest text-xs">No active auctions</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>

      {showDeployModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-noir border border-gold/30 rounded-md w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowDeployModal(false)} className="absolute top-4 right-4 text-parchment/40 hover:text-gold transition-colors">
              <X size={20} />
            </button>
            <div className="p-6 border-b border-muted/10">
               <h2 className="font-serif text-2xl text-gold">Deploy Auction</h2>
               <p className="text-parchment/50 text-xs mt-1 uppercase tracking-widest">Initialize a new live lot</p>
            </div>
            <form onSubmit={handleDeploy} className="p-6 space-y-4">
               <div>
                  <label className="text-parchment/70 text-[10px] uppercase tracking-widest font-bold mb-2 block">Timepiece Name / Reference</label>
                  <input 
                     required
                     type="text" 
                     value={newAuction.watch}
                     onChange={(e) => setNewAuction({...newAuction, watch: e.target.value})}
                     className="w-full bg-muted/10 border border-muted/30 rounded p-3 text-parchment text-sm focus:border-gold focus:outline-none transition-colors"
                     placeholder="e.g. A. Lange & Söhne Datograph"
                  />
               </div>
               <div>
                  <label className="text-parchment/70 text-[10px] uppercase tracking-widest font-bold mb-2 block">Starting Security Bid (USD)</label>
                  <input 
                     required
                     type="number" 
                     value={newAuction.startingBid}
                     onChange={(e) => setNewAuction({...newAuction, startingBid: e.target.value})}
                     className="w-full bg-muted/10 border border-muted/30 rounded p-3 text-gold font-mono text-sm focus:border-gold focus:outline-none transition-colors"
                     placeholder="e.g. 50000"
                  />
               </div>
               <button 
                  type="submit"
                  className="w-full bg-gold text-noir py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-gold/80 transition-colors mt-4"
               >
                  Authorize & Launch
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
