"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
    }, 1500);
  };

  return (
    <main className="flex min-h-screen w-full bg-noir">
      {/* Visual Left Side */}
      <div className="hidden lg:flex flex-1 relative bg-muted/20 items-end p-12">
        <Image
          src="/hero-watch.png"
          alt="Vintage Watch Movement"
          fill
          priority
          className="object-cover object-center opacity-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-noir/40 to-transparent" />
        <div className="relative z-10 max-w-lg mb-8 ml-8">
          <Link href="/" className="font-serif text-3xl text-gold tracking-widest mb-12 block">TEH.</Link>
          <h2 className="text-4xl font-serif text-parchment mb-6 leading-snug drop-shadow-lg">
            Enter the inner circle of horological preservation.
          </h2>
          <p className="text-parchment/80 font-light text-lg tracking-wide leading-relaxed">
            Gain access to private auctions, verified secondary market data, and a secure portfolio manager for your collection.
          </p>
        </div>
      </div>

      {/* Form Right Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative bg-noir/95">
        <Link href="/" className="lg:hidden absolute top-8 left-8 font-serif text-2xl text-gold tracking-widest block">TEH.</Link>
        <div className="w-full max-w-md flex flex-col gap-8">
          
          {isAuthenticated ? (
            <div className="text-center lg:text-left flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-4xl font-serif text-gold mb-2">Welcome Back, Collector.</h1>
              <p className="text-parchment/80 font-light tracking-wide border-b border-muted/20 pb-6 mb-2">
                Your portfolio valuation has updated since your last login.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-muted/10 border border-muted/30 p-4 shrink">
                   <p className="text-parchment/40 text-[10px] uppercase tracking-widest mb-1">Vault Value</p>
                   <p className="text-gold font-serif text-3xl">$492,000</p>
                 </div>
                 <div className="bg-muted/10 border border-muted/30 p-4 shrink">
                   <p className="text-parchment/40 text-[10px] uppercase tracking-widest mb-1">Timepieces</p>
                   <p className="text-parchment font-serif text-3xl">4</p>
                 </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                 <Link href="/archive">
                   <Button variant="primary" size="lg" className="w-full h-14 uppercase tracking-widest text-sm font-bold shadow-lg shadow-gold/10">Enter Private Archive</Button>
                 </Link>
                 <Button onClick={() => setIsAuthenticated(false)} variant="outline" size="sm" className="w-full text-xs hover:bg-muted/20 hover:text-red-400 border-none">Sign Out</Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-3xl font-serif text-parchment mb-3">Access Portal</h1>
                <p className="text-sm text-parchment/60 font-light tracking-wide">Sign in or create a verified account to proceed.</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-6">
                <Input label="Email Address" type="email" placeholder="collector@example.com" required />
                <Input label="Secure Password" type="password" placeholder="••••••••" required />
                
                <div className="flex items-center justify-between text-xs font-sans mt-2">
                  <label className="flex items-center gap-3 cursor-pointer text-parchment/60 hover:text-parchment transition-colors font-medium">
                    <input type="checkbox" className="accent-gold bg-noir border-muted w-4 h-4 cursor-pointer" />
                    Remember my device
                  </label>
                  <Link href="#" className="text-gold tracking-widest uppercase hover:text-gold/80 transition-colors">
                    Recover Access
                  </Link>
                </div>

                <Button disabled={loading} variant="primary" size="lg" className={`w-full h-14 mt-4 uppercase tracking-widest text-sm font-bold shadow-lg shadow-gold/10 ${loading ? 'opacity-80' : ''}`}>
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Authenticate"}
                </Button>
              </form>

              <div className="relative my-8 flex items-center py-2">
                <div className="flex-grow border-t border-muted/40"></div>
                <span className="shrink-0 px-4 text-[10px] tracking-[0.2em] uppercase text-muted font-bold">Or Authorized Key</span>
                <div className="flex-grow border-t border-muted/40"></div>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" size="md" className="w-full h-12 font-sans font-medium text-parchment/80 hover:bg-muted/30 hover:border-muted border-muted/50 transition-colors">
                  Continue with Google Account
                </Button>
                <Button variant="outline" size="md" className="w-full h-12 font-sans font-medium text-parchment/80 hover:bg-muted/30 hover:border-muted border-muted/50 transition-colors">
                  Continue with Apple ID
                </Button>
              </div>

              <div className="mt-12 flex items-center justify-center gap-3 text-xs text-parchment/40 font-medium tracking-wide">
                <ShieldCheck size={16} className="text-success" />
                End-to-end encrypted protocol.
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
