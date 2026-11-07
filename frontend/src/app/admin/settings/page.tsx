"use client";
import { Settings as SettingsIcon, Shield, Globe, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-4xl text-gold flex items-center gap-4">
            <SettingsIcon className="text-gold" size={32} />
            System Governance
          </h1>
          <p className="text-parchment/60 mt-2 tracking-wide text-sm">Core parameters, UI rules, and overarching protocol configuration.</p>
        </div>
      </div>

      <div className="space-y-6">
         {/* Theme config */}
         <div className="bg-noir border border-muted/20 p-6 rounded-md shadow-xl flex gap-6 items-start hover:border-gold/30 transition-colors">
            <div className="p-3 bg-muted/10 rounded"><Palette size={20} className="text-gold" /></div>
            <div>
               <h3 className="font-serif text-xl text-parchment mb-1">Aesthetic Tokens</h3>
               <p className="text-parchment/50 text-sm mb-4">Current theme is strictly locked to Noir (#0A0A0A), Parchment (#F4EBD0), and Gold (#D4AF37) across all domains.</p>
               <button className="text-xs uppercase tracking-widest text-parchment border border-muted/30 px-4 py-2 rounded hover:bg-muted/10">Modify CSS Logic</button>
            </div>
         </div>

         {/* Security */}
         <div className="bg-noir border border-muted/20 p-6 rounded-md shadow-xl flex gap-6 items-start hover:border-gold/30 transition-colors">
            <div className="p-3 bg-red-500/10 rounded"><Shield size={20} className="text-red-400" /></div>
            <div className="w-full">
               <div className="flex justify-between items-start">
                  <h3 className="font-serif text-xl text-parchment mb-1">Vault Security Protocols</h3>
                  <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                     <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
               </div>
               <p className="text-parchment/50 text-sm mb-4">Enforce strict KYC (Know Your Customer) validation before allowing users to place bids above $50,000.</p>
            </div>
         </div>

         {/* Global */}
         <div className="bg-noir border border-muted/20 p-6 rounded-md shadow-xl flex gap-6 items-start hover:border-gold/30 transition-colors">
            <div className="p-3 bg-muted/10 rounded"><Globe size={20} className="text-gold" /></div>
            <div>
               <h3 className="font-serif text-xl text-parchment mb-1">Base Currency</h3>
               <p className="text-parchment/50 text-sm mb-4">All prices mathematically resolved and displayed in USD ($).</p>
               <select className="bg-muted/10 border border-muted/20 text-parchment rounded px-4 py-2 text-sm focus:outline-none focus:border-gold">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>CHF (Fr)</option>
               </select>
            </div>
         </div>
      </div>
    </div>
  );
}
