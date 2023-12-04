import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import moment from "moment";

import {getAllTasks} from "~/utils/task.server";
import {isEventStarted} from "~/utils/utils.server";

import Layout from "~/components/Layout";
import TaskGrid from "~/components/TaskGrid";
import Error from "~/components/Error";
import {useRouteData} from "~/lib/route-data";

export async function loader({}) {
    // const eventStarted = await isEventStarted();
    //
    // if (!eventStarted) {
    //     return json({tasks: []})
    // }

    let tasks = await getAllTasks()
    return json({tasks})
}

export default function PopularPage() {
    let data = useLoaderData();
    console.log(data.tasks[1].title)


    const rootData = useRouteData("root")

    const now = moment();
    const start = moment(rootData.ctf.startDate);
    if (!now.isBefore(start)) {
        return (
            <Layout className="pt-8">
                <div className="rounded-lg bg-neutral-900">
                    <div className="px-5 py-4">
                        <p className="py-20 text-center text-sm font-normal">Соревнования еще не начались</p>
                    </div>
                </div>

            </Layout>
        )
    }

    return (
        <TaskGrid tasks={data.tasks}/>
    )
}

export function ErrorBoundary({error}) {
    console.log({error})
    return (
        <Error
            code="500"
            text="Не могу загрузить таски"
            error={error}
        />
    )
}