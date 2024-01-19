import { redirect } from "@remix-run/node";
import { auth } from "~/services/auth.server";

export async function loader() {
    return redirect("/login");
}

export async function action({ request }) {
    return auth.authenticate("github", request, {
        successRedirect: "/protected",
    });
}