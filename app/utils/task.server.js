import prisma from '~/utils/prisma.server'
import {transformToTranslit} from './utils.server';

function deleteTask(taskId) {
    return prisma.task.delete({where: {id: taskId}})
}

function calculatePoints(solves) {
    //round(1000 × min(1, 10 / (9 + solves))),
    return Math.round(1000 * Math.min(1, 10 / (9 + solves)))
}

const taskQuery = {
    where: {
        status: {
            public: true,
        }
    },
    select: {
        id: true,
        title: true,
        description: true,
        points: true,
        category: {
            select: {
                name: true,
                title: true
            }
        },
        author: {
            select: {
                id: true,
                name: true,
            },
        },
        _count: {
            select: {
                likes: true,
            },
        },
    },

}

export async function getTasks(teamID) {
    let tasks = await prisma.task.findMany(taskQuery)

    for (const item of tasks) {
        item.solved = await prisma.solution.findFirst({
            where: {
                taskId: item.id,
                teamId: teamID,
                isCorrect: true,
            }
        }).then(Boolean)

        item.likes = item._count.likes
        delete item._count

        const solves = await prisma.solution.count({
            where: {
                taskId: item.id,
                isCorrect: true,
            }
        })
        item.solves = solves
        item.points = calculatePoints(solves)

        item.url = `/${item.category.name}/${item.id}-${transformToTranslit(item.title)}`
    }

    return tasks
}

export async function getTaskForUser(taskId, user) {
    let task = await prisma.task.findUniqueOrThrow({
        where: {
            id: taskId,
        },
        include: {
            category: {
                select: {
                    name: true,
                    title: true
                }
            },
            status: {
                select: {
                    active: true,
                    public: true,
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                },
            },
        },
    })

    let solutions = [];
    let isSolved = false;

    if (user.team) {
        solutions = await prisma.solution.findMany({
            where: {
                taskId: task.id,
                teamId: user.team.id,
            },
            select: {
                id: true,
                flag: true,
                user: {
                    select: {
                        name: true
                    }
                },
                createdAt: true,
                isCorrect: true,
            }
        })

        isSolved = await prisma.solution.findFirst({
            where: {
                taskId: task.id,
                teamId: user.team.id,
                isCorrect: true,
            }

        }).then(Boolean)

    }

    const solves = await prisma.solution.count({
        where: {
            taskId: task.id,
            isCorrect: true,
        }
    })

    const newProps = {
        url: `/${task.category.name}/${task.id}-${transformToTranslit(task.title)}`,
        solves: solves,
        isSolved: isSolved,
        solutions: solutions,
        likes: task._count.likes
    }

    task.points = calculatePoints(solves)

    delete task._count
    delete task.flag

    return Object.assign(task, newProps);
}

export async function getTask(taskId) {
    let task = await prisma.task.findUniqueOrThrow({
        where: {
            id: taskId,
        },
        include: {
            category: {
                select: {
                    name: true,
                    title: true
                }
            },
            status: {
                select: {
                    active: true,
                    public: true,
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                },
            },
        },
    })

    const solves = await prisma.solution.count({
        where: {
            taskId: task.id,
            isCorrect: true,
        }
    })


    task.points = calculatePoints(solves)

    const newProps = {
        url: `/${task.category.name}/${task.id}-${transformToTranslit(task.title)}`,
        solves: solves,
        likes: task._count.likes
    }

    delete task._count
    delete task.flag

    return Object.assign(task, newProps);
}


export async function getTasksByCategory(category) {
    let tasks = await prisma.task.findMany({
        where: {
            category: {
                name: category
            },
            status: {
                public: true,
            }
        },
        include: {
            category: {
                select: {
                    name: true,
                    title: true
                }
            },
            status: {
                select: {
                    active: true,
                    public: true,
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                },
            },
        },
    });

    await Promise.all(tasks.map(async (task, i) => {
        const solves = await prisma.solution.count({
            where: {
                taskId: task.id,
                isCorrect: true,
            }
        })

        task.points = calculatePoints(solves)

        const newProps = {
            url: `/${task.category.name}/${task.id}-${transformToTranslit(task.title)}`,
            solves: solves,
            likes: task._count.likes
        }

        delete task._count
        delete task.flag

        return Object.assign(task, newProps);
    }))

    return tasks
}

export async function getAllTasks() {
    let tasks = await prisma.task.findMany({
        where: {
            status: {
                public: true,
            }
        },
        include: {
            category: {
                select: {
                    name: true,
                    title: true
                }
            },
            status: {
                select: {
                    active: true,
                    public: true,
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    likes: true,
                },
            },
        },
    });

    await Promise.all(tasks.map(async (task, i) => {
        const solves = await prisma.solution.count({
            where: {
                taskId: task.id,
                isCorrect: true,
            }
        })

        task.points = calculatePoints(solves)

        const newProps = {
            url: `/${task.category.name}/${task.id}-${transformToTranslit(task.title)}`,
            solves: solves,
            likes: task._count.likes
        }

        delete task._count
        delete task.flag

        return Object.assign(task, newProps);
    }))

    return tasks
}