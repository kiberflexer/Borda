import { redirect } from "react-router";
import auth from "~/utils/auth.server";

export async function loader({ request }) {
   const user = await auth.isAuthenticated(request, {
      failureRedirect: "/login"
   })

   return redirect(user.url)
}

export default function Screen() {
   return <div>Странно ... должно быть выполнено перенаправление ...</div>
}