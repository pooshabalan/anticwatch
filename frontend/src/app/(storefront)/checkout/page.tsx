"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", postalCode: "", country: "Switzerland"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-noir pt-40 pb-32 flex flex-col items-center justify-center text-center px-6">
        <CheckCircle2 size={64} className="text-gold mb-8" />
        <h1 className="text-4xl md:text-5xl font-serif text-parchment mb-4">Transaction Secured</h1>
        <p className="text-parchment/60 font-light max-w-md mx-auto mb-10">Your purchase details have been safely encrypted and stored in the TiDB Vault.</p>
        <Link href="/archive">
          <Button variant="outline">Return to Archive</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-noir pt-24 pb-32">
      <div className="max-w-screen-xl mx-auto px-6">
        
        <h1 className="text-4xl md:text-5xl font-serif text-parchment mb-6">Secure Checkout</h1>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-parchment/50 mb-16 font-medium">
          <Lock size={14} className="text-gold" /> Encrypted Vault Transaction
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Form Side */}
          <div className="flex-1 flex flex-col gap-20">
            <section>
              <h2 className="text-xs font-sans tracking-[0.3em] text-gold uppercase mb-8 border-b border-muted/30 pb-4 inline-block pr-12">
                1. Delivery Destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="First Name" placeholder="Jean-Claude" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                <Input label="Last Name" placeholder="Biver" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                <Input label="Email Address" className="md:col-span-2" placeholder="Delivery updates will be secured here" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <Input label="Street Address" className="md:col-span-2" placeholder="Suite, unit, building, floor, etc." value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} />
                <Input label="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                <Input label="Postal Code" value={formData.postalCode} onChange={(e) => setFormData({...formData, postalCode: e.target.value})} />
                <Input label="Country" defaultValue="Switzerland" className="md:col-span-2" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
              </div>
            </section>

            <section>
              <h2 className="text-xs font-sans tracking-[0.3em] text-gold uppercase mb-8 border-b border-muted/30 pb-4 inline-block pr-12">
                2. Transaction Method
              </h2>
              <div className="flex flex-col gap-5">
                <div className="border hover:border-gold/80 border-gold bg-gold/5 p-5 rounded-sm flex items-center gap-4 cursor-pointer transition-colors shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                  <div className="w-5 h-5 rounded-full border border-gold flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                  </div>
                  <div>
                    <span className="text-parchment font-serif text-lg tracking-wide block mb-1">Bank Wire Transfer</span>
                    <span className="text-[10px] text-gold uppercase tracking-widest font-bold">Recommended for limits &gt; $50K</span>
                  </div>
                </div>
                
                <div className="border border-muted/40 p-5 rounded-sm flex items-center gap-4 cursor-pointer hover:border-muted hover:bg-muted/10 transition-colors opacity-80 hover:opacity-100">
                  <div className="w-5 h-5 rounded-full border border-muted shrink-0" />
                  <span className="text-parchment/80 font-medium">Cryptocurrency (BTC/ETH/USDC)</span>
                </div>
                
                <div className="border border-muted/40 p-5 rounded-sm flex items-center gap-4 cursor-pointer hover:border-muted hover:bg-muted/10 transition-colors opacity-80 hover:opacity-100">
                  <div className="w-5 h-5 rounded-full border border-muted shrink-0" />
                  <span className="text-parchment/80 font-medium">Credit Card (Limit $50,000)</span>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-muted/10 border border-muted/30 text-xs md:text-sm text-parchment/60 leading-relaxed rounded-sm font-light">
                For wire transfers, our banking concierge will contact you from Geneva within 2 hours with escrow instructions. Funds must be deposited within 48 hours to secure the allocation.
              </div>
            </section>

            <Button onClick={handleSubmit} disabled={isSubmitting} variant="primary" size="lg" className="w-full md:w-auto h-16 px-12 text-base tracking-widest uppercase font-bold self-start group shadow-xl shadow-gold/5">
              {isSubmitting ? "Initiating Escrow..." : "Confirm Acquisition"}
            </Button>
          </div>

          {/* Cart Sidebar */}
          <div className="w-full lg:w-[450px] shrink-0">
            <div className="sticky top-32 bg-muted/10 border border-muted/20 rounded-sm p-8 shadow-2xl shadow-noir">
              <h3 className="text-xs font-sans tracking-[0.3em] text-parchment/50 uppercase mb-8 border-b border-muted/30 pb-4 block">
                Order Summary
              </h3>
              
              <div className="flex gap-6 mb-8">
                <div className="relative w-28 h-28 bg-noir rounded-sm overflow-hidden shrink-0 border border-muted/30">
                  <Image src="/rolex.png" alt="Watch" fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-gold font-serif text-xl mb-2">Rolex</p>
                  <p className="text-parchment/70 font-light text-sm leading-snug">Daytona Ref. 6263 &quot;Big Red&quot;</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 text-sm mb-10 border-b border-muted/30 pb-10">
                <div className="flex justify-between text-parchment/80 font-light">
                  <span>Subtotal</span>
                  <span className="font-medium">$124,500.00</span>
                </div>
                <div className="flex justify-between text-parchment/80 font-light">
                  <span>Insured Shipping (Global)</span>
                  <span className="text-success font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-parchment/80 font-light">
                  <span>Estimated Taxes</span>
                  <span>Calculated later</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10">
                <span className="text-parchment uppercase tracking-widest text-xs font-medium opacity-80">Total Due</span>
                <span className="text-gold font-serif text-4xl tracking-wide">$124,500.00</span>
              </div>
              
              <div className="flex items-start gap-4 mt-8 bg-noir p-5 border border-gold/20 rounded-sm">
                <ShieldCheck size={20} className="text-gold shrink-0 mt-0.5" />
                <p className="text-[11px] text-parchment/60 leading-relaxed uppercase tracking-widest font-bold">
                  Covered by the Primary Vault Guarantee. Authenticity and condition strictly verified prior to dispatch.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
