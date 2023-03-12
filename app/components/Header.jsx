import { Bars3Icon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link } from "@remix-run/react";

import LogoIcon from "~/components/icons/Logo";

export default function Header({ children, menuOnClick }) {
    return (
        <div
            style={{ backgroundColor: "rgba(29,29,31,0.5)" }}
            className={clsx(
                "sticky inset-0 z-50 w-full h-16",
                "backdrop-filter backdrop-blur-xl  backdrop-saturate-150",
                // "bg-black/50",
                // "border-b border-white border-opacity-25",
                // "shadow-xl"
            )}
        >
            <div className="h-full grid grid-cols-2"
                style={{ backgroundColor: "rgba(29,29,31,0.6)" }}
            >
                <div className="justify-self-start flex flex-row">
                    <div className="pl-5 flex items-center cursor-pointer" onClick={menuOnClick}>
                        <Bars3Icon className="w-7 h-7" strokeWidth={2} />
                    </div>
                    <Link to="/" className="flex items-center">
                        <LogoIcon className="w-auto h-10 pl-4 text-white fill-current" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
};