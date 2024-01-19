import {auth} from "~/services/auth.server";

export let loader = async ({ request }) => {
    return await auth.logout(request, {
        redirectTo: "/",
    });
};