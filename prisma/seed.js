const { PrismaClient, Role, Category } = require('@prisma/client');
const bcrypt = require('bcrypt');
const yaml = require('js-yaml');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    await prisma.$queryRaw`SET TIMEZONE="Europe/Moscow";`

    const admin = await prisma.user.create({
        data: {
            email: "a@ctfboard.ru",
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

    const tasks = await Promise.all(
        categories.map(function (category) {
            return prisma.task.create({
                data: {
                    title: `Тестовый таск в категории ${category.title}`,
                    description: `Описание тестового таска в категории ${category.title}`,
                    points: 1000,
                    flag: "ADM{flag}",
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

    console.log({ tasks })

    await prisma.event.create({
        data: {
            name: 'Admiral Makarov CTF',
            startDate: new Date('March 10, 2023 10:00:00 GMT+03:00'),
            endDate: new Date('March 10, 2023 22:00:00 GMT+03:00'),
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