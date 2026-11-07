"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError(data.error || "Failed to join The Circle.");
      }
    } catch (err) {
      setError("Network error. The Vault is currently unreachable.");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-noir flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-xs uppercase tracking-widest font-bold mb-12">
          <ArrowLeft size={14} /> Back to Archive
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/5 border border-muted/20 p-10 rounded-sm shadow-2xl backdrop-blur-md"
        >
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-gold mb-3 tracking-wide">Enter The Circle</h1>
            <p className="text-parchment/50 font-sans text-sm tracking-widest uppercase">Collector Registration</p>
          </div>

          {success ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold/30">
                <ShieldCheck className="text-gold" size={32} />
              </div>
              <h2 className="text-gold font-serif text-2xl mb-2">Welcome, Collector</h2>
              <p className="text-parchment/60 text-sm">Your inclusion in The Eleventh Hour has been verified. Redirecting to the Vault...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-xs text-center rounded">
                  {error}
                </div>
              )}

              <div className="relative group">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-gold transition-colors" />
                <input 
                  required
                  type="text" 
                  placeholder="FULL NAME"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-noir border border-muted/30 p-4 pl-12 text-parchment text-xs font-bold tracking-widest focus:outline-none focus:border-gold/50 transition-all placeholder:text-muted/50"
                />
              </div>

              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-gold transition-colors" />
                <input 
                  required
                  type="email" 
                  placeholder="EMAIL ADDRESS"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-noir border border-muted/30 p-4 pl-12 text-parchment text-xs font-bold tracking-widest focus:outline-none focus:border-gold/50 transition-all placeholder:text-muted/50"
                />
              </div>

              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-gold transition-colors" />
                <input 
                  required
                  type="password" 
                  placeholder="MASTER PASSWORD"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-noir border border-muted/30 p-4 pl-12 text-parchment text-xs font-bold tracking-widest focus:outline-none focus:border-gold/50 transition-all placeholder:text-muted/50"
                />
              </div>

              <button 
                disabled={isSubmitting}
                type="submit" 
                className="w-full bg-gold text-noir py-4 mt-4 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Verifying Identity..." : "Request Access"}
              </button>

              <div className="text-center mt-6">
                <p className="text-muted text-[10px] uppercase font-bold tracking-widest">
                  Already a member? <Link href="/login" className="text-gold hover:underline">Sign In</Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>

        <p className="text-center mt-8 text-muted/30 text-[9px] uppercase tracking-[0.3em] leading-relaxed">
          The Eleventh Hour maintains strict confidentiality of all data.<br />Protected by the Geneva Encryption Protocol.
        </p>
      </div>
    </main>
  );
}
