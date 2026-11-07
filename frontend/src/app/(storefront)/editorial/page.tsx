import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditorialPage() {
  const articles = [
    { id: 1, title: "Why Vintage Daytonas Hold Their Value", category: "Market Analysis", date: "Oct 24, 2026", image: "/watches/rolex_submariner.png" },
    { id: 2, title: "The Story Behind the Nautilus", category: "History", date: "Oct 20, 2026", image: "/watches/patek_calatrava.png" },
    { id: 3, title: "The Rise of Independent Watchmakers", category: "Opinion", date: "Oct 15, 2026", image: "/watches/ap_royal_oak.png" },
    { id: 4, title: "Collecting Cartier: The Crash & Beyond", category: "Collector's Guide", date: "Oct 10, 2026", image: "/watches/cartier_crash.png" },
    { id: 5, title: "Inside The Geneva Vault Auctions", category: "News", date: "Oct 05, 2026", image: "/watches/patek_2499.png" },
    { id: 6, title: "The Enduring Appeal of the Speedmaster", category: "History", date: "Sep 28, 2026", image: "/watches/omega_speedmaster.png" }
  ];

  return (
    <main className="flex min-h-screen flex-col w-full bg-noir pt-24 px-6 relative">
      <Link href="/" className="absolute top-24 left-6 text-gold/70 hover:text-gold flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition-colors">
        <ArrowLeft size={16} /> Home
      </Link>
      
      <div className="max-w-5xl mx-auto w-full py-16">
        <h1 className="font-serif text-5xl md:text-6xl text-gold mb-12 tracking-wide border-b border-muted/20 pb-8">
          Editorial Insights
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link href={`/editorial/${article.id}`} key={article.id} className="group cursor-pointer flex flex-col">
              <div className="w-full aspect-[4/3] bg-muted/20 border border-muted/10 mb-6 relative overflow-hidden group-hover:border-gold/30 transition-colors duration-500">
                <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 text-xs font-bold tracking-widest uppercase text-gold z-10 drop-shadow-md">
                  {article.category}
                </div>
              </div>
              
              <h3 className="text-parchment font-serif text-2xl leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                {article.title}
              </h3>
              
              <p className="text-muted text-sm font-sans uppercase tracking-widest">
                {article.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
