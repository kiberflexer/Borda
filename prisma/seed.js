const {PrismaClient, Role, Category} = require('@prisma/client');
const bcrypt = require('bcrypt');
const yaml = require('js-yaml');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
    await prisma.$executeRaw`SET TIMEZONE="Europe/Moscow";`

    const admin = await prisma.user.upsert({
        where: {
            id: 1
        },
        create: {
            email: "a@ctfboard.ru",
            name: "Admin",
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
            role: Role.ADMIN
        },
        update: {
            email: "a@ctfboard.ru",
            name: "Admin",
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
        }
    })

    const categoryInfo = [
        ["web", "WEB", "Посик и эксплуатация web-уязвимостей"],
        ["crypto", "Криптография", "Расшифровке зашифрованных строк различными сопосбами и шифрамии."],
        ["forensics", "Форензика", "Изучение данных, например, анализ пакетов в файле .pcap, анализ дампа памяти."],
        ["osint", "OSINT", "Поиск информации из открытых источников."],
        ["reverse", "Реверс", "Исследование программ без исходного кода."],
        ["misc", "Разное", "Развлекательные задачи."]
    ]
    const categories = await Promise.all(
        categoryInfo.map((category) => {
            return prisma.category.upsert({
                where: {
                    name: category[0]
                },
                create: {
                    name: category[0],
                    title: category[1],
                    about: category[2]
                },
                update: {
                    name: category[0],
                    title: category[1],
                    about: category[2]
                }
            })
        })
    )

    const prefix = process.env.CTF_FLAG_PREFIX
    const testTasks = await Promise.all(
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

    const updateOrCreateTasks = async function (tasks, categoryID) {
        return await Promise.all(
            tasks.map(async function (task) {
                console.log(categoryID)
                try {
                    return await prisma.task.upsert({
                        create: {
                            title: task.title,
                            description: task.description,
                            points: task.points,
                            flag: task.flag,
                            category: {
                                connect: {
                                    id: categoryID
                                }
                            },
                            author: {
                                connectOrCreate: {
                                    where: {
                                        email: task.author.contact,
                                    },
                                    create: {
                                        email: task.author.contact,
                                        name: task.author.name,
                                        password: await bcrypt.hash("password", 10),
                                    },
                                },
                            },

                            status: {
                                create: {
                                    public: false,
                                    active: true
                                }
                            }
                        },
                        where: {
                            flag: task.flag,
                        },
                        update: {
                            title: task.title,
                            description: task.description,
                        },
                    })
                } catch (e) {
                    if (e.code == "P2002") {
                        return await prisma.task.upsert({
                            create: {
                                title: task.title,
                                description: task.description,
                                points: task.points,
                                flag: task.flag,
                                category: {
                                    connect: {
                                        id: categoryID
                                    }
                                },
                                author: {
                                    connectOrCreate: {
                                        where: {
                                            email: task.author.contact,
                                        },
                                        create: {
                                            email: task.author.contact,
                                            name: task.author.name,
                                            password: await bcrypt.hash("password", 10),
                                        },
                                    },
                                },

                                status: {
                                    create: {
                                        public: false,
                                        active: true
                                    }
                                }
                            },
                            where: {
                                flag: task.flag,
                            },
                            update: {
                                title: task.title,
                                description: task.description,
                            },
                        })
                    }

                }
            })
        )
    }


    const categoryIDs = categories.reduce(function (result, category) {
        return {...result, [category.name]: category.id}
    }, {})

    const data = yaml.load(fs.readFileSync("./data.yml"));
    // console.log({data})


    // const webTasks = await updateOrCreateTasks(data.web, categoryIDs.web)
    // const cryptoTasks = await updateOrCreateTasks(data.crypto, categoryIDs.crypto)
    // const forensicsTasks = await updateOrCreateTasks(data.forensics, categoryIDs.forensics)
    // const osintTasks = await updateOrCreateTasks(data.osint, categoryIDs.osint)
    // const reverseTasks = await updateOrCreateTasks(data.reverse, categoryIDs.reverse)
    // const miscTasks = await updateOrCreateTasks(data.misc, categoryIDs.misc)

    // console.log({
    //     testTasks,
    //     // webTasks,
    //     cryptoTasks,
    //     forensicsTasks,
    //     osintTasks,
    //     // reverseTasks,
    //     miscTasks,
    // })

    const create = async (data, id) => {
        const newt = data.map(async (task) => {
            return prisma.task.create({
                data: {
                    title: task.title,
                    description: task.description,
                    points: task.points,
                    flag: task.flag,
                    category: {
                        connect: {
                            id: id
                        }
                    },
                    author: {
                        connect: {
                            id: 15,
                        },
                    },

                    status: {
                        create: {
                            public: false,
                            active: false
                        }
                    }
                },
            })
        })
        return await Promise.all(newt)
    }

    const misc = await create(data.misc, categoryIDs.misc)
    const crypto = await create(data.crypto, categoryIDs.crypto)
    const forensics = await create(data.forensics, categoryIDs.forensics)
    const osint = await create(data.osint, categoryIDs.osint)

    console.log(misc, crypto, osint, forensics)

    // await prisma.event.create({
    //     data: {
    //         name: 'ADMCTF 2023',
    //         startDate: new Date('December 16, 2023 15:00:00+03:00'),
    //         endDate: new Date('December 17, 2023 15:00:00+03:00'),
    //         location: "Online",
    //         format: 'Task-based'
    //     }
    // })
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

// return prisma.task.upsert({

