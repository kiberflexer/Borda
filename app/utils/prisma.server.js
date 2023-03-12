import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

// const prisma = new PrismaClient();
// let prisma

// if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient()
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient()
//     }

//     prisma = global.prisma
// }

// export default prisma

const globalPrisma = global

const prisma = globalPrisma.prisma || new PrismaClient({
    // log: ['query'],
})

if (process.env.NODE_ENV !== 'production') {
    globalPrisma.prisma = prisma
}

export default prisma
