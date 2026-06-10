import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../prisma/generated/prisma"

const DB_URI = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString: DB_URI })

const prisma = new PrismaClient({ adapter })


export default prisma