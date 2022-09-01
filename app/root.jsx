import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useCatch
} from "@remix-run/react";

import Header from "./components/Header";

import styles from "./styles/tailwind.css";

import Error from "./routes/error";

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles }
  ]
}

export default function App() {
  const location = useLocation()
  console.log(location)

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <title>{meta.title ? title : 'ADM CTF'}</title>
      </head>
      <body>
        {location.pathname !== "/" && location.pathname !== "/login" ? (<Header />) : null}
        <Outlet />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops! {caught.status} {caught.statusText}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Error
         status =  {caught.status}
         statusText = {caught.statusText}
        />
        <Scripts />
      </body>
    </html>
  );
}