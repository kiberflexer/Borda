import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "@remix-run/react";

import Header from "./components/Header";

import styles from "./styles/tailwind.css";

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

// export function ErrorBoundary({ error }) {
//   console.error(error);
//   return (
//     <html>
//       <head>
//         <title>Oh no!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {/* add the UI you want your users to see */}
//         <Scripts />
//       </body>
//     </html>
//   );
// }