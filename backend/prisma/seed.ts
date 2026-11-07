import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const mockWatches = [
  {
    "id": "2",
    "brand": "Patek Philippe",
    "model": "Nautilus Ref. 3700/1A",
    "year": 1981,
    "price": "$185,000",
    "image": "/patek.png"
  },
  {
    "id": "3",
    "brand": "Audemars Piguet",
    "model": "Royal Oak \"Jumbo\" Ref. 5402",
    "year": 1972,
    "price": "$95,000",
    "image": "/watches/ap.png"
  },
  {
    "id": "4",
    "brand": "Rolex",
    "model": "Submariner Ref. 5513",
    "year": 1980,
    "price": "$24,000",
    "image": "/watches/rolex-sub.png"
  },
  {
    "id": "5",
    "brand": "Patek Philippe",
    "model": "Calatrava Ref. 96",
    "year": 1945,
    "price": "$32,500",
    "image": "/watches/patek-vintage.png"
  },
  {
    "id": "6",
    "brand": "Cartier",
    "model": "Crash",
    "year": 1967,
    "price": "$220,000",
    "image": "/watches/cartier.jpg"
  },
  {
    "id": "7",
    "brand": "Omega",
    "model": "Speedmaster Professional",
    "year": 1969,
    "price": "$18,000",
    "image": "/watches/omega.png"
  },
  {
    "id": "12",
    "brand": "Patek Philippe",
    "model": "Perpetual Calendar Chrono 2499",
    "year": 1952,
    "price": "$850,000",
    "image": "/watches/patek-vintage.png"
  }
];

async function main() {
  console.log(`Start seeding the Vault...`);

  // Empty existing watches safely (for a clean slate)
  await prisma.watch.deleteMany({});
  console.log('Cleaned existing inventory records.');

  for (const watch of mockWatches) {
    const rawPrice = parseFloat(watch.price.replace(/[^0-9.]/g, ''));
    
    // Some arbitrary logic to give nice rarity scores based on vintage and price
    const rarity = rawPrice > 100000 ? 98 : (watch.year < 1970 ? 88 : 75);

    const createdWatch = await prisma.watch.create({
      data: {
        brand: watch.brand,
        model: watch.model,
        year: watch.year,
        referenceNumber: watch.id,
        basePrice: rawPrice,
        currentPrice: rawPrice,
        description: `An exceptional vintage piece from ${watch.year}, hailing from the legendary house of ${watch.brand}.`,
        images: [watch.image],
        status: "Active",
        fraudRisk: "Low",
        rarityScore: rarity
      }
    });
    console.log(`Created Timepiece: ${createdWatch.brand} ${createdWatch.model} (Rarity: ${createdWatch.rarityScore})`);
  }

  console.log(`Vault seedeing completed successfully.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
