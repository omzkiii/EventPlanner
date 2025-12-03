import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
// const connectionString = "postgresql://geo:password123@database:5432/mydb";
const adapter = new PrismaPg({
  connectionString,
});
const prisma = new PrismaClient({ adapter });
console.log("DB URL:====================", connectionString);

export { prisma };
