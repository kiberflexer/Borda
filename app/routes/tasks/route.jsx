import * as React from "react";
import {json} from "@remix-run/node";
import {useLoaderData, useSearchParams} from "@remix-run/react";

import {Task} from "./task";

import {getAllTasks} from "./get-tasks.server";
import {Filter} from "./options";
import {TreeMap} from "~/routes/tasks/treemap";
import {TreemapChartJS} from "~/routes/tasks/treemap-chartjs";
import {NivoResponsiveTreeMap, vdata} from "./treemap-nivo";

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
        <div className="">
            <div className="container flex justify-between">
                <h2>Tasks</h2>
                <Filter/>
            </div>
            {/*<div className='p-5 grid grid-auto-fit-xl gap-5'>*/}
            {/*    {viewTasks.map((task) => (*/}
            {/*        <Task*/}
            {/*            task={task}*/}
            {/*            key={task.id}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<TreeMap/>*/}
            {/*<TreemapChartJS/>*/}
            <NivoResponsiveTreeMap data={vdata}/>
        </div>
    )
}

