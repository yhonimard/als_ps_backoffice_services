import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../prisma/generated/index"


const connectionString = process.env.DATABASE_URL

const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter, log: ["query", "info", "error"] })

export default prisma