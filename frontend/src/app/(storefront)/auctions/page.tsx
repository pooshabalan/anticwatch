"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Hammer, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuctionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const activeAuctions = [
    { id: 1, brand: "Patek Philippe", model: "Nautilus Travel Time Ref. 5990", currentBid: "$114,000", endsIn: "04h 12m 30s", image: "/patek.png", bids: 24 },
    { id: 2, brand: "Rolex", model: "Milsub Ref. 5517", currentBid: "$182,500", endsIn: "18h 45m 00s", image: "/watches/rolex-sub.png", bids: 41 },
    { id: 3, brand: "F.P. Journe", model: "Chronomètre à Résonance", currentBid: "$295,000", endsIn: "2d 06h 15m", image: "/hero-watch.png", bids: 12 },
  ];

  const [formData, setFormData] = useState({ fullName: "", email: "", interest: "Vintage Chronographs" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/registry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen flex flex-col w-full bg-noir pt-24 px-6 relative max-w-screen-2xl mx-auto">
      <Link href="/" className="absolute top-24 left-6 text-gold/70 hover:text-gold flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition-colors">
        <ArrowLeft size={16} /> Home
      </Link>
      
      <div className="w-full flex justify-center text-center mt-12 pb-16">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-gold mb-6 tracking-wide drop-shadow-xl">
            Private Auctions
          </h1>
          <p className="text-parchment/60 font-sans text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Exclusive bidding events for the world&apos;s most historically significant timepieces. Access is limited to verified collectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-24">
        
        {/* Active Lots Feed */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-muted/20 pb-4">
            <Hammer className="text-gold" />
            <h2 className="text-2xl font-serif text-parchment">Currently on the Block</h2>
          </div>
          
          <div className="flex flex-col gap-6">
            {activeAuctions.map((lot, idx) => (
              <motion.div 
                key={lot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="bg-muted/5 border border-muted/20 p-4 rounded-md shadow-2xl flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:border-gold/30 transition-all"
              >
                <div className="w-full sm:w-1/3 aspect-square relative rounded-sm overflow-hidden border border-gold/10">
                  <img src={lot.image} alt={lot.model} className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-gold text-xs font-bold uppercase flex items-center gap-2 tracking-widest bg-noir/50 backdrop-blur-md px-2 py-1 rounded">
                    <Clock size={12} className="animate-pulse" /> {lot.endsIn}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-1">{lot.brand}</h3>
                    <h4 className="text-xl font-serif text-parchment/90 mb-4">{lot.model}</h4>
                    <span className="text-parchment/40 text-[10px] uppercase tracking-widest bg-muted/10 px-2 py-1 rounded border border-muted/20">Lot #{450 + lot.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-end mt-6">
                    <div>
                      <p className="text-parchment/40 text-[10px] uppercase tracking-widest">Current Bid</p>
                      <p className="font-serif text-2xl text-green-400">{lot.currentBid}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-parchment/40 text-[10px] uppercase tracking-widest">{lot.bids} Bids</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registry Form */}
        <section className="flex flex-col items-center lg:items-end w-full">
          {!showForm && !submitted ? (
            <div className="bg-muted/10 border border-gold/20 p-8 rounded-sm max-w-md w-full relative overflow-hidden group h-fit lg:sticky lg:top-32">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-noir via-gold to-noir opacity-50"></div>
              
              <h2 className="text-parchment font-serif text-2xl mb-4">Upcoming Event</h2>
              <p className="text-gold font-bold tracking-widest uppercase text-sm mb-2">The Geneva Vault</p>
              <p className="text-muted text-sm font-sans mb-8">Opening Nov 15th, 2026</p>
              
              <button 
                onClick={() => setShowForm(true)}
                className="w-full bg-transparent border border-gold text-gold py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-noir transition-colors duration-300"
              >
                Apply for Registry
              </button>
            </div>
          ) : submitted ? (
            <div className="bg-muted/5 border border-gold/30 p-12 rounded-sm max-w-md w-full relative overflow-hidden h-fit lg:sticky lg:top-32">
               <div className="absolute top-0 left-0 w-full h-1 bg-gold opacity-50"></div>
               <h2 className="text-gold font-serif text-2xl mb-4">Application Received</h2>
               <p className="text-parchment/70 text-sm leading-relaxed mb-6">Your registry request for The Geneva Vault has been submitted. Our curation team will review your profile and contact you within 48 hours.</p>
               <button 
                onClick={() => { setShowForm(false); setSubmitted(false); }}
                className="w-full bg-transparent border border-gold/50 text-gold py-3 uppercase tracking-widest text-xs font-bold hover:bg-gold hover:text-noir transition-colors duration-300"
              >
                Return to Auctions
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-muted/10 border border-gold/20 p-8 rounded-sm max-w-md w-full relative text-left flex flex-col gap-5 h-fit lg:sticky lg:top-32">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-noir via-gold to-noir opacity-50"></div>
              <h2 className="text-gold font-serif text-2xl mb-2 text-center">Registry Application</h2>
              <p className="text-parchment/60 text-xs text-center mb-4 uppercase tracking-widest">The Geneva Vault</p>
              
              <div>
                <label className="block text-parchment/70 text-xs uppercase tracking-widest font-bold mb-2">Full Name</label>
                <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-noir border border-muted/30 p-3 text-parchment focus:outline-none focus:border-gold/50 transition-colors" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-parchment/70 text-xs uppercase tracking-widest font-bold mb-2">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-noir border border-muted/30 p-3 text-parchment focus:outline-none focus:border-gold/50 transition-colors" placeholder="user@domain.com" />
              </div>

              <div>
                <label className="block text-parchment/70 text-xs uppercase tracking-widest font-bold mb-2">Primary Interest</label>
                <select value={formData.interest} onChange={(e) => setFormData({...formData, interest: e.target.value})} className="w-full bg-noir border border-muted/30 p-3 text-parchment focus:outline-none focus:border-gold/50 transition-colors appearance-none">
                  <option>Vintage Chronographs</option>
                  <option>Holy Trinity Pre-1990</option>
                  <option>Independent Watchmaking</option>
                </select>
              </div>
              
              <button disabled={isSubmitting} type="submit" className="w-full bg-gold text-noir mt-4 py-3 uppercase tracking-widest text-xs font-bold hover:opacity-90 transition-opacity">
                {isSubmitting ? "Encrypting Application..." : "Submit Application"}
              </button>
              <button disabled={isSubmitting} type="button" onClick={() => setShowForm(false)} className="w-full bg-transparent text-parchment py-2 uppercase tracking-widest text-xs hover:text-gold transition-colors">
                Cancel
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
