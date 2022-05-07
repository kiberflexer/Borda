import { Outlet, useLoaderData } from "@remix-run/react";

export let loader = async () => {
	let res = await fetch(
		`https://borda-api-server.herokuapp.com/api/v1/tasks`,
		{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJib3JkYS12MSIsImV4cCI6MTY1MjAyODI3MywiaWF0IjoxNjUxOTQxODczLCJpc3MiOiIxIiwic2NvcGUiOlsiYWRtaW4iXX0.mfa1Xf9FWwn17rt7xro52bR6I3lEtB6jGP-x2EdDhF8',
				'Content-Type': 'application/json',
			},
		}
	)
	return res;
}

export default function TasksRoute() {
	let tasks = useLoaderData();
	console.log(tasks)

	return (
		<div>
			<h1>Tasks</h1>
			{tasks.map((task) => (
				<div key={task.id}>{task.title}</div>
			))}
			{/* <p>{tasks.time}</p> */}
			<main>
				<Outlet />
			</main>
		</div>
	);
}
