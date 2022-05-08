import { redirect } from "@remix-run/node";

export const apiBaseURL = process.env.API_BASE_URL;
if (!apiBaseURL) {
	throw new Error("API_BASE_URL must be set");
}

export async function login({ request, username, password }) {
	let response;
	let session = await storage.getSession(
		request.headers.get('Cookie')
	);

	try {
		response = await fetch(apiBaseURL + '/auth/sign-in', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let data = await response.json();
		console.log('Data:', data)

	} catch (error) {
		//     return { errors: Object.values(error.response.data.errors).flat() };
		console.error('Error:', error);
	}

	session.set("userToken", response.data.token);

	return redirect("/", {
		headers: {
			"Set-Cookie": await storage.commitSession(session)
		}
	})
};