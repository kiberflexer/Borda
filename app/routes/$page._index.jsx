import {useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";

import {getTasksByCategory} from "~/utils/task.server";
import {isEventStarted} from "~/utils/utils.server";

import TaskPreview from "~/components/TaskPreview"
import auth from "~/utils/auth.server";

export async function loader({params, request}) {
    const category = params.page;

    const user = await auth.isAuthenticated(request, {
        failureRedirect: "/login"
    })
    const isAdmin = user.role === "ADMIN"

    const eventStarted = await isEventStarted()

    if (!eventStarted && !isAdmin) {
        return json({tasks: []})
    }

    const tasks = await getTasksByCategory(category);

    return json({tasks})
}

export default function TaskPage() {
    const {tasks} = useLoaderData();

    return (
        <div className="grid gap-8">
            {
                tasks.length > 0
                    ? <>
                        {
                            tasks.map((task) => (
                                <TaskPreview key={task.id} task={task}/>
                            ))
                        }
                    </>
                    : (
                        <div className="rounded-lg bg-neutral-900">
                            <div className="px-5 py-4">
                                <p className="py-20 text-center text-sm font-normal">
                                    Задания откроются после начала соревнований.
                                </p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}