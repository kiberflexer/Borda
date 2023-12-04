import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

import {getAllTasks} from "~/utils/task.server";
import {isEventStarted} from "~/utils/utils.server";

import Layout from "~/components/Layout";
import TaskGrid from "~/components/TaskGrid";
import Error from "~/components/Error";
import auth from "~/utils/auth.server";

export async function loader({request}) {
    const user = await auth.isAuthenticated(request, {
        failureRedirect: "/login"
    })
    const isAdmin = user.role === "ADMIN"
    console.log(user.role)
    console.log(isAdmin)

    const eventStarted = await isEventStarted()
    if (!eventStarted && !isAdmin) {
        return json({tasks: []})
    }

    const tasks = await getAllTasks()
    return json({tasks})
}

export default function PopularPage() {
    const {tasks} = useLoaderData();

    return (
        <>
            {
                tasks.length > 0
                    ? <TaskGrid tasks={tasks}/>
                    : (
                        <Layout className="pt-8">
                            <div className="rounded-lg bg-neutral-900">
                                <div className="px-5 py-4">
                                    <p className="py-20 text-center text-sm font-normal">
                                        Задания откроются после начала соревнований.
                                    </p>
                                </div>
                            </div>

                        </Layout>
                    )
            }
        </>
    )
}

export function ErrorBoundary({error}) {
    console.log({error})
    return (
        <Error
            code="500"
            text="К сожалению, страница, которую вы ищете, в данный момент не работает."
            error={error}
        />
    )
}