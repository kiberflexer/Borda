import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { json } from "@remix-run/node";

import auth from "~/utils/auth.server";
import prisma from "~/utils/prisma.server";

import Layout from "~/components/Layout";
import Profile from "~/components/Profile";
import Error from "~/components/Error";

export async function loader({ request, params }) {
    const userId = Number(params.userId.split("-")[0])

    const schema = z.number().int().positive()
    const result = await schema.safeParseAsync(userId)

    if (!result.success) {
        throw new Response(`User ${userId} not found`, { status: 404 });
    }

    let user = await prisma.user.findUnique({
        where: {
            id: result.data
        },
        select: {
            id: true,
            name: true,
            createdAt: true
        }
    })

    if (!user) {
        throw new Response(`User ${userId} not found`, { status: 404 });
    }

    let currentUser = await auth.isAuthenticated(request);

    Object.assign(user, { privateProfile: currentUser?.id == user.id })

    return json({ user })
}

export default function UserRoute() {
    const { user } = useLoaderData();

    return (
        <Layout className="bg-neutral-800 rounded-b-lg">
            <div className="py-6 px-2">
                <Profile user={user} />
            </div>
        </Layout>
    )
}

export async function shouldRevalidate({
    currentParams,
    nextParams,
    defaultShouldRevalidate,
}) {
    let currentId = currentParams.taskId;
    let nextID = nextParams.taskId;
    if (currentId !== nextID) {
        return true;
    }

    return defaultShouldRevalidate;
}

export function ErrorBoundary({ error }) {
    console.log({ error })
    return (
        <Error
            code="500"
            text="К сожалению, страница, которую вы ищете, в данный момент не работает."
            error={error}
        />
    )
}