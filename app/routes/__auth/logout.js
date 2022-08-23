import { authenticator } from "~/services/auth.server";

export let action = async ({ request }) => {
    return await authenticator.logout(request, {
        redirectTo: "/",
    });
};