import { Link } from "@remix-run/react";
import clsx from "clsx";
import {
    ArrowsRightLeftIcon,
    BarsArrowDownIcon,
    FingerPrintIcon,
    FlagIcon,
    HeartIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
    PuzzlePieceIcon,
    WindowIcon
} from "@heroicons/react/24/outline";
import moment from 'moment';

export default function TaskPreview({ task, children }) {
    return (
        <div className="bg-neutral-900 rounded-lg text-white w-full">
            <TaskHeader>
                <TaskCategory category={task.category} />
                <Link to={"/u/" + task.author.id} className="pr-5 whitespace-nowrap">
                    {task.author.name}
                </Link>
                <TaskDate date={task.updatedAt} />
                <div className="ml-auto">
                    <p className="text-xl font-bold tracking-widest">{task.points}</p>
                </div>

            </TaskHeader>
            <Link to={task.url} className="">
                <h1 className="px-5 my-5 text-xl font-bold">{task.title}</h1>
            </Link>
            {children}
            <TaskFooter>
                <button className="flex items-center mr-5">
                    <HeartIcon className="w-4 h-4" strokeWidth={2} />
                    <span className="ml-1">{task.likes}</span>
                </button>

                <button className="flex items-center mr-5">
                    <FlagIcon className="w-4 h-4" strokeWidth={2} />
                    <span className="ml-1">{task.solves}</span>
                </button>

                <button className="flex-shrink ml-auto flex items-center">
                    <BarsArrowDownIcon className="w-4 h-4" strokeWidth={2} />
                    <span className="ml-1">0</span>
                </button>

            </TaskFooter>
        </div>
    )
}

function TaskHeader({ children }) {
    return (
        <div className="h-10 flex items-center px-5 pt-4 mb-4 text-sm">
            {children}
        </div>
    )
}

function TaskFooter({ children }) {
    return (
        <div className="h-10 flex items-center px-5 mt-4 pb-4 text-sm">
            {children}
        </div>
    )
}

function TaskDate({ date }) {
    moment.locale('ru')
    moment.localeData('ru')
    // moment.tz("Europe/Moscow")

    const fromNow = moment(date, true).fromNow(false);
    // const fromNow = moment(date, true).calendar();

    return (<p className="whitespace-nowrap">{fromNow}</p>)
}

function TaskCategory({ category }) {
    const Icon = icons[category.name]
    const color = colors[category.name]
    return (
        <Link to={"/" + category.name} className="flex-none mr-5 flex items-center font-bold">
            <div className={clsx("w-5 h-5 grid place-items-center rounded mr-2", color)}>
                <Icon className="w-4 h-4" />
            </div>
            <p className="capitalize">{category.title}</p>
        </Link>
    )
}

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