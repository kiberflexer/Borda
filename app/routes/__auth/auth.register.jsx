import {
    Form,
    Link,
    useActionData,
    useNavigation
} from '@remix-run/react'
import { json, redirect } from '@remix-run/node'
import { z } from 'zod'

import prisma from '~/utils/prisma.server'
import auth from '~/utils/auth.server'
import { hashPassword } from '~/utils/auth.server'

import { MakaraIcon } from '~/components/icons/MakaraIcon'
import { EmailField, PasswordField, Field } from '~/components/Field'
import { Button } from '~/components'
import { validateAction } from '~/utils/utils.server'


export const loader = async ({ request }) => {
    return await auth.isAuthenticated(request, {
        successRedirect: "/popular"
    });
};

export async function action({ request }) {
    const schema = z.object({
        email: z.string().email('Неверный формат логина.'),
        password: z.string().min(5, { message: "Пароль должен содержать минимум 5 символов." }),
        name: z.string().min(2, { message: "Имя должно быть не менее 2 символов." }),
    })

    const { formData, errors } = await validateAction({ request, schema })
    if (errors) {
        return json({ errors })
    }

    let user = await prisma.user.findUnique({
        where: {
            email: formData.email,
        },
    })

    if (user) {
        return json({ errors: { email: 'Этот логин уже исползуется.' } })
    }

    let hash = hashPassword(formData.password)

    try {
        await prisma.user.create({
            data: {
                email: formData.email,
                password: hash,
                name: formData.name,
            }
        })
    } catch (e) {
        return json({
            errors: {
                message: 'Произошла ошибка. Попробуйте позже.'
            }
        })
    }


    return redirect('/login')
}


export default function RegistrationPage() {
    const navigation = useNavigation();
    let actionData = useActionData();

    return (
        <div className='container max-w-sm mx-auto'>
            <Form
                method="post"
                className='px-6 pb-5 mb-8 grid grid-cols-1 gap-10 bg-neutral-800 rounded-b-lg'
            >
                <div className='flex justify-center items-center p-6'>
                    <MakaraIcon className={'w-56 h-56'} />
                </div>
                <div className='grid grid-cols-1 gap-4'>
                    <EmailField
                        error={actionData?.errors.email}
                    />
                    <PasswordField
                        label="Пароль"
                        error={actionData?.errors.password}
                    />
                    <Field
                        label='Имя'
                        name='name'
                        placeholder='Nickname или настоящее имя'
                        error={actionData?.errors.name}
                    />
                </div>
                <div>
                    {
                        actionData?.errors?.message ? (
                            <div className='h-16 -mt-4 text-sm text-red-500 flex items-center justify-center'>
                                <p>{actionData.errors.message}</p>
                            </div>
                        ) : null
                    }
                    <Button
                        full
                        text='Создать аккаунт'
                        disabled={navigation.state === "loading"}
                    />
                    <div className="h-16 flex items-center place-content-center">
                        Уже есть аккаунт?
                        <Link to="/login" className="pl-3 text-blue-600">Войти</Link>
                    </div>
                </div>
            </Form>
        </div>
    )
}