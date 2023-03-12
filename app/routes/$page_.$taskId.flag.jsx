import { json } from '@remix-run/node'
import { z } from 'zod'

import prisma from '~/utils/prisma.server'
import auth from '~/utils/auth.server'
import { validateAction } from '~/utils/utils.server'

export async function action({ request, params }) {
    const user = await auth.isAuthenticated(request)

    if (!user) {
        return json(
            { errors: { flag: "Необходимо войти в аккаунт, чтобы начать решать таски." } },
            { status: 400 },
        )
    }

    if (!user.team) {
        return json(
            { errors: { flag: "Необходимо вступить в команду, чтобы начать решать таски." } },
            { status: 400 },
        )
    }

    const result = await z.number()
        .int()
        .positive()
        .safeParseAsync(Number(params.taskId.split("-")[0]))

    if (!result.success) {
        return json({ errors: {} }, { status: 400 })
    }

    let correctSolution = await prisma.solution.findFirst({
        where: {
            taskId: result.data,
            teamId: user.team.id,
            isCorrect: true,
        }
    })

    if (correctSolution) {
        return json({ errors: { flag: "Таск уже решен." } }, { status: 400 })
    }

    const schema = z.object({
        flag: z.string().regex(
            new RegExp('ADM{[0-9A-Za-z_]+}$', 'm'),
            { message: "Флаг должен иметь формат ADM{flag}." },
        ),
    })

    const { formData, errors } = await validateAction({ request, schema })

    if (errors) {
        return json({ errors }, { status: 400 })
    }

    try {
        const task = await prisma.task.findUnique({
            where: {
                id: result.data,
            },
            select: {
                flag: true,
            },
        })

        const solution = await prisma.solution.create({
            data: {
                flag: formData.flag,
                task: { 
                    connect: { 
                        id: result.data,
                    },
                },
                team: { 
                    connect: { 
                        id: user.team.id,
                    },
                },
                user: { 
                    connect: { 
                        id: user.id,
                    }, 
                },
                isCorrect: formData.flag == task.flag,
            }
        })

        if (!solution.isCorrect) {
            return json({ errors: { flag: "Флаг неверный." } })
        }

        return json("ok")
    } catch (err) {
        return json({ errors: { flag: "Произошла ошибка." } }, { status: 500 })
    }
}