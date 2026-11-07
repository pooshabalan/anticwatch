# The Horologist's Archive

## Project Identity

**Name:** The Horologist's Archive
**Mission:** A luxury real-time marketplace for vintage, rare, and collectible watches.
**Theme:** Modern Classic + Dark Academic
**Visual Tone:** Elegant, mechanical, premium, cinematic, archival.

---

# Core Concept

The Horologist's Archive is not just a watch marketplace.

It should feel like a luxury museum, private auction house, and collector network combined into one experience.

The platform must give users the feeling that they are browsing rare and valuable mechanical pieces with historical significance.

The entire interface should feel:

* Dark
* Premium
* Slow and intentional
* Elegant
* Detailed
* Mechanical
* Cinematic

---

# Technical Stack

| Category         | Technology                                    |
| ---------------- | --------------------------------------------- |
| Frontend         | Next.js 14+ App Router                        |
| Styling          | Tailwind CSS                                  |
| Theme Colors     | Noir #121212, Parchment #F5F5DC, Gold #D4AF37 |
| Typography       | Playfair Display + Inter                      |
| Animation        | Framer Motion                                 |
| Database         | TiDB Cloud                                    |
| ORM              | Prisma                                        |
| State Management | Server Actions + SWR                          |
| Authentication   | NextAuth / Clerk                              |
| Backend Hosting  | Render                                        |
| Frontend Hosting | Netlify                                       |

---

# Color Palette

```txt
Noir: #121212
Parchment: #F5F5DC
Gold: #D4AF37
Muted Grey: #2A2A2A
Deep Brown: #3A2F2F
Soft White: #EDEDED
Success Green: #3FA34D
Danger Red: #A83232
```

---

# Typography

## Heading Font

* Playfair Display
* Elegant serif typography
* Used for titles, watch names, sections, luxury storytelling

## Body Font

* Inter
* Used for specs, descriptions, buttons, forms, technical information

---

# Website Structure

## Main Pages

1. Home Page
2. Archive Page
3. Watch Detail Page
4. Auction / Bid Page
5. Watchlist Page
6. Seller Profile Page
7. Checkout Page
8. Authentication Page
9. Dashboard Page
10. Admin Panel
11. About / Editorial Page
12. Contact Page

---

# Homepage Structure

## Hero Section

* Full-screen cinematic watch image
* Slow fade-in animation
* Dark overlay
* Gold typography
* CTA Buttons:

  * Explore Archive
  * View Auctions
  * Become a Seller

## Live Pulse Ticker

A horizontal ticker showing:

* Watch name
* Current price
* Percentage increase/decrease
* Mini arrow icon
* Recent bid count

Example:

```txt
Rolex Daytona +2.3%
Patek Philippe Nautilus -0.8%
Audemars Piguet Royal Oak +1.4%
```

## Featured Timepieces

Display 3–6 premium watches with:

* Large image
* Price
* Year
* Reference number
* Quick view

## Recently Added Watches

## Featured Brands Section

* Rolex
* Patek Philippe
* Vacheron Constantin
* Audemars Piguet
* Omega
* Cartier

## Editorial Section

Examples:

* Why Vintage Daytonas Hold Their Value
* The Story Behind the Nautilus
* The Rise of Independent Watchmakers

## Testimonials Section

Collector reviews and buyer trust indicators.

---

# Archive Grid Page

## Features

* Grid layout with large luxury cards
* Heavy shadow and layered card styling
* Hover Loupe effect
* Mouse-follow zoom circle for watch face details
* Parallax hover effect
* Soft gold border glow on hover
* Smooth Framer Motion transitions
* Quick actions:

  * View Details
  * Save to Watchlist
  * Compare
  * Place Bid

## Filters

* Brand
* Year
* Price Range
* Condition
* Case Size
* Dial Color
* Movement Type
* Material
* Limited Edition
* Box & Papers
* Seller Location
* Auction Ending Soon

---

# Watch Detail Page Structure

## Hero Gallery

* Large image gallery
* Zoom on click
* Thumbnail slider
* High resolution image preview

## Key Details

* Brand
* Model
* Year
* Reference Number
* Current Price
* Previous Price
* Price Change Percentage
* Seller
* Availability

## Bento Grid Specifications Section

Display information inside modern luxury bento cards.

### Technical Fields

* Movement
* Caliber
* Jewels
* Case Diameter
* Water Resistance
* Power Reserve
* Dial Color
* Bracelet Material
* Case Material
* Condition
* Authenticity Certificate
* Box & Papers
* Provenance
* Limited Edition Count

## Description Section

Long-form storytelling description about:

* Watch history
* Design inspiration
* Collector significance
* Ownership history

## Market Pulse Chart

Display price history using charts.

Include:

* 24h trend
* 7-day trend
* 30-day trend
* Highest sale
* Lowest sale
* Historical bid activity

## Similar Watches Section

Recommend related watches based on:

* Brand
* Price
* Style
* Material

---

# Checkout Page

## Checkout Flow

1. Cart Summary
2. Shipping Information
3. Billing Information
4. Payment Method
5. Review Order
6. Place Order

## Checkout Features

* Secure payment section
* Delivery estimate
* Luxury packaging option
* Insurance option
* Tax calculation
* Promo code support
* Saved addresses
* Saved payment methods

## Payment Methods

* Credit Card
* Debit Card
* UPI
* Net Banking
* PayPal
* Apple Pay
* Google Pay

## Checkout UI

* Dark premium layout
* Gold bordered cards
* Sticky order summary sidebar
* Animated success screen after purchase

---

# Seller Profile Page

## Seller Details

* Name
* Profile image
* Bio
* Verified Dealer Badge
* Rating
* Total Sales
* Member Since
* Location

## Seller Statistics

* Number of active listings
* Sold watches
* Response rate
* Average delivery time

---

# Authentication System

## User Roles

1. Guest
2. Buyer
3. Seller
4. Admin

## Features

* Sign Up
* Login
* Forgot Password
* Email Verification
* Social Login
* Two-Factor Authentication

---

# Real-Time Features

## Live Market Price Logic

Whenever a user visits the site:

* Simulate market movement
* Update only a few watches
* Change current price by +/- 0.5%
* Rare watches fluctuate less
* Trending watches fluctuate more

## SWR Polling

Poll every 10 seconds for:

* Price updates
* New bids
* Auction timer changes
* Market Pulse ticker updates

## Notifications

* Price drop alerts
* New bid alerts
* Auction ending soon alerts
* Watchlist item updates

---

# Database Design (Prisma + TiDB)

## User Model

```prisma
model User {
  id             String   @id @default(cuid())
  name           String
  email          String   @unique
  password       String
  role           String
  image          String?
  createdAt      DateTime @default(now())
  watchlist      Watchlist[]
  bids           Bid[]
  orders         Order[]
}
```

## Seller Model

```prisma
model Seller {
  id               String   @id @default(cuid())
  name             String
  bio              String?
  location         String
  verifiedDealer   Boolean  @default(false)
  rating           Float    @default(0)
  totalSales       Int      @default(0)
  avatar           String?
  memberSince      DateTime @default(now())
  watches          Watch[]
}
```

## Watch Model

```prisma
model Watch {
  id                     String   @id @default(cuid())
  brand                  String
  model                  String
  year                   Int
  caliber                String
  referenceNumber        String
  basePrice              Float
  currentPrice           Float
  previousPrice          Float?
  percentageChange24h    Float?
  description            String
  condition              String
  authenticityCertificate Boolean
  boxAndPapers           Boolean
  caseMaterial           String
  braceletMaterial       String
  dialColor              String
  movementType           String
  powerReserve           String
  caseDiameter           String
  waterResistance        String
  rarityScore            Float?
  provenance             String?
  limitedEdition         Boolean
  stockStatus            String
  viewsCount             Int      @default(0)
  favoriteCount          Int      @default(0)
  images                 Json
  sellerId               String
  seller                 Seller   @relation(fields: [sellerId], references: [id])
  bids                   Bid[]
  marketPulse            MarketPulse[]
}
```

## Bid Model

```prisma
model Bid {
  id         String   @id @default(cuid())
  amount     Float
  timestamp  DateTime @default(now())
  userId     String
  watchId    String
  user        User    @relation(fields: [userId], references: [id])
  watch       Watch   @relation(fields: [watchId], references: [id])
}
```

## MarketPulse Model

```prisma
model MarketPulse {
  id          String   @id @default(cuid())
  watchId     String
  price       Float
  change      Float
  createdAt   DateTime @default(now())
  watch        Watch   @relation(fields: [watchId], references: [id])
}
```

## Additional Tables

* Watchlist
* Notifications
* Orders
* Transactions
* Reviews
* RecentlyViewed
* Auction
* PriceAlerts
* Cart

---

# Stage 1: Frontend Development

## Goals

* Build luxury UI
* Implement animations
* Build responsive layouts
* Add hover interactions
* Create reusable components

## Frontend Pages Priority

1. Homepage
2. Archive Grid
3. Watch Detail Page
4. Checkout Page
5. Authentication Pages
6. Seller Profile Page
7. Admin Dashboard

## Frontend Components

* Navbar
* Footer
* Watch Card
* Live Ticker
* Bento Grid
* Price Chart
* Bid Panel
* Watchlist Button
* Compare Modal
* Checkout Form
* Notification Dropdown

## Framer Motion Effects

* Fade-in emergence effect
* Scroll reveal animations
* Card hover zoom
* Loupe hover tracking
* Floating ticker animation
* Luxury page transitions

---

# Stage 2: Backend + TiDB + Prisma

## Goals

* Build database models
* Create API routes
* Setup Prisma ORM
* Setup authentication
* Setup bidding logic
* Setup market fluctuation logic

## Backend Features

* User login and signup
* Seller registration
* Watch CRUD
* Bid placement
* Watchlist logic
* Cart and checkout logic
* Payment integration
* Notification system
* Admin controls

## Server Actions

### updateMarketPrices()

* Select random watches
* Apply small price fluctuation
* Update MarketPulse table
* Store previousPrice
* Trigger SWR refresh

### placeBid()

* Validate auction time
* Validate bid increment
* Update highest bid
* Notify previous bidder

### addToWatchlist()

### createOrder()

### createNotification()

---

# Stage 3: Hosting & Deployment

## Frontend Hosting

Platform: Netlify

### Deployment Steps

1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Add environment variables
4. Deploy frontend
5. Configure domain

## Backend Hosting

Platform: Render

### Deployment Steps

1. Push backend to GitHub
2. Connect repo to Render
3. Add Prisma and database environment variables
4. Configure build command
5. Deploy backend service

## Database Hosting

Platform: TiDB Cloud

### Required Environment Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
CLOUDINARY_URL=
```

---

# Suggested Seed Data Brands

* Rolex Daytona
* Rolex Submariner
* Patek Philippe Nautilus
* Patek Philippe Calatrava
* Audemars Piguet Royal Oak
* Vacheron Constantin Overseas
* Omega Speedmaster
* Cartier Santos

---

# Final Goal

The final product should feel like:

* Luxury watch marketplace
* Private collector network
* Premium auction platform
* Editorial magazine
* Real-time financial dashboard

The experience should combine the feeling of:

* Chrono24
* Sotheby's
* Hodinkee
* Christie's

with a dark, cinematic, premium design language.
