import { NavLink, Outlet } from "@remix-run/react"
import clsx from "clsx"
import { useLoaderData, Form } from '@remix-run/react'
import { json, redirect, Response } from '@remix-run/node'
import { Role } from '@prisma/client'

import authenticator from '~/utils/auth.server'

export async function loader({ request }) {
    let player = await authenticator.isAuthenticated(request, {
        failureRedirect: '/sign-in',
    })

    let isAdmin = player.role == Role.ADMIN

    if (!isAdmin) {
        throw new Response("", { status: 404 });
    }

    return new Response("", { status: 200 })
}

export default function () {
    let routes = [
        {
            path: "./",
            name: "Main"
        },
        {
            path: './players',
            name: 'Users',
        },
        {
            path: './tasks',
            name: 'Tasks',
        },
    ]

    return (
        <div className='h-full  w-full flex flex-row text-white'>
            <div className="w-56 flex-none bg-neutral-900">
                <div className=" h-full pt-6 flex flex-col items-start my-auto">
                    <div className="w-full flex-none grid grid-cols-1 gap-2">
                        {
                            routes.map((route, idx) => (
                                <NavLink
                                    to={route.path}
                                    key={idx}
                                    className="w-full px-3"
                                >
                                    {({ isActive }) => (
                                        <p className={clsx('text-white h-11 px-5 rounded-xl flex items-center', { 'bg-blue-600': isActive })}>
                                            {route.name}
                                        </p>
                                    )}
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Outlet />

        </div>
    )
}