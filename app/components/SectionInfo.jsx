import clsx from "clsx"
import {
    ArrowsRightLeftIcon,
    FingerPrintIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
    PuzzlePieceIcon,
    WindowIcon
} from "@heroicons/react/24/outline";

export default function SectionInfo({ section }) {
    const backgroundColor = colors[section.name]
    const icon = icons[section.name]
    return (
        <div className="relative rounded-lg bg-neutral-800 overflow-clip ">
            <div className={clsx("h-36", backgroundColor)}></div>
            <div className="p-5">
                <div className="-mt-14 grid grid-cols-1 justify-items-start gap-5">
                    <div className={clsx("w-24 h-24 grid place-items-center rounded-lg border-4 border-neutral-800", backgroundColor)}>
                        {icon}
                    </div>
                    <h2 className=" text-3xl font-bold">{section.title}</h2>
                    <p className="">{section.description? section.description: "Описание"}</p>
                    
                </div>

            </div>
        </div>
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
    web: <WindowIcon className="w-14 h-14" />,
    crypto: <LockClosedIcon className="w-14 h-14" />,
    forensics: <FingerPrintIcon className="w-14 h-14" />,
    reverse: <ArrowsRightLeftIcon className="w-14 h-14" />,
    osint: <MagnifyingGlassIcon className="w-14 h-14" />,
    misc: <PuzzlePieceIcon className="w-14 h-14" />
}