import {Task, TaskFull} from "../components/TaskCard";

export default function Challanges() {
    return (
        <>
            <div className="flex flex-row w-full">
                <div className="w-60 w-min-60 h-screen border-r-2 border-zinc-300 p-4 fixed">
                    <li class="mt-12 lg:mt-8">
                        <h class="mb-8 lg:mb-3 font-semibold text-slate-900 ">Category</h>
                        <ul class="space-y-6 lg:space-y-2 border-l border-slate-100 dark:border-slate-800">
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                            <li class="block border-l pl-4 -ml-px border-transparent hover:border-blue-700  text-slate-800 hover:text-blue-700">123</li>
                        </ul>
                    </li>
                </div>
                <div className="pl-60">
                    <div className="h-16 border-b-2 border-zinc-300 flex items-center">
                        <marquee direction="right" scrollamount="20" className="text-2xl font-semibold">
                            Ебать ты чукча!
                        </marquee>
                    </div>
                    <div className="p-7">
                        <TaskFull />
                    </div>
                    <div className="grid grid-cols-4 gap-1 p-7">
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                        <Task />
                    </div>
                </div>
            </div>
        </>
    );
}