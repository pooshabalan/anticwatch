import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

const editorialDatabase: Record<string, any> = {
  "1": {
    title: "Why Vintage Daytonas Hold Their Value",
    category: "Market Analysis",
    time: "8 Min Read",
    image: "/watches/rolex_submariner.png",
    intro: "In the world of horology, few names command as much respect—and capital—as the manually wound Rolex Daytona.",
    section1Title: "The Newman Phenomenon",
    section1Text: "The explosive growth of vintage Daytonas can trace its roots back to the Italian collecting community in the 1980s, culminating in the historic 2017 auction of Paul Newman's own actual 'Paul Newman' Daytona for an eye-watering $17.8 million.",
    section2Title: "Scarcity by Design",
    section2Text: "Unlike modern production numbers, original manual-wind Daytonas (references 6239, 6241, 6263, and 6265) were notoriously poor sellers when they were originally released. This initial commercial failure created the ultimate environment for future collectability: extreme rarity."
  },
  "2": {
    title: "The Story Behind the Nautilus",
    category: "History",
    time: "6 Min Read",
    image: "/watches/patek_calatrava.png",
    intro: "Sketched on a restaurant napkin in just five minutes, Gérald Genta's masterpiece changed the trajectory of Patek Philippe forever.",
    section1Title: "A Steel Watch at a Gold Price",
    section1Text: "When the Nautilus Ref. 3700 was introduced in 1976 during the height of the Quartz Crisis, it was a provocative gamble. Patek Philippe marketed it under the slogan: 'One of the world's costliest watches is made of steel.'",
    section2Title: "The Porthole Design",
    section2Text: "Inspired by the porthole of a transatlantic liner, the case incorporates protruding 'ears' serving as hinges. The iconic horizontal embossed dial pattern was designed to subtly shift from black to blue depending on the ambient light."
  },
  "3": {
    title: "The Rise of Independent Watchmakers",
    category: "Opinion",
    time: "10 Min Read",
    image: "/watches/ap_royal_oak.png",
    intro: "As major conglomerates consolidate the luxury market, a rebellion of master artisans is returning watchmaking to its intimate, handcrafted roots.",
    section1Title: "Beyond The Crown and The Calatrava Cross",
    section1Text: "Collectors are increasingly seeking true exclusivity past the mainstream giants. Artisans like F.P. Journe, Philippe Dufour, and Rexhep Rexhepi are experiencing unprecedented demand, with waitlists stretching longer than a decade.",
    section2Title: "The Value of the Human Hand",
    section2Text: "What makes independents so compelling is the visceral connection to the creator. When observing the interior angles of a Dufour Simplicity, you are looking directly at the painstaking, un-rushed effort of a single human being's mastery."
  },
  "4": {
    title: "Collecting Cartier: The Crash & Beyond",
    category: "Collector's Guide",
    time: "5 Min Read",
    image: "/watches/cartier_crash.png",
    intro: "For decades referred to simply as 'the jeweler of kings,' Cartier is currently undergoing an explosive renaissance among serious watch collectors.",
    section1Title: "The London Enigma",
    section1Text: "No Cartier model exemplifies this shift more than the Crash. Born in swinging 1960s London, the distorted, surrealist case was allegedly inspired by a Cartier Baignoire that melted in a car crash. Today, London-signed Crashes command premiums well past the million-dollar mark.",
    section2Title: "The Shape of Things to Come",
    section2Text: "Cartier's true brilliance lies in 'La Forme'—shaped watches. From the Asymétrique to the Cintrée, collectors are aggressively hunting these elegant, asymmetrical silhouette designs that break away from the traditional circular case."
  },
  "5": {
    title: "Inside The Geneva Vault Auctions",
    category: "News",
    time: "4 Min Read",
    image: "/watches/patek_2499.png",
    intro: "An exclusive behind-the-scenes look at how The Geneva Vault curates, verifies, and auctions the planet's most unobtainable timepieces.",
    section1Title: "The Rigorous Vetting Process",
    section1Text: "Every timepiece accepted into the Vault undergoes a grueling 72-point inspection process by master watchmakers. Provenance is cryptographically verified to ensure the chain of ownership is pristine and unquestionable.",
    section2Title: "The Private Block",
    section2Text: "Unlike public auction houses, The Vault operates on a strictly closed-network basis. Our upcoming Autumn Catalog features a single-owner collection of unworn, 'new-old-stock' perpetual calendars that have never previously been seen by the public market."
  },
  "6": {
    title: "The Enduring Appeal of the Speedmaster",
    category: "History",
    time: "7 Min Read",
    image: "/watches/omega_speedmaster.png",
    intro: "How a chronograph designed for auto racing became the most famous extraterrestrial tool in human history.",
    section1Title: "The NASA Trials",
    section1Text: "In 1964, NASA systematically attempted to destroy chronographs from Rolex, Longines-Wittnauer, and Omega using extreme temperatures, vacuums, humidity, and shocks. Only the Omega Speedmaster survived the barrage.",
    section2Title: "The Caliber 321",
    section2Text: "Vintage collectors obsess over exactly which mechanism beats inside. The legendary Caliber 321—the column-wheel movement that actually went to the Moon—remains the Holy Grail of Speedmaster collecting, offering unparalleled robustness and historical weight."
  }
};

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = editorialDatabase[params.id] || editorialDatabase["1"];

  return (
    <main className="flex min-h-screen flex-col w-full bg-noir pt-24 px-6 relative">
      <Link href="/editorial" className="absolute top-24 left-6 text-gold/70 hover:text-gold flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition-colors">
        <ArrowLeft size={16} /> Back to Editorial
      </Link>
      
      <article className="max-w-3xl mx-auto w-full py-16">
        <div className="text-gold text-xs uppercase tracking-widest font-bold mb-4 flex gap-4 items-center">
          <span>{article.category}</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span className="flex items-center gap-1"><Clock size={12}/> {article.time}</span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl text-parchment mb-8 leading-tight tracking-wide">
          {article.title}
        </h1>
        
        <div className="w-full aspect-video bg-muted/10 border border-muted/20 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('${article.image}')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent"></div>
        </div>

        <div className="prose prose-invert prose-p:text-parchment/70 prose-p:font-light prose-p:leading-relaxed prose-headings:text-gold prose-headings:font-serif">
          <p className="text-xl leading-relaxed text-parchment/90 mb-8 border-l-2 border-gold pl-6">
            {article.intro}
          </p>

          <h2 className="text-2xl mt-12 mb-6">{article.section1Title}</h2>
          <p className="mb-6">
            {article.section1Text}
          </p>

          <h2 className="text-2xl mt-12 mb-6">{article.section2Title}</h2>
          <p className="mb-6">
            {article.section2Text}
          </p>
        </div>
      </article>
    </main>
  );
}
