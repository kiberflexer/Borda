import * as React from "react";
import {
    AdjustmentsHorizontalIcon,
    ArrowLeftOnRectangleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    UserIcon,
    UserCircleIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link, NavLink } from "@remix-run/react";
import { Menu, Transition } from "@headlessui/react";


export default function Account({ user, className }) {
    if (!user) {
        return (
            <Link to="/login" className={clsx("h-full flex flex-1 items-center mr-10 pl-4 hover:text-blue-500", className)}>
                <UserIcon className="h-6 w-6 mr-2" strokeWidth={2} />
                <p className="font-semibold">Войти</p>
            </Link>
        )
    }

    return (
        <Menu as='div' className={clsx("relative flex flex-row", className)}>
            <AccountUserCard />
            <Menu.Button as="div"
                className={({ open }) => clsx('flex items-center pr-10 pl-1 text-white cursor-pointer', { 'text-neutral-300': open })}
            >
                <ChevronDownIcon
                    className="w-4 h-4"
                    strokeWidth={3}
                />
            </Menu.Button >

            <AccountDropdownItems>
                <p className="px-2 text-sm font-semibold">Мой профиль</p>
                <AccountUserCard name={user.name} className={'px-1 py-2 rounded-md hover:bg-blue-600'} />
                <AccountDropdownItem key={1} path={`${user.url}/settings`}text="Настройки" icon={<Cog6ToothIcon className='w-5 h-5' />} />
                {user.role == "ADMIN"
                    && <AccountDropdownItem key={2} path="/admin" text="Управление" icon={<AdjustmentsHorizontalIcon className='w-5 h-5' />} />
                }
                <AccountDropdownItem key={2} path="/logout" text="Выйти" icon={<ArrowLeftOnRectangleIcon className='w-5 h-5' />} />
            </AccountDropdownItems>
        </Menu >
    );
}

function AccountUserCard({ name, team, className }) {
    return (
        <Link to="/u/me" className={clsx("flex flex-row items-center", className)}>
            <UserCircleIcon className="w-11 h-11" strokeWidth={1} />
            {name &&
                <div className="flex flex-col items-center ml-3">
                    {name && <p>{name}</p>}
                    {team && <p>{team}</p>}
                </div>
            }
        </Link>
    )
}

function AccountDropdownItems({ children }) {
    return (
        <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className={clsx(
                `absolute z-50 right-10 top-14 w-60 min-w-full rounded-lg focus:outline-none`,
                'bg-black',
                'border border-white border-opacity-25 shadow-2xl',
                "px-1 py-2"
            )}
            >
                <div className={clsx("grid grid-cols-1 gap-2")}>
                    {children}
                </div>
            </Menu.Items>
        </Transition>
    )
}

function AccountDropdownItem({ path, text, icon }) {
    return (
        <Menu.Item>
            <NavLink
                to={path}
                className={({ isActive }) => clsx('px-1 rounded-md hover:bg-blue-600', { 'bg-blue-600': isActive })}
            >
                <div className="h-9 px-2 flex flex-row items-center text-neutral-200">
                    {icon}
                    <div className="normal-case text-sm pl-3">
                        {text}
                    </div>
                </div>
            </NavLink>
        </Menu.Item>
    )
}