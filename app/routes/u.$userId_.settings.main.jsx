import * as React from "react";
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { z } from "zod";

import auth from '~/utils/auth.server';
import prisma from "~/utils/prisma.server";

import Button from '~/components/Button'
import { PasswordField } from '~/components/Field';
import { validateAction } from "~/utils/utils.server";
import { hashPassword, validatePassword } from "~/utils/auth.server";

export default function MainSettings() {
    let actionData = useActionData();

    return (
        <Form
            method='post'
            reloadDocument
            replace
            className='grid grid-cols-1 gap-5 pt-4'
        >
            <PasswordField
                name='currentPassword'
                label="Текущий пароль"
                error={actionData?.errors?.currentPassword}
            />
            <PasswordField
                name='newPassword'
                label="Новый пароль"
                error={actionData?.errors?.newPassword}
            />
            {
                actionData?.errors?.message && (
                    <div className='h-16 -mt-4 text-sm text-red-500 flex items-center justify-center'>
                        <p>{actionData.errors.message}</p>
                    </div>
                )
            }
            <Button
                text="Сохранить"
                className='self-center justify-self-start'
            />
        </Form>
    )
}

export async function action({ request }) {
    const signedUser = await auth.isAuthenticated(request, { failureRedirect: "/login" });

    const schema = z.object({
        currentPassword: z.string().min(5, { message: "Пароль должен содержать минимум 5 символов." }),
        newPassword: z.string().min(5, { message: "Пароль должен содержать минимум 5 символов." }),
    })

    const { formData, errors } = await validateAction({ request, schema })

    if (errors) {
        return json({ errors })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: signedUser.id, },
        })

        const match = await validatePassword(formData.currentPassword, user.password)

        if (!match) {
            return json({ errors: { currentPassword: 'Password is incorrect!' } })
        }

        let hashedPassword = await hashPassword(formData.newPassword)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword,
            },
        })

        return redirect("./")

    } catch (err) {
        console.log({ err })
        return json({ errors: { message: 'Произошла ошибка' } }, { status: 500 })
    }
}