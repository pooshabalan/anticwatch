import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Connect to Next.js frontend
  credentials: true
}));
app.use(express.json());

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Operational', 
    service: 'The Eleventh Hour Core API', 
    timestamp: new Date().toISOString() 
  });
});

// GET all watches inside the TiDB Vault
app.get('/api/watches', async (req, res) => {
  try {
    const watches = await prisma.watch.findMany({
      orderBy: { rarityScore: 'desc' }, // Order by the most rare watches
    });
    
    // We map over them to ensure the JSON matches the exact structure the frontend expects,
    // including dynamically generating filter fields since we kept the DB schema lean
    const formattedWatches = watches.map((w: any) => {
      let complication = "None";
      if (w.model.toLowerCase().includes("chrono")) complication = "Chronograph";
      else if (w.model.toLowerCase().includes("perpetual") || w.model.toLowerCase().includes("perpétuel")) complication = "Perpetual Calendar";

      let material = "Stainless Steel";
      if (w.model.toLowerCase().includes("platinum")) material = "Platinum";
      else if (w.brand === "Cartier" || w.brand === "Patek Philippe" || w.model.toLowerCase().includes("gold")) material = "Yellow Gold";

      const decade = Math.floor(w.year / 10) * 10 + "s";

      return {
        id: w.id,
        brand: w.brand,
        model: w.model,
        year: w.year,
        decade: decade,
        complication: complication,
        material: material,
        price: `$${w.currentPrice.toLocaleString()}`, // Format the price back to $X,XXX
        image: Array.isArray(w.images) && (w.images as string[]).length > 0 ? (w.images as string[])[0] : null,
        status: w.status,
        rarityScore: w.rarityScore
      };
    });
    
    res.json(formattedWatches);
  } catch (error) {
    console.error("Vault Access Error:", error);
    res.status(500).json({ error: "Failed to access the TiDB Vault" });
  }
});

// POST to create a new order directly in TiDB Vault
app.post('/api/checkout', async (req, res) => {
  try {
    const orderData = req.body;
    
    const newOrder = await prisma.order.create({
      data: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        street: orderData.street,
        city: orderData.city,
        postalCode: orderData.postalCode,
        country: orderData.country || "Switzerland",
        paymentMethod: orderData.paymentMethod || "Wire Transfer",
        watchId: "4", // Hardcoded to the Daytona ID for now
        amount: 124500, // Hardcoded matching the UI
        status: "Escrow Locked"
      }
    });

    res.json({ success: true, orderId: newOrder.id, message: "Transaction secured in vault." });
  } catch (error) {
    console.error("Vault Transaction Error:", error);
    res.status(500).json({ error: "Failed to process transaction securely." });
  }
});

// POST to create a new Registry Application for auctions
app.post('/api/registry', async (req, res) => {
  try {
    const { fullName, email, interest } = req.body;
    
    const newApp = await prisma.registryApplication.create({
      data: {
        fullName,
        email,
        interest,
        status: "Pending Review"
      }
    });

    res.json({ success: true, applicationId: newApp.id, message: "Application submitted to Vault." });
  } catch (error) {
    console.error("Registry Application Error:", error);
    res.status(500).json({ error: "Failed to process registry application." });
  }
});

// POST to create a new User (Register)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists in The Circle." });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // In a production app, we would hash this!
        role: "COLLECTOR"
      }
    });

    res.json({ success: true, userId: newUser.id, message: "Welcome to The Eleventh Hour." });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Failed to create account." });
  }
});

app.listen(PORT, () => {
  console.log(`[TEH-SERVER] 🚀 Bridge Connected! Express Backend listening on http://localhost:${PORT}`);
  console.log(`[TEH-SERVER] Database Live. The Vault is officially unlocked.`);
});
