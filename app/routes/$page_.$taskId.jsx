import {json, redirect} from "@remix-run/node";
import {z} from "zod";
import {useLoaderData, useCatch} from "@remix-run/react";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";

import auth from "~/utils/auth.server";
import {getTaskForUser, getTask} from "~/utils/task.server";
import {isEventStarted} from "~/utils/utils.server";

import Layout from "~/components/Layout";
import TaskPreview from "~/components/TaskPreview";
import TaskFlagInput from "~/components/TaskFlagInput";
import TaskSolutions from "~/components/TaskSolutions";
import Error from "~/components/Error";
import authenticator from "~/utils/auth.server";

export async function loader({request, params}) {
    let user = await auth.isAuthenticated(request, {
        failureRedirect: "/login"
    });
    const isAdmin = user.role === "ADMIN";
    const eventStarted = await isEventStarted();
    if (!eventStarted && !isAdmin) throw new Response("Event not started", {status: 404});

    const taskId = params.taskId;
    const schema = z.number().int().positive()
    const result = await schema.safeParseAsync(Number(taskId.split("-")[0]))

    if (!result.success) {
        throw new Response(`Task with ID ${taskId} not found`, {
            status: 404,
        });
    }

    var task

    if (user) {
        // Todo: fix prisma task not found
        try {
            task = await getTaskForUser(result.data, user)
        } catch {
            throw new Response(`Task with ID ${taskId} not found`, {
                status: 404,
            });
        }
    } else {
        try {
            task = await getTask(result.data)
        } catch {
            throw new Response(`Task with ID ${taskId} not found`, {
                status: 404,
            });
        }
    }

    if (task.category.name != params.page) {
        return redirect(task.url)
    }


    if (!task.status.public) {
        throw new Response(`Task with ID ${taskId} is not published yet`, {status: 404})
    }

    return json({task})
}

export default function TaskPage() {
    const {task} = useLoaderData()

    return (
        <div className="grid gap-8">
            <Layout className="rounded-b-xl bg-neutral-900">
                <TaskPreview task={task}>
                    <ReactMarkdown
                        className='px-5 pb-2'
                        children={task.description}
                        components={{
                            ul: function ({children, ...props}) {
                                return <ul className="list-disc list-inside" {...props}>{children}</ul>
                            },
                            li: function ({children, ...props}) {
                                return <li className="ml-3" {...props}>{children}</li>
                            },
                            p: function ({className, ...props}) {
                                return <p className='mt-3   ' {...props}></p>
                            },
                            a: function ({href, children, ...otherProps}) {
                                return (
                                    <a
                                        href={href}
                                        target="_blank"
                                        className='text-rose-600 font-bold hover:cursor-pointer inline-flex items-center'
                                        {...otherProps}
                                    >
                                        <p className=''>{children}</p>
                                        <div className='ml-1'>
                                            <ArrowTopRightOnSquareIcon className=' w-4 h-4'/>
                                        </div>
                                    </a>
                                )
                            },
                            strong: function ({className, children, ...props}) {
                                return (
                                    <span className="font-black text-lg text-blue-500">
                                        {children}
                                    </span>
                                )
                            }
                        }}
                    />
                </TaskPreview>
            </Layout>
            <Layout className="rounded-xl bg-neutral-900">
                <div className="flex justify-between">
                    <p className="mx-5 pt-8 mb-4 ">Попытки {task.solutions?.length || 0}</p>
                    {
                        task.isSolved && <p className="mx-5 pt-8 mb-4 ">Таск решен </p>
                    }
                </div>
                {
                    !task.isSolved && <TaskFlagInput className="px-5 mb-8"/>
                }
                {
                    task.solutions && task.solutions.length > 0
                        ? <TaskSolutions solutions={task.solutions}/>
                        : null
                }
            </Layout>
        </div>
    )
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div className="rounded-lg bg-neutral-900">
                <div className="px-5 py-4">
                    <p className="py-20 text-center text-sm font-normal">
                        Задания откроются после начала соревнований.
                    </p>
                </div>
            </div>
        )
    }
    throw new Error(`Unhandled error: ${caught.status} `)
}