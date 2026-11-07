import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateImages() {
  // Cartier Crash
  await prisma.watch.updateMany({
    where: { model: "Crash" },
    data: { images: ["/watches/cartier_crash.png"] }
  });

  // Patek 2499
  await prisma.watch.updateMany({
    where: { model: "Perpetual Calendar Chrono 2499" },
    data: { images: ["/watches/patek_2499.png"] }
  });

  // Patek Calatrava
  await prisma.watch.updateMany({
    where: { model: "Calatrava Ref. 96" },
    data: { images: ["/watches/patek_calatrava.png"] }
  });

  console.log("Vault images perfectly updated!");
}

updateImages().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
