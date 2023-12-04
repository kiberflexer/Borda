import * as React from "react";
import {json} from "@remix-run/node";
import {useLoaderData, useSearchParams} from "@remix-run/react";

import {TaskCard} from "./task.card";

import {getAllTasks} from "./get-tasks.server";
import {Filter} from "./options";

export async function loader({}) {
    // const eventStarted = await isEventStarted();
    //
    // if (!eventStarted) {
    //     return json({tasks: []})
    // }

    let tasks = await getAllTasks()
    return json({tasks})
}

export default function Dashboard() {
    const data = useLoaderData();
    let sortedTasks = data.tasks.sort(function (a, b) {
        return a.points - b.points
    })

    let [searchParams] = useSearchParams();
    let viewProp = searchParams.get("view")?.split(",") ?? [];

    let viewTasks = sortedTasks.filter(function (task) {
        return viewProp.includes(task.category.name)
    })
    return (
        <div className="pt-5">
            <div className="container flex justify-end">
                <Filter/>
            </div>
            <div className='p-5 grid grid-auto-fit-xl gap-5'>
                {viewTasks.map((task) => (
                    <TaskCard
                        task={task}
                        key={task.id}
                    />
                ))}
            </div>
        </div>
    )
}

