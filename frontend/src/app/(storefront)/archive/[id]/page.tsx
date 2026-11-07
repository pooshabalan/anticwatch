import { HeroGallery } from "@/components/detail/HeroGallery";
import { KeyDetails } from "@/components/detail/KeyDetails";
import { BentoSpecs } from "@/components/detail/BentoSpecs";
import { Storytelling } from "@/components/detail/Storytelling";
import { WatchCard } from "@/components/ui/WatchCard";

// Mock database lookup based on ID
const parseId = (id: string) => {
  return {
    id,
    brand: "Rolex",
    model: "Daytona Ref. 6263 \"Big Red\"",
    year: 1978,
    price: "$124,500",
    image: "/rolex.png",
    description: "The Rolex Cosmograph Daytona Reference 6263 'Big Red' is among the most sought-after vintage chronographs in the world. Produced in the late 1970s and 1980s, this specific example features the iconic black acrylic bezel and silver 'reverse panda' dial with the distinctive large red 'DAYTONA' arched above the lower sub-dial. The condition of this historical piece is extraordinary, retaining its original sharp case profiles, matching tritium lume plots, and flawless dial. It represents a watershed era in horology, bridging the gap between vintage charm and modern precision.",
    specs: {
      movement: "Manual winding chronograph",
      caliber: "Valjoux 727",
      jewels: 17,
      caseDiameter: "37mm",
      caseMaterial: "Stainless Steel",
      dialColor: "Silver / Black",
      braceletMaterial: "Stainless Steel Oyster",
      waterResistance: "50m",
      condition: "Excellent Vintage",
      boxAndPapers: "Original Box, Archives Extract",
    }
  };
};

export default function WatchDetailPage({ params }: { params: { id: string } }) {
  const watch = parseId(params.id);

  return (
    <main className="min-h-screen bg-noir pt-24 pb-32">
      <div className="max-w-screen-2xl mx-auto px-6">
        
        {/* Top Section: Gallery + Key Details */}
        <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-32 border-b border-muted/20 pb-16">
          <div className="flex-1 w-full lg:w-3/5">
            <HeroGallery image={watch.image} alt={`${watch.brand} ${watch.model}`} />
          </div>
          <div className="flex-1 w-full lg:w-2/5">
            <KeyDetails watch={watch} />
          </div>
        </section>

        {/* Narrative & Storytelling */}
        <section className="mb-24">
          <Storytelling brand={watch.brand} description={watch.description} />
        </section>

        {/* Technical Specifications (Bento Grid) */}
        <section className="mb-32">
          <BentoSpecs specs={watch.specs} />
        </section>

        {/* Similar Timepieces */}
        <section className="border-t border-muted/30 pt-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-serif text-parchment">Similar Holdings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Generating 4 related pieces dynamically */}
            {[1, 2, 3, 4].map((i) => (
              <WatchCard 
                key={i} 
                id={`sim-${i}`} 
                brand="Patek Philippe" 
                model="Nautilus Reference 3700/1A" 
                year={1981} 
                price="$185,000" 
                image="/patek.png" 
                delay={i * 0.15} 
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
