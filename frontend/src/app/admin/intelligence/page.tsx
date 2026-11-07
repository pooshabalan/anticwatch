"use client";
import { useState, useEffect } from "react";
import { Activity, TrendingUp, TrendingDown, RefreshCcw, Save, AlertTriangle } from "lucide-react";

export default function MarketIntelligence() {
  const [demandFactor, setDemandFactor] = useState(1.5);
  const [volatility, setVolatility] = useState(0.3);
  const [trend, setTrend] = useState("bull");
  const [isSaving, setIsSaving] = useState(false);

  // Simulation Data
  const basePrice = 50000;
  const rarityScore = 92;
  const [simulatedPrice, setSimulatedPrice] = useState(basePrice);
  const [history, setHistory] = useState<number[]>(Array(20).fill(basePrice));

  // The Pulse Engine Logic running in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedPrice(prev => {
        // Core Formula: Price = Base + (Rarity * Demand Factor) + Trend + Volatility Noise
        
        // 1. Demand influence
        const demandInfluence = (rarityScore * 100) * demandFactor;
        
        // 2. Market Trend Direction
        const direction = trend === "bull" ? 1 : -1;
        const trendInfluence = direction * 2000; 
        
        // 3. Volatility Noise (Random fluctuation)
        const noise = (Math.random() - 0.5) * (volatility * 10000);
        
        // Calculate new target price based on global state
        const targetPrice = basePrice + demandInfluence + trendInfluence;
        
        // Move current price towards target price + noise
        const newPrice = prev + ((targetPrice - prev) * 0.1) + noise;
        
        setHistory(h => {
            const newH = [...h, newPrice];
            if (newH.length > 25) newH.shift();
            return newH;
        });
        
        return newPrice;
      });
    }, 1500); // Pulse every 1.5s
    
    return () => clearInterval(interval);
  }, [demandFactor, volatility, trend, basePrice, rarityScore]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
    // In production, this would save the global config to the API
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-muted/20">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <Activity className="text-gold" size={32} />
            Market Intelligence Engine
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Configure live auction dynamics, algorithmic pricing, and market demand indexing.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-gold text-noir px-6 py-3 rounded uppercase tracking-widest text-xs font-bold hover:bg-gold/80 flex items-center gap-2 transition-all"
        >
          {isSaving ? <RefreshCcw className="animate-spin" size={16}/> : <Save size={16}/>}
          {isSaving ? "Synchronizing..." : "Apply Global Rules"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-noir border border-muted/20 rounded-md p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
            <h2 className="text-lg font-serif text-parchment mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-gold" />
              Algorithm Parameters
            </h2>

            {/* Demand Factor Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-parchment/80 text-xs font-bold uppercase tracking-widest">Global Demand Factor</label>
                <span className="text-gold text-sm font-mono">{demandFactor.toFixed(1)}x</span>
              </div>
              <input 
                type="range" min="0.5" max="3.0" step="0.1" 
                value={demandFactor} 
                onChange={(e) => setDemandFactor(parseFloat(e.target.value))}
                className="w-full accent-gold bg-muted/20 rounded-lg appearance-none h-1"
              />
              <p className="text-parchment/40 text-[10px] tracking-wide mt-2">Multiplier applied to watch rarity score to calculate baseline value.</p>
            </div>

            {/* Volatility Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-parchment/80 text-xs font-bold uppercase tracking-widest">Market Volatility</label>
                <span className="text-red-400 text-sm font-mono">{volatility.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.1" max="1.0" step="0.05" 
                value={volatility} 
                onChange={(e) => setVolatility(parseFloat(e.target.value))}
                className="w-full accent-red-400 bg-muted/20 rounded-lg appearance-none h-1"
              />
              <p className="text-parchment/40 text-[10px] tracking-wide mt-2">Determines the chaos/speed of price fluctuations during live bidding.</p>
            </div>

            {/* Trend Selector */}
            <div>
              <label className="text-parchment/80 text-xs font-bold uppercase tracking-widest mb-3 block">Overall Market Trend</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setTrend("bull")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border ${trend === 'bull' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-transparent border-muted/20 text-parchment/50 hover:border-muted/40'} transition-all text-xs font-bold uppercase tracking-widest`}
                >
                  <TrendingUp size={14} /> Bullish
                </button>
                <button 
                  onClick={() => setTrend("bear")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border ${trend === 'bear' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-transparent border-muted/20 text-parchment/50 hover:border-muted/40'} transition-all text-xs font-bold uppercase tracking-widest`}
                >
                  <TrendingDown size={14} /> Bearish
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500/5 border border-red-500/20 rounded-md p-6">
             <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                <AlertTriangle size={14} /> Anti-Fraud Status
             </h3>
             <p className="text-parchment/60 text-sm mb-4">Shill-bidding detection and IP anomaly scanners are currently active. Threshold set to aggressive.</p>
             <button className="text-red-400 border border-red-400/30 px-4 py-2 rounded text-xs uppercase tracking-widest hover:bg-red-500/10 w-full transition-colors">View Audit Logs</button>
          </div>
        </div>

        {/* Right Column: Engine Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Logic Visualizer */}
          <div className="bg-noir border border-muted/20 rounded-md p-6 shadow-xl">
             <h2 className="text-lg font-serif text-parchment mb-6">Algorithm Syntax</h2>
             <div className="bg-[#0a0a0a] p-4 rounded-md font-mono text-sm border border-muted/10 overflow-x-auto shadow-inner">
               <div className="text-parchment/40 mb-2">{"// Dynamic Price Resolution Formula"}</div>
               <div><span className="text-blue-400">const</span> <span className="text-gold">current_price</span> = <span className="text-blue-400">calculate</span>(</div>
               <div className="pl-4 mt-2">
                  <span className="text-parchment/80">base_price</span>: <span className="text-green-400">${basePrice.toLocaleString()}</span>, <span className="text-parchment/40">{"// Intrinsic Valuation"}</span>
               </div>
               <div className="pl-4 mt-2">
                  <span className="text-parchment/80">rarity_premium</span>: (Rarity: <span className="text-green-400">{rarityScore}</span> * Demand: <span className="text-green-400">{demandFactor.toFixed(1)}</span>),
               </div>
               <div className="pl-4 mt-2">
                  <span className="text-parchment/80">trend_bias</span>: <span className="text-green-400">&quot;{trend.toUpperCase()}&quot;</span>,
               </div>
               <div className="pl-4 mt-2">
                  <span className="text-parchment/80">volatility_index</span>: <span className="text-green-400">{volatility.toFixed(2)}</span>
               </div>
               <div>);</div>
             </div>
          </div>

          {/* Live Simulator Graph */}
          <div className="bg-noir border border-gold/20 rounded-md p-6 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative">
             <div className="flex justify-between items-start mb-8">
               <div>
                 <h2 className="text-lg font-serif text-parchment flex items-center gap-2">
                   Live Simulation Testing
                   <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                 </h2>
                 <p className="text-parchment/40 text-xs">Simulated target: Patek Philippe Nautilus Ref 3700 (Rarity: {rarityScore})</p>
               </div>
               <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-parchment/50 mb-1">Simulated Market Value</p>
                  <p className="text-3xl font-serif text-gold font-bold tabular-nums">${Math.round(simulatedPrice).toLocaleString()}</p>
               </div>
             </div>

             {/* CSS-based Live Graph */}
             <div className="h-48 w-full border-b border-l border-muted/20 relative flex items-end pt-4 pb-0 px-2 space-x-1">
                {history.map((price, idx) => {
                  // Normalize height for graph
                  const min = basePrice * 0.8;
                  const max = basePrice * 2.5 * 1.5; // Roughly the bounds based on demand factor 3.0
                  const heightPct = Math.min(100, Math.max(5, ((price - min) / (max - min)) * 100));
                  
                  return (
                    <div 
                      key={idx} 
                      className={`flex-1 transition-all duration-500 ease-out rounded-t-sm ${idx === history.length - 1 ? 'bg-gold' : 'bg-gold/30 hover:bg-gold/50'}`}
                      style={{ height: `${heightPct}%` }}
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 hover:opacity-100 absolute -top-8 bg-noir border border-gold/50 text-gold text-[10px] p-1 rounded whitespace-nowrap z-10 pointer-events-none transform -translate-x-1/2">
                        ${Math.round(price).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
             </div>
             <div className="flex justify-between text-[10px] text-parchment/30 mt-2 font-mono">
               <span>-30s</span>
               <span>Now</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
