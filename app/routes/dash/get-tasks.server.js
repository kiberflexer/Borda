import prisma from "~/utils/prisma.server";
import {transformToTranslit} from "~/utils/utils.server";

function calculatePoints(solves) {
    //round(1000 × min(1, 10 / (9 + solves))),
    return Math.round(1000 * Math.min(1, 10 / (9 + solves)))
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