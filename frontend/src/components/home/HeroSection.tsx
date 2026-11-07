"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-watch.png"
          alt="Luxury Watch Macro"
          fill
          priority
          className="object-cover object-center scale-105 animate-slowZoom"
          quality={100}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-gold mb-6 tracking-wide drop-shadow-2xl"
        >
          The Eleventh Hour
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-parchment/90 max-w-2xl mb-12 font-light"
        >
          A luxury real-time marketplace for vintage, rare, and collectible watches.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link href="/archive" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all">
              Explore Archive
            </Button>
          </Link>
          <Link href="/auctions" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full bg-noir/40 backdrop-blur-md border-gold/30 hover:border-gold hover:bg-gold/10 transition-all text-parchment">
              View Auctions
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
