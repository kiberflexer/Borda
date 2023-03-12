import { ChevronLeftIcon, Cog6ToothIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { NavLink, Link, Outlet, useCatch } from "@remix-run/react";
import clsx from "clsx";
import { z } from "zod";

import auth from "~/utils/auth.server";
import prisma from "~/utils/prisma.server";

import Error from "~/components/Error";

export async function loader({ request, params }) {
    let currentUser = await auth.isAuthenticated(request, {
        failureRedirect: "/login",
    });

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
        }
    })

    if (!currentUser || currentUser.id != user.id) {
        throw new Response("Forbidden", { status: 403 },
        );
    }

    return new Response("ok")
}

export default function Settings() {
    return (
        <div className="container max-w-3xl mx-auto">
            <div className=" mt-5 grid grid-cols-[1fr_300px] gap-5">
                <div className="bg-neutral-800 rounded-lg p-5">
                    <Link to="./" className="">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Link>
                    <Outlet />
                </div>
                <div className="flex flex-col justify-start">
                    <div className="sticky">
                        <div className="w-full flex flex-col justify-start rounded-lg bg-neutral-800">
                            <p className="px-4 pt-3 mb-2 capitalize font-semibold">настройки</p>

                            <NavLink to="profile" className={({ isActive }) => clsx("px-4 h-12 flex items-center", { 'bg-blue-600 font-bold': isActive })}>
                                {({ isActive }) => (
                                    <>
                                        <UserIcon className="w-6 h-6 mr-3" strokeWidth={isActive ? 2 : 1} />
                                        <p className={clsx("h-full capitalize  border-b border-white/30 flex items-center flex-grow", { "border-none": isActive })}>
                                            Профиль
                                        </p>
                                    </>
                                )}

                            </NavLink>

                            <NavLink to="main" className={({ isActive }) => clsx("px-4 h-12 flex items-center", { 'bg-blue-600 font-bold': isActive })}>
                                {({ isActive }) => (
                                    <>
                                        <Cog6ToothIcon className="w-6 h-6 mr-3" strokeWidth={isActive ? 2 : 1} />
                                        <p className={clsx("h-full capitalize  border-b border-white/30 flex items-center flex-grow", { "border-none": isActive })}>
                                            Основные
                                        </p>
                                    </>
                                )}
                            </NavLink>

                            <NavLink to="team" className={({ isActive }) => clsx("px-4 h-12 flex items-center mb-2", { 'bg-blue-600 font-bold': isActive })}>
                                {({ isActive }) => (
                                    <>
                                        <UserGroupIcon className="w-6 h-6 mr-3" strokeWidth={isActive ? 2 : 1} />
                                        <p className={clsx("h-full capitalize flex items-center flex-grow")}>
                                            Команда
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 403) {
        return (
            <Error
                code={caught.status}
                text="Хорошие новости, мы не забыли проверку на права доступа в этом месте."
            />
        )
    }
    throw new Error(`Unhandled error: ${caught.status} `)
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