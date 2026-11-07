import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const mockWatches = [
  // 1. Rolex Set (5 items)
  { brand: "Rolex", model: "Submariner Ref. 5513", year: 1980, price: 24000, image: "/watches/rolex_submariner.png" },
  { brand: "Rolex", model: "Daytona Ref. 6263 'Big Red'", year: 1978, price: 124500, image: "/watches/rolex_submariner.png" },
  { brand: "Rolex", model: "Explorer 1016", year: 1968, price: 18000, image: "/watches/rolex_submariner.png" },
  { brand: "Rolex", model: "GMT-Master 1675 'Pepsi'", year: 1972, price: 32000, image: "/watches/rolex_submariner.png" },
  { brand: "Rolex", model: "Day-Date 1803 Stella Dial", year: 1975, price: 45000, image: "/watches/rolex_submariner.png" },

  // 2. Patek Philippe Set (5 items)
  { brand: "Patek Philippe", model: "Perpetual Calendar Chrono 2499", year: 1952, price: 850000, image: "/watches/patek_2499.png" },
  { brand: "Patek Philippe", model: "Calatrava Ref. 96", year: 1945, price: 32500, image: "/watches/patek_calatrava.png" },
  { brand: "Patek Philippe", model: "Nautilus Ref. 3700/1A", year: 1981, price: 185000, image: "/watches/patek_calatrava.png" },
  { brand: "Patek Philippe", model: "Aquanaut 5060A", year: 1997, price: 65000, image: "/watches/patek_calatrava.png" },
  { brand: "Patek Philippe", model: "World Time 2523", year: 1953, price: 3000000, image: "/watches/patek_2499.png" },

  // 3. Audemars Piguet Set (5 items)
  { brand: "Audemars Piguet", model: "Royal Oak 'Jumbo' 5402", year: 1972, price: 95000, image: "/watches/ap_royal_oak.png" },
  { brand: "Audemars Piguet", model: "Royal Oak Offshore", year: 1993, price: 35000, image: "/watches/ap_royal_oak.png" },
  { brand: "Audemars Piguet", model: "Quantième Perpétuel Automatique", year: 1984, price: 42000, image: "/watches/ap_royal_oak.png" },
  { brand: "Audemars Piguet", model: "Star Wheel", year: 1991, price: 55000, image: "/watches/ap_royal_oak.png" },
  { brand: "Audemars Piguet", model: "Jules Audemars Tourbillon", year: 1998, price: 85000, image: "/watches/ap_royal_oak.png" },

  // 4. Omega Set (5 items)
  { brand: "Omega", model: "Speedmaster Professional 'Pre-Moon'", year: 1968, price: 18000, image: "/watches/omega_speedmaster.png" },
  { brand: "Omega", model: "Seamaster 300 Ref. 165.024", year: 1966, price: 14000, image: "/watches/omega_speedmaster.png" },
  { brand: "Omega", model: "Constellation 'Pie Pan'", year: 1961, price: 4500, image: "/watches/omega_speedmaster.png" },
  { brand: "Omega", model: "Flightmaster Cal. 910", year: 1969, price: 8500, image: "/watches/omega_speedmaster.png" },
  { brand: "Omega", model: "Ploprof 600m", year: 1970, price: 11000, image: "/watches/omega_speedmaster.png" },

  // 5. Cartier Set (5 items)
  { brand: "Cartier", model: "Crash Vintage London", year: 1967, price: 220000, image: "/watches/cartier_crash.png" },
  { brand: "Cartier", model: "Tank Cintrée", year: 1921, price: 45000, image: "/watches/cartier_crash.png" },
  { brand: "Cartier", model: "Santos-Dumont Platinum", year: 1990, price: 28000, image: "/watches/cartier_crash.png" },
  { brand: "Cartier", model: "Pasha de Cartier Grid", year: 1985, price: 15000, image: "/watches/cartier_crash.png" },
  { brand: "Cartier", model: "Tortue Monopoussoir", year: 1999, price: 38000, image: "/watches/cartier_crash.png" }
];

async function main() {
  console.log(`Injecting Massive 25-Piece Inventory...`);

  // Empty existing watches to prevent duplicates
  await prisma.watch.deleteMany({});
  
  let count = 0;
  for (const watch of mockWatches) {
    const rawPrice = watch.price;
    const rarity = rawPrice > 100000 ? 98 : (watch.year < 1970 ? 88 : 75);

    await prisma.watch.create({
      data: {
        brand: watch.brand,
        model: watch.model,
        year: watch.year,
        basePrice: rawPrice,
        currentPrice: rawPrice,
        description: `Authentic antique ${watch.brand} from ${watch.year}. Extremely rare configuration.`,
        images: [watch.image],
        status: "Active",
        fraudRisk: "Low",
        rarityScore: rarity
      }
    });
    count++;
  }

  console.log(`Successfully generated ${count} bespoke luxury timepieces in TiDB Vault!`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
