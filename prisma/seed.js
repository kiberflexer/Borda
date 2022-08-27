// import {PrismaClient} from '@prisma/client'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.task.deleteMany({})
    await prisma.player.deleteMany({})

    await prisma.$queryRaw`SET TIMEZONE="Europe/Moscow";`

    const players = await Promise.all(
        fakePlayers().map((player) => {
            return prisma.player.create({ data: player })
        })
    );
    console.log(players)

    const tasks = await Promise.all(
        fakeTasks().map((task) => {
            task = Object.assign(task, {
                author: {
                    connect: {
                        email: players[0].email
                    }
                }
            });

            return prisma.task.create({ data: task })
        })
    );
    console.log(tasks)

    const tasks2 = await prisma.task.findMany({
        include: {
            author: true,
        },
    })
    console.log(tasks2)
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

function fakeTasks() {
    return [
        {
            name: "Fake web task",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna eget sem volutpat efficitur.`,
            category: "WEB",
            points: 100,
            flag: "flag{...}",
            hint: "Hint...",
            // author: {
            //     connect: {
            //         id: "46755932-3fc1-44c2-a2f3-8d4117a0cc22",
            //         // email: "max@test.com",
            //     }
            // }
        },
        {
            name: "Fake crypto task",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna eget sem volutpat efficitur.`,
            category: "CRYPTO",
            points: 100,
            flag: "flag{...}",
            hint: "Hint...",
        },
        {
            name: "Fake osint task",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna eget sem volutpat efficitur.`,
            // category: "", // must be OTHER
            points: 100,
            flag: "flag{...}",
            hint: "Hint...",
        }
    ];
}

function fakePlayers() {
    return [
        {
            email: 'max@test.com',
            displayName: 'Max',
        },
        {
            email: 'ivan@test.com',
            displayName: 'Ivan',
        }
    ];
}