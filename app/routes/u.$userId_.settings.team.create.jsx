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

    if (user.team != null) {
        return json({ errors: { name: 'Already in team' } })
    }

    const schema = z.object({
        name: z.string().min(3, { message: "Must be 3 or more characters long" })
    })

    const { formData, errors } = await validateAction({ request, schema });

    if (errors) {
        return json({ errors })
    }

    let team
    try {
        team = await prisma.team.create({
            data: {
                name: formData.name,
                captainId: user.id,
                members: {
                    connect: [{ id: user.id }],
                },
            },
        })
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            // TODO: check error code
            if (e.code == "P2002") {
                throw json({ errors: { name: 'Команда с таким названием уже существует.' } }, { status: 400 })
            }
        }
        throw e
    }

    delete team.token

    user.team = team

    const session = await getSession(request.headers.get('Cookie'))
    session.set(auth.sessionKey, user)

    return redirect(user.url, { headers: { 'set-cookie': await commitSession(session) } })
}