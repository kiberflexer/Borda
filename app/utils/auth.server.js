import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { z } from 'zod'
import * as bcrypt from 'bcrypt'

import prisma from './prisma.server'
import { sessionStorage } from './session.server'
import { transformToTranslit } from './utils.server'

const auth = new Authenticator(sessionStorage, {
    sessionKey: "sessionKey",
    sessionErrorKey: "sessionErrorKey",
})

auth.use(
    new FormStrategy(async function ({ form }) {
        let values = Object.fromEntries(form)

        const schema = z.object({
            email: z.string().email('Неверный формат логина.'),
            password: z.string().min(5, {message:'Пароль должен содержать минимум 5 символов.'}),
        })

        const result = await schema.safeParseAsync(values)

        if (!result.success) {
            throw new AuthorizationError(JSON.stringify({
                errors: result.error.issues.reduce((acc, curr) => {
                    const key = curr.path[0];

                    acc[key] = curr.message;

                    return acc
                }, {})
            }))
        }

        const formData = result.data;

        var user
        try {
            user = await prisma.user.findUniqueOrThrow({
                where: {
                    email: formData.email,
                },
                include: {
                    team: true
                }
            })
        } catch {
            throw new AuthorizationError(JSON.stringify({
                errors: {
                    email: 'Пользователь не найден'
                }
            }))
        }

        let match = await bcrypt.compare(formData.password, user.password)
        if (!match) {
            throw new AuthorizationError(JSON.stringify({
                errors: {
                    message: 'Такой комбинации логина и пароля не существует.'
                }
            }))
        }

        delete user.password
        delete user.teamId

        if (user.team){
            delete user.team?.token
        }
        
        Object.defineProperty(user, "url", {
            value: `/u/${user.id}-${transformToTranslit(user.name)}`,
            configurable: true,
            writable: true,
            enumerable: true
        });

        return await Promise.resolve({ ...user })
    })
)

async function validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

export default auth
export { hashPassword, validatePassword }
