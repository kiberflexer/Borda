import { redirect } from "@remix-run/node";

export async function loader() {
    return redirect('profile')
}

export default function SettingsIndex() {
    return <div>Oops... You should not see this.</div>
}