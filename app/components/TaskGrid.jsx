import {NavLink} from "@remix-run/react";
import {cn} from "~/utils/cn";
import {
    CheckCircleIcon,
    FlagIcon,
    HandThumbUpIcon,
    ArrowsRightLeftIcon,
    FingerPrintIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
    PuzzlePieceIcon,
    WindowIcon
} from "@heroicons/react/24/outline";

const colors = {
    web: "bg-gradient-to-br from-yellow-500 to-orange-600",
    crypto: "bg-gradient-to-br from-emerald-500 to-lime-600",
    forensics: "bg-gradient-to-tr from-fuchsia-500 to-purple-600",
    osint: "bg-gradient-to-br from-sky-500 to-blue-600",
    reverse: "bg-gradient-to-br from-red-500 to-rose-600",
    misc: "bg-gradient-to-br from-violet-500 to-indigo-600",
}

const icons = {
    web: WindowIcon,
    crypto: LockClosedIcon,
    forensics: FingerPrintIcon,
    reverse: ArrowsRightLeftIcon,
    osint: MagnifyingGlassIcon,
    misc: PuzzlePieceIcon
}

function TaskCard({task}) {
    const color = colors[task.category.name];
    const Icon = icons[task.category.name]

    return (
        <NavLink
            to={task.url}
            className={({isActive}) =>
                cn(
                    "w-full py-4 px-5 grid grid-flow-row gap-2 ",
                    "focus:scale-95 ",
                    "rounded-md overflow-hidden border-2 border-white/10 hover:border-white/40",
                    "bg-neutral-900",
                    "transition-transform ease-in-out",
                    "relative",
                    {"opacity-30 blur-sm": task.solved},
                )
            }
        >
            <div className={cn("w-full h-24 flex flex-row")}>
                <div
                    className={cn(
                        color,
                        "rounded-xl flex-none h-24 w-24 flex justify-center items-center"
                    )}
                >
                    <Icon className=" w-10 h-10"/>
                </div>

                <div className="ml-5 grid grid-cols-2 grid-rows-2 gap-2 w-full">
                    <p className="col-span-2 text-lg truncate">{task.title}</p>
                    <p className="justify-self-start self-end text-3xl font-medium">
                        {task.points}
                    </p>
                    <div
                        className="justify-self-end self-center grid grid-cols-2 grid-rows-2 gap-1 place-items-center text-white/50 font-normal">
                        <FlagIcon className="w-4 h-4" strokeWidth={2}/>
                        <p className="">{task.solves}</p>
                        <HandThumbUpIcon className="w-4 h-4" strokeWidth={2}/>
                        <p className="">{task.likes}</p>
                    </div>
                </div>

                {/*{task.solved ? (*/}
                {/*    <div*/}
                {/*        className="absolute top-0 left-0 w-full h-full grid place-items-center bg-black/80 backdrop-blur-sm  text-white/60">*/}
                {/*        <div className="grid grid-cols-1 place-items-center">*/}
                {/*            <CheckCircleIcon className="h-16 w-16" strokeWidth={1}/>*/}
                {/*            <p className=" text-xl font-medium tracking-wider">Solved</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*) : null}*/}
            </div>
        </NavLink>
    );
}


export default function TaskGrid({tasks}) {
    let sortedTasks = tasks.sort(function (a, b) {
        return a.points - b.points
    });
    return (
        <div className='p-5 grid grid-auto-fit-xl gap-5'>
            {sortedTasks.map((task) => (
                <TaskCard
                    task={task}
                    key={task.id}
                />
            ))}
        </div>
    )
}

