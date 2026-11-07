"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";

interface WatchCardProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  delay?: number;
}

export function WatchCard({ id, brand, model, year, price, image, delay = 0 }: WatchCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="group relative bg-muted/10 border border-muted/50 rounded-sm overflow-hidden flex flex-col hover:border-gold/30 transition-colors duration-500"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-noir">
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        
        <div className="absolute top-4 right-4 bg-noir/80 backdrop-blur-sm border border-gold/20 px-3 py-1 text-xs text-parchment font-serif rounded-sm z-10">
          {year}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-noir via-noir to-noir/90">
        <h3 className="text-gold font-serif text-lg tracking-wide mb-1 flex items-center justify-between">
          {brand}
          <ArrowUpRight size={16} className="text-muted group-hover:text-gold transition-colors duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </h3>
        <p className="text-parchment/70 font-sans text-sm mb-6 flex-grow">{model}</p>
        
        <div className="flex items-end justify-between border-t border-muted/30 pt-4 mt-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted mb-1 font-bold">Current Value</p>
            <p className="text-parchment font-medium">{price}</p>
          </div>
          <Link href={`/archive/${id}`}>
            <Button variant="ghost" size="sm" className="h-8 px-3 text-xs border border-transparent hover:border-gold/20">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
