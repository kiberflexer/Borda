import {
    Form,
    Link,
    useActionData,
    useNavigation
} from '@remix-run/react'
import { Response } from '@remix-run/node'
import { AuthorizationError } from 'remix-auth'

import auth from '~/utils/auth.server'

import { MakaraIcon } from '~/components/icons/MakaraIcon'
import { EmailField, PasswordField } from '~/components/Field'
import { Button } from '~/components'

export async function loader({ request }) {
    return await auth.isAuthenticated(request, {
        successRedirect: "/popular",
    })
}

export async function action({ request }) {
    try {
        return await auth.authenticate("form", request, {
            successRedirect: "/popular",
            throwOnError: true,
        })
    } catch (error) {
        // if (error instanceof Response) return error
        if (error instanceof AuthorizationError) {
            return new Response(error.message, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                status: 401,
            });
        }

        throw error
    }
}

export default function LoginPage() {
    let actionData = useActionData()
    const navigation = useNavigation()
    return (
        <div className='container max-w-sm mx-auto'>
            <Form
                method='post'
                className='px-6 pb-5 mb-8 grid grid-cols-1 gap-10 my-auto bg-neutral-800 rounded-b-xl'
            >
                <div className='p-4 flex justify-center'>
                    <MakaraIcon className={'w-56 h-56'} />
                </div>
                <div className='grid grid-cols-1 gap-4'>
                    <EmailField error={actionData?.errors?.email} />
                    <PasswordField error={actionData?.errors?.password} />
                </div>
                <div>
                    {
                        actionData?.errors?.message ? (
                            <div className='h-16 -mt-4 text-sm text-red-500 flex items-center justify-center'>
                                <p>{actionData?.errors?.message}</p>
                            </div>
                        ) : null
                    }
                    <Button
                        text='Войти'
                        full
                        disabled={navigation.state === "loading"}
                    />
                    <div className="h-16 flex items-center place-content-center">
                        Нет аккаунта?
                        <Link to="/register" className="pl-3 text-blue-600">Создать новый</Link>
                    </div>
                </div>
            </Form>
        </div>
    )
}