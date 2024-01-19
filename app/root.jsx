import * as React from "react";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from "@remix-run/react";
import {json} from "@remix-run/node";
import clsx from "clsx";
import {PreventFlashOnWrongTheme, ThemeProvider, useTheme,} from "remix-themes";

import {themeSessionResolver} from "~/theme.server";
import styles from "~/tailwind.css";
import {auth} from "~/services/auth.server";
import {SiteHeader} from "~/components/site-header";
import {SideNav} from "~/components/side-nav";
import {getCTF} from "~/utils/ctf.server";

export function meta({data, error}) {
    return [
        {title: error ? "Oops!" : data.ctf.name},
        {
            name: "description",
            content: "This app is the best CTF website.",
        },
    ];
}

export function links() {
    return [{rel: "stylesheet", href: styles}];
}

export async function loader({request}) {
    const {getTheme} = await themeSessionResolver(request);

    let user = await auth.isAuthenticated(request);
    const ctf = {
        name: process.env.CTF_NAME,
    };

    return json({
        user: user,
        ctf: await getCTF(),
        theme: getTheme(),
    })
}

export default function AppWithProviders() {
    const data = useLoaderData();
    return (
        <ThemeProvider specifiedTheme={data.theme} themeAction="/set-theme">
            <App data={data}/>
        </ThemeProvider>
    );
}

export function App({data}) {
    const [theme] = useTheme();

    return (
        <html lang="en" className={clsx(theme)}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)}/>
            <Links/>
        </head>
        <body className="bg-background min-w-xs min-h-screen">
        <SiteHeader
            isLoggedIn={data.user != null}
            avatarFallback={data.user?.displayName}
            avatarSrc={data.user?._json.avatar_url}
        />
        <div className="">
            <div>
                <SideNav/>
                <main className="md:pl-52 ">
                    <div className="bg-zinc-900 border-l-2 border-l-white/10">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </div>

        {process.env.NODE_ENV === "development" ? <LiveReload/> : null}
        <ScrollRestoration
            getKey={(location) => {
                return location.pathname;
            }}
        />
        <Scripts/>
        </body>
        </html>
    );
}

// export function ErrorBoundary() {
//     const error = useRouteError();
//
//     console.log(error);
//
//     // when true, this is what used to go to `CatchBoundary`
//     if (!isRouteErrorResponse(error)) {
//         return (
//             <div>
//                 <h1>Oops</h1>
//                 <p>Status: {error.status}</p>
//                 <p>{error.message}</p>
//             </div>
//         );
//     }
//
//     return (
//         <html>
//         <head>
//             <Meta/>
//             <Links/>
//         </head>
//         <body className="bg-black min-w-xs min-h-screen">
//         <Header>
//             {/* <Account className="justify-self-end" user={user} /> */}
//         </Header>
//         <div className="flex flex-1 w-full">
//             <Nav/>
//             <main className="flex-grow min-w-0 relative">
//                 <Error
//                     code="500"
//                     text="К сожалению, страница, которую вы ищете, в данный момент не работает."
//                     error={error}
//                 />
//             </main>
//         </div>
//         {process.env.NODE_ENV === "development" ? <LiveReload/> : null}
//         <ScrollRestoration/>
//         <Scripts/>
//         </body>
//         </html>
//     );
// }
