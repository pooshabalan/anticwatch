// @ts-ignore
import { PrismaClient } from "@prisma/client";

// @ts-ignore
const globalForPrisma = global as unknown as { prisma: any };

export const prisma =
  globalForPrisma.prisma ||
  (typeof PrismaClient !== "undefined" ? new PrismaClient() : null);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

