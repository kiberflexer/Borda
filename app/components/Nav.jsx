import {
    ArrowsRightLeftIcon,
    BoltIcon,
    FingerPrintIcon,
    LockClosedIcon,
    MagnifyingGlassIcon,
    PresentationChartLineIcon,
    PuzzlePieceIcon,
    WindowIcon
} from "@heroicons/react/24/outline";
import {NavLink} from "@remix-run/react";
import clsx from "clsx";
import Copyright from "./Copyright";

export default function Nav({children, isActive}) {
    if (!isActive) {
        return <></>
    }
    return (
        <div className={clsx("w-56 sticky top-16 flex-shrink-0", {"hidden": !isActive})}
             style={{height: "calc(100vh - 64px)"}}>
            <div className="h-full w-full relative overflow-y-auto overflow-x-hidden scroll-style">
                <div className="m-3 grid grid-cols-1 gap-3">
                    <NavItem
                        path="/popular"
                        text="Популярное"
                        icon={BoltIcon}
                    />
                    <NavItem
                        path="/web"
                        text="WEB"
                        icon={WindowIcon}
                    />
                    <NavItem
                        path="/crypto"
                        text="Криптография"
                        icon={LockClosedIcon}
                    />
                    <NavItem
                        path={"/reverse"}
                        text="Реверс"
                        icon={ArrowsRightLeftIcon}
                    />
                    <NavItem
                        path={"/osint"}
                        text="OSINT"
                        icon={MagnifyingGlassIcon}
                    />
                    <NavItem
                        path={"/forensics"}
                        text="Форензика"
                        icon={FingerPrintIcon}
                    />
                    <NavItem
                        path={"/misc"}
                        text="Разное"
                        icon={PuzzlePieceIcon}
                    />
                    <NavItem
                        path={"/scoreboard"}
                        text="Рейтинг"
                        icon={PresentationChartLineIcon}
                    />
                    <div className="pt-12 grid items-end m-3 bg-black">
                        <Copyright author="CTFBOARD TEAM"/>
                        <a
                            href="https://github.com"
                            className="flex h-11 items-center"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-neutral-100">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path>
                            </svg>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}

function NavItem({path, text, icon}) {
    const Icon = icon
    return (
        <NavLink
            to={path}
            className={({isActive}) => (clsx("h-11 rounded-lg", {"bg-neutral-800": isActive}))}
        >
            {({isActive}) => (
                <div className="h-full px-2 flex flex-row items-center text-neutral-100">
                    <Icon className="w-5 h-5" strokeWidth={2}/>
                    <div className="capitalize pl-3">
                        {text}
                    </div>
                </div>
            )}
        </NavLink>
    )
}