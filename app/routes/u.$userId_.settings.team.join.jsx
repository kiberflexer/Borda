import { json, redirect } from "@remix-run/node"
import { z } from "zod"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

import auth from "~/utils/auth.server"
import prisma from "~/utils/prisma.server"
import { validateAction } from "~/utils/utils.server"
import { getSession, commitSession } from '~/utils/session.server'

export async function action({ request }) {
    let user = await auth.isAuthenticated(request, {
        failureRedirect: '/login',
    })

    if (user.team) {
        return json({ errors: { token: 'Already in team.' } })
    }

    const schema = z.object({
        token: z.string().uuid()
    })

    const { formData, errors } = await validateAction({ request, schema })

    if (errors) {
        return json({ errors })
    }

    const team = await prisma.team.findUnique({
        where: {
            token: formData.token,
        },
        include: {
            members: true,
        }
    })

    if (team === null) {
        return json({ errors: { token: "Команда не найдена." } })
    }

    if (team && team.members.length == 0){
        return json({ errors: { token: "Команда не найдена." } })
    }

    if (team.members.length >= 4) {
        return json({ errors: { token: 'Команда заполнена.' } })
    }

    try {
        let updatedTeam = await prisma.team.update({
            where: {
                id: team.id,
            },
            data: {
                members: {
                    connect: { id: user.id },
                },
            },
        })

        delete updatedTeam.token

        user.team = updatedTeam

    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            // TODO: check error code
            throw json({ errors: { token: 'Произошла ошибка. Попробуйте позже.' } })
        }
        throw e
    }

    const session = await getSession(request.headers.get('Cookie'))
    session.set(auth.sessionKey, user)

    return redirect(user.url, { headers: { 'set-cookie': await commitSession(session) } })
}