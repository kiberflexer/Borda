import { Form } from "@remix-run/react";
import {auth} from "~/services/auth.server";

export async function loader({ request }) {
    return auth.isAuthenticated(request, {
        successRedirect: "/protected",
    });
}
export default function Login() {
    return (
        <Form action="/auth/github" method="post">
            <button>Login with GitHub</button>
        </Form>
    );
}