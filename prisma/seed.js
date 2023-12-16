const {PrismaClient, Role, Category} = require('@prisma/client');
const bcrypt = require('bcrypt');
const yaml = require('js-yaml');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`SET TIMEZONE="Europe/Moscow";`


    const admin = await prisma.user.create({
        data: {
            email: "a@a.ru",
            name: "Admin",
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
            role: Role.ADMIN
        },
    })

    const categoryNames = [
        ["web", "WEB"],
        ["crypto", "Криптография"],
        ["forensics", "Форензика"],
        ["osint", "OSINT"],
        ["reverse", "Реверс"],
        ["misc", "Разное"]
    ]
    const categories = await Promise.all(
        categoryNames.map((c) => {
            return prisma.category.create({
                data: {
                    name: c[0],
                    title: c[1]
                }
            })
        })
    )

    const prefix = process.env.CTF_FLAG_PREFIX
    const tasks = await Promise.all(
        categories.map(function (category) {
            return prisma.task.create({
                data: {
                    title: `Тестовый таск в категории ${category.title}`,
                    description: `Описание тестового таска в категории ${category.title}`,
                    points: 1000,
                    flag: prefix + "{flag}",
                    category: {
                        connect: {
                            id: category.id
                        }
                    },
                    author: {
                        connect: {
                            email: admin.email,
                        }
                    },
                    status: {
                        create: {
                            public: true,
                            active: true
                        }
                    }
                },
            })
        })
    );

    console.log({tasks})

    await prisma.event.create({
        data: {
            name: 'ADMCTF 2023',
            startDate: new Date('December 16, 2023 15:00:00+03:00'),
            endDate: new Date('December 17, 2023 15:00:00+03:00'),
            location: "Online",
            format: 'Task-based'
        }
    })
}


main()
    .then(async function () {
        await prisma.$disconnect()
    })
    .catch(async function (e) {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })