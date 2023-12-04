import * as React from "react";
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    ScrollRestoration,
    useLocation,
    useRouteError,
    useLoaderData,
    isRouteErrorResponse,
} from "@remix-run/react";
import {json} from "@remix-run/node";
import clsx from "clsx";
import {
    useTheme,
    ThemeProvider,
    PreventFlashOnWrongTheme,
} from "remix-themes";

import {themeSessionResolver} from "~/theme.server";
import styles from "~/tailwind.css";
import authenticator from "~/utils/auth.server";

import Error from "~/components/Error";
import Header from "./components/Header";
import Account from "./components/Account";
import Nav from "~/components/Nav";
import {ModeToggle} from "./components/mode-togle";
import {SiteHeader} from "~/components/site-header";
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

    let user = await authenticator.isAuthenticated(request);
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
    let {user} = useLoaderData();

    const location = useLocation();
    const [isOpen, setIsopen] = React.useState();
    // if (!location.pathname === "/"){
    //     setIsopen(false)
    // } else{
    //         setIsopen(true)
    //     }

    const toggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    };

    return (
        <html lang="en" className={clsx(theme)}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)}/>
            <Links/>
        </head>
        <body className=" bg-background min-w-xs min-h-screen scroll-style">
        {/*<Header menuOnClick={toggleSidebar}>*/}
        {/*    <Account className="justify-self-end" user={data.user}/>*/}
        {/*    <ModeToggle></ModeToggle>*/}
        {/*</Header>*/}
        <SiteHeader isLoggedIn={data.user != null} avatarFallback={data.user?.name}/>
        <div className="flex flex-1 w-full">
            <Nav isActive={isOpen}/>
            <main className="flex-grow min-w-0 relative">
                <Outlet/>
            </main>
            {/* <div className="w-80 flex-shrink-0 relative border-l border-white/30"></div> */}
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

// export function CatchBoundary() {
//     const caught = useCatch();

//     // console.log('CatchBoundary', caught);

//     if (caught.status === 404 || caught.status === 403) {
//         return (
//             <html>
//                 <head>
//                     <Meta />
//                     <Links />
//                 </head>
//                 <body className='bg-black min-w-xs min-h-screen'>
//                     <Header>
//                         {/* <Account className="justify-self-end" /> */}
//                     </Header>
//                     <div className='flex flex-1 w-full'>
//                         <Nav />
//                         <main className='flex-grow min-w-0 relative'>
//                             <Error
//                                 code={caught.status}
//                                 text="К сожалению, страница, которую вы ищете, не найдена."
//                             />
//                         </main>
//                     </div>
//                     {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
//                     <ScrollRestoration getKey={(location) => {
//                         return location.pathname
//                     }} />
//                     <Scripts />
//                 </body>
//             </html>
//         )
//     }
//     throw new Error(`Unhandled error: ${caught.status} `)
// }

export function ErrorBoundary() {
    const error = useRouteError();

    console.log(error);

    // when true, this is what used to go to `CatchBoundary`
    if (!isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>Oops</h1>
                <p>Status: {error.status}</p>
                <p>{error.message}</p>
            </div>
        );
    }

    return (
        <html>
        <head>
            <Meta/>
            <Links/>
        </head>
        <body className="bg-black min-w-xs min-h-screen">
        <Header>
            {/* <Account className="justify-self-end" user={user} /> */}
        </Header>
        <div className="flex flex-1 w-full">
            <Nav/>
            <main className="flex-grow min-w-0 relative">
                <Error
                    code="500"
                    text="К сожалению, страница, которую вы ищете, в данный момент не работает."
                    error={error}
                />
            </main>
        </div>
        {process.env.NODE_ENV === "development" ? <LiveReload/> : null}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}
