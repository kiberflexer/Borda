import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";
import { createCookieSessionStorage } from "@remix-run/node";

const isProduction = process.env.NODE_ENV === "production"

let sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "_session", // use any name you want here
        sameSite: "lax", // this helps with CSRF
        path: "/", // remember to add this so the cookie will work in all routes
        httpOnly: true, // for security reasons, make this cookie http only
        secrets: [process.env.SESSION_SECRET], // replace this with an actual secret
        // enable this in prod only
        ...(isProduction
            ? {domain: process.env.DOMAIN_NAME, secure: true}
            : {}),
    },
});

let gitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async ({ accessToken, extraParams, profile }) => {
        // Save/Get the user data from your DB or API using the tokens and profile
        return profile;
    }
);

export let auth = new Authenticator(sessionStorage);
auth.use(gitHubStrategy);