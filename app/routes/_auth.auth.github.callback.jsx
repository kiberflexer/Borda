import {auth} from "~/services/auth.server";

export async function loader({ request }) {
    return auth.authenticate("github", request, {
        successRedirect: "/protected",
        failureRedirect: "/login",
    });
}