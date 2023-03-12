import * as React from 'react';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
    useLoaderData
} from '@remix-run/react'
import { json } from '@remix-run/node'

import styles from '~/styles/index.css'
import authenticator from '~/utils/auth.server'

import Error from "~/components/Error";
import Header from './components/Header';
import Account from './components/Account';
import Nav from "~/components/Nav";

export function meta() {
    return {
        charset: 'utf-8',
        title: 'CTFBOARD',
        viewport: 'width=device-width,initial-scale=1',
        description: "description"
    }
}

export function links() {
    return [
        { rel: 'stylesheet', href: styles }
    ]
}

export async function loader({ request }) {
    let user = await authenticator.isAuthenticated(request)
    return json({ user })
}

export default function App() {
    let { user } = useLoaderData();

    const [isOpen, setIsopen] = React.useState(true);

    const toggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }

    return (
        <html>
            <head>
                <Meta />
                <Links />
            </head>
            <body className='bg-black min-w-xs min-h-screen scroll-style'>
                <Header menuOnClick={toggleSidebar}>
                    <Account className="justify-self-end" user={user} />
                </Header>
                <div className='flex flex-1 w-full'>
                    <Nav isActive={isOpen} />
                    <main className='flex-grow min-w-0 relative'>
                        <Outlet />
                    </main>
                    {/* <div className="w-80 flex-shrink-0 relative border-l border-white/30"></div> */}
                </div>
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
                <ScrollRestoration getKey={(location) => {
                    return location.pathname
                }} />
                <Scripts />
            </body>
        </html>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    // console.log('CatchBoundary', caught);

    if (caught.status === 404 || caught.status === 403) {
        return (
            <html>
                <head>
                    <Meta />
                    <Links />
                </head>
                <body className='bg-black min-w-xs min-h-screen'>
                    <Header>
                        {/* <Account className="justify-self-end" /> */}
                    </Header>
                    <div className='flex flex-1 w-full'>
                        <Nav />
                        <main className='flex-grow min-w-0 relative'>
                            <Error
                                code={caught.status}
                                text="К сожалению, страница, которую вы ищете, не найдена."
                            />
                        </main>
                    </div>
                    {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
                    <ScrollRestoration getKey={(location) => {
                        return location.pathname
                    }} />
                    <Scripts />
                </body>
            </html>
        )
    }
    throw new Error(`Unhandled error: ${caught.status} `)
}

export function ErrorBoundary({ error }) {
    return (
        <html>
            <head>
                <Meta />
                <Links />
            </head>
            <body className='bg-black min-w-xs min-h-screen'>
                <Header>
                    {/* <Account className="justify-self-end" user={user} /> */}
                </Header>
                <div className='flex flex-1 w-full'>
                    <Nav />
                    <main className='flex-grow min-w-0 relative'>
                        <Error
                            code="500"
                            text="К сожалению, страница, которую вы ищете, в данный момент не работает."
                            error={error}
                        />
                    </main>
                </div>
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}