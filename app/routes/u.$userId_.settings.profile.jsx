import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useActionData } from '@remix-run/react';
import {z} from "zod";

import auth from '~/utils/auth.server';
import { transformToTranslit, validateAction } from '~/utils/utils.server';
import { getSession, commitSession } from '~/utils/session.server';
import prisma from '~/utils/prisma.server';

import Button from '~/components/Button'
import { Field } from '~/components/Field';

export async function loader({ request }) {
    let user = await auth.isAuthenticated(request);

    return json({ user })
}

export default function Profile() {
    let { user } = useLoaderData();
    let actionData = useActionData();

    return (
        <Form method='post' reloadDocument replace
            className='grid grid-cols-1 gap-5 pt-4'
        >
            <Field
                name='name'
                label="Отображаемое имя"
                defaultValue={user.name}
                error={actionData?.errors?.name}
            />
            <Button
                text='Save'
                className='self-center justify-self-start'
            />
        </Form>
    )
}

export async function action({ request }) {
    let user = await auth.isAuthenticated(request);

    const schema = z.object({
        name: z.string().min(2, { message: "Имя должен содержать минимум 2 символа." }),
    })

    const { formData, errors } = await validateAction({ request, schema })

    if (errors) {
        return json({ errors })
    }

    const update = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: formData.name,
        },
    })

    user.name = update.name
    user.url = `/u/${user.id}-${transformToTranslit(update.name)}`

    const session = await getSession(request.headers.get('Cookie'))
    session.set(auth.sessionKey, user)


    return redirect(user.url, { headers: { 'set-cookie': await commitSession(session) } })
}