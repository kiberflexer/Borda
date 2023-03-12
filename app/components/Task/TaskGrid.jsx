import * as React from "react";
import clsx from 'clsx'
import {
    Link,
    useLocation,
    useSearchParams,
    useParams
} from '@remix-run/react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/solid'

import TaskCard from "./TaskCard";

function TaskGrid({ tasks, children, className }) {
    // const [scroll, setScroll] = React.useState(0)
    // const ref = React.useRef(null)

    // // const getscroll = () => {
    // //     setScroll(Math.abs(ref.current.getBoundingClientRect().top - ref.current.offsetTop));
    // //     console.log(scroll);
    // // };

    // React.useEffect(() => {
    //     // setHeight(ref.current.clientHeight)

    //     // ref.current.scrollTop = 100
    //     console.log(ref.current.offsetTop)
    // }, [])
    let [searchParams] = useSearchParams();
    let sortProp = searchParams.get("sort");

    let sortedTasks = tasks.sort(function (a, b) {
        return a[sortProp]?.toString().localeCompare(b[sortProp], undefined, { 'numeric': true });
    });

    let { taskId } = useParams();

    return (
        <div className={clsx('sticky h-full flex-grow', className)}>
            <div className="h-screen w-full overflow-y-auto overflow-x-hidden flex flex-col">
                <div className="h-full pt-14 pb-5">
                    <div className="px-5 pt-5 flex justify-between items-center">
                        <SortTasksButton />
                    </div>
                    <div className='p-5 grid grid-auto-fit-md gap-5'>
                        {sortedTasks.map((task) => (
                            <TaskCard
                                task={task}
                                key={task.id}
                                link={`./${taskId === task.id ? '' : task.id}?${searchParams}`}
                                isFocused={taskId === task.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SortTasksButton() {
    const sortOptions = ['category', 'name', 'points']
    let [searchParams] = useSearchParams();
    let sortProp = searchParams.get("sort");
    let location = useLocation();
    let url = location.pathname
    return (
        <div className='z-10 flex felx-row'>
            <Listbox as={'div'} className={'w-24 relative'} value={sortProp}>
                <Listbox.Button className="h-8 relative flex flex-row justify-between items-center border rounded-md border-white border-opacity-25">
                    <div className="px-3 text-sm capitalize">{sortProp ? sortProp : 'sort'}</div>
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-neutral-300"
                        aria-hidden="true"
                    />
                </Listbox.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Listbox.Options className={clsx(
                        'absolute w-60 min-w-full',
                        'flex flex-col p-2 mt-3',
                        'bg-black text-white',
                        'backdrop-blur-xl backdrop-filter',
                        'rounded-lg border border-white border-opacity-25',
                    )}>

                        {sortOptions.map((option) => (
                            <Listbox.Option
                                key={option}
                                value={option}
                                className='rounded-md hover:bg-blue-600'
                            >
                                {({ active, selected }) => (
                                    <Link
                                        to={`${url}?sort=${option}`}
                                        replace
                                        className='h-9 px-2 flex flex-row justify-between items-center text-neutral-200'
                                    >
                                        <p className='text-sm capitalize'>{option}</p>
                                        {selected && <CheckIcon className='h-4 w-4' strokeWidth={1} />}
                                    </Link>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    )
}

export default TaskGrid