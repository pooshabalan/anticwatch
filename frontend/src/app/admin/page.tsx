"use client";
import { useEffect, useState } from 'react';
import { Activity, Users, Gavel, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalWatches: 0, totalValue: 0, avgPrice: 0, topBrand: '' });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Live Graph Data Simulation
  const [livePulse, setLivePulse] = useState<number[]>(Array(20).fill(150000));
  
  // Activity Feed Data Simulation
  const [activities, setActivities] = useState([
    { text: "User j.smith placed bid $24,500 on Submariner", type: "bid", time: "just now" },
    { text: "Market Intelligence trend changed to BULL", type: "system", time: "2m ago" },
    { text: "New registration: collector_99 (Dubai)", type: "user", time: "5m ago" },
    { text: "Patek Nautilus Ref 3700 price adjusted by Pulse", type: "system", time: "12m ago" },
    { text: "Auction #4490 (Daytona) concluded successfully.", type: "auction", time: "1h ago" }
  ]);

  useEffect(() => {
    fetch('/api/watches')
      .then(res => res.json())
      .then(data => {
        const total = data.length;
        const totalVal = data.reduce((acc: number, curr: any) => acc + Number(curr.price.replace(/[^0-9.-]+/g,"")), 0);
        
        const brands = data.map((w: any) => w.brand);
        const topBrand = brands.sort((a: string,b: string) => brands.filter((v: string) => v===a).length - brands.filter((v: string) => v===b).length).pop();

        setStats({ 
          totalWatches: total, 
          totalValue: totalVal, 
          avgPrice: total > 0 ? (totalVal / total) : 0,
          topBrand: topBrand || 'None'
        });
        
        setRecent(data.slice(-4).reverse());
        setLoading(false);
      })
      .catch(err => setLoading(false));

    // Live Pulse Simulation
    const interval = setInterval(() => {
       setLivePulse(prev => {
          const last = prev[prev.length - 1];
          const change = (Math.random() - 0.4) * 8000; // Slight upward bias
          const newH = [...prev, last + change];
          if(newH.length > 20) newH.shift();
          return newH;
       });
       
       // Sometime add an activity
       if (Math.random() > 0.8) {
         const newActs = ["User e.chen placed bid", "New user registered (London)", "Pulse Engine anomaly detected"];
         const randomAct = newActs[Math.floor(Math.random() * newActs.length)];
         setActivities(a => [{ text: randomAct, type: "bid", time: "just now" }, ...a].slice(0, 5));
       }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold">Executive Command Center</h1>
          <p className="text-parchment/50 mt-1 uppercase tracking-widest text-xs">Real-time Global Operations</p>
        </div>
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.2)]">
           <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
           </span>
           <span className="text-red-400 text-xs font-bold tracking-widest uppercase">3 Live Auctions Bidding Now</span>
        </div>
      </div>
      
      {loading ? (
        <div className="animate-pulse flex gap-6 mt-8">
          <div className="h-32 bg-muted/10 border border-muted/20 w-1/3 rounded-md"></div>
          <div className="h-32 bg-muted/10 border border-muted/20 w-1/3 rounded-md"></div>
        </div>
      ) : (
        <>
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-noir border border-muted/20 p-5 rounded-md shadow-xl flex flex-col justify-between hover:border-gold/30 transition-colors">
              <h3 className="text-parchment/60 uppercase tracking-widest text-[10px] font-bold mb-2">Total Inventory</h3>
              <p className="font-serif text-3xl text-parchment">{stats.totalWatches}</p>
            </div>

            <div className="bg-noir border border-muted/20 p-5 rounded-md shadow-xl flex flex-col justify-between hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start">
                 <h3 className="text-parchment/60 uppercase tracking-widest text-[10px] font-bold mb-2">Total Users</h3>
                 <Users size={14} className="text-blue-400 opacity-60" />
              </div>
              <p className="font-serif text-3xl text-parchment">1,492</p>
            </div>
            
            <div className="bg-noir border border-gold/40 p-5 rounded-md shadow-[0_4px_20px_rgba(212,175,55,0.1)] relative overflow-hidden flex flex-col justify-between lg:col-span-2 group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 animate-pulse to-transparent"></div>
              <h3 className="text-gold uppercase tracking-widest text-[10px] font-bold mb-2 relative z-10 flex items-center gap-2">
                <TrendingUp size={12}/> Global Revenue (YTD)
              </h3>
              <div className="flex items-end gap-4 relative z-10">
                <p className="font-serif text-4xl text-gold">${(stats.totalValue * 1.5).toLocaleString()}</p>
                <div className="flex flex-col pb-1 leading-tight">
                  <span className="text-green-500 text-xs font-bold tracking-wider flex items-center gap-1"><ArrowUpRight size={12}/> +22.4%</span>
                </div>
              </div>
            </div>

            <div className="bg-noir border border-muted/20 p-5 rounded-md shadow-xl flex flex-col justify-between hover:border-gold/30 transition-colors">
              <div className="flex justify-between items-start">
                 <h3 className="text-parchment/60 uppercase tracking-widest text-[10px] font-bold mb-2">Active Auctions</h3>
                 <Gavel size={14} className="text-red-400 opacity-60" />
              </div>
              <p className="font-serif text-3xl text-parchment">3</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column: Pulse Graph and Recent Watches */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Live Market Pulse Graph Mini-View */}
              <div className="bg-noir border border-muted/20 p-6 rounded-md shadow-xl hover:border-gold/30 transition-colors cursor-pointer" onClick={() => window.location.href = '/admin/intelligence'}>
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-xl text-parchment flex items-center gap-2">
                       <Activity className="text-gold" size={18}/> Live Market Pulse Index
                    </h2>
                    <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded uppercase tracking-widest">Bullish Trend</span>
                 </div>
                 <div className="h-32 w-full border-b border-l border-muted/10 relative flex items-end pt-2 pb-0 px-2 space-x-1">
                    {livePulse.map((val, idx) => {
                      const min = 120000;
                      const max = 180000;
                      const h = Math.min(100, Math.max(5, ((val - min)/(max - min))*100));
                      return (
                        <div key={idx} className={`flex-1 transition-all duration-700 ease-in-out ${idx === livePulse.length-1 ? 'bg-gold' : 'bg-gold/40'}`} style={{ height: `${h}%` }}></div>
                      );
                    })}
                 </div>
              </div>

              {/* Recent Inventory */}
              <div>
                <div className="flex items-center justify-between border-b border-muted/20 pb-4 mb-4">
                  <h2 className="font-serif text-xl text-parchment">Recent Vault Approvals</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recent.map((watch, i) => (
                    <div key={i} className="bg-muted/5 border border-muted/10 p-4 rounded-md flex gap-4 hover:border-gold/30 hover:bg-muted/10 transition-colors">
                      <img src={watch.image} alt={watch.model} className="w-14 h-14 object-cover rounded border border-gold/10" />
                      <div className="flex flex-col justify-center">
                        <p className="text-gold text-[10px] font-bold uppercase tracking-widest">{watch.brand}</p>
                        <p className="text-parchment/90 text-sm font-medium line-clamp-1">{watch.model}</p>
                        <p className="text-parchment/50 text-xs">{watch.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Live Activity Feed */}
            <div>
              <div className="bg-noir border border-muted/20 rounded-md overflow-hidden relative h-full min-h-[400px]">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-gold to-red-500"></div>
                 <div className="p-5 border-b border-muted/10 bg-muted/5">
                    <h2 className="font-serif text-xl text-parchment">System Event Stream</h2>
                 </div>
                 
                 <div className="p-5 flex flex-col gap-4">
                    {activities.map((act, i) => (
                       <div key={i} className="flex gap-3 items-start animate-in slide-in-from-right-4 fade-in duration-300">
                          <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${act.type === 'bid' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]' : act.type === 'system' ? 'bg-blue-400' : 'bg-gold'}`}></div>
                          <div className="flex flex-col">
                             <p className="text-parchment/80 text-sm">{act.text}</p>
                             <span className="text-parchment/40 text-[10px] tracking-widest uppercase">{act.time}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            </div>
            
          </div>
        </>
      )}
    </div>
  );
}
