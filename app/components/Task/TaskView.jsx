import { Link, useSearchParams } from '@remix-run/react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import { ArrowTopRightOnSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'

import TaskSolutions from './TaskSolutions'
import TaskFlagInput from "./TaskFlagInput"
import Colors from './TaskColors'


function TaskView({ task }) {
    const tags = task.labels?.split('-')
    const icon = Array.from(task.category)[0];
    const color = Colors.get(task.category)
    const [searchParams] = useSearchParams()
    return (
        <div className='p-5 w-full grid  gap-5 self-center'>
            <Link
                to={`..?${searchParams}`}
                replace
                className='place-self-end'
            >
                <XCircleIcon className='w-6 h-6' />
            </Link>
            <div className=" h-10 w-full flex flex-row items-center">
                <div className={clsx(
                    'flex-none h-10 w-10 font-semibold text-2xl text-white capitalize grid place-items-center',
                    'bg-gradient-to-tl rounded-sm', color)}
                >
                    {icon}
                </div>
                <p className="grow self-start px-3 font-medium truncate">{task.name}</p>
                <div className="flex-none h-10 font-medium text-2xl ">
                    {task.points}
                </div>
            </div>
            <div className='text-sm whitespace-nowrap'>
                by <Link to={`/users/${task.author.id}`} className='underline'>{task.author.displayName}</Link>
            </div>
            {tags
                ? (
                    <div className='flex flex-row'>
                        {tags.map((tag, idx) => (
                            <div className='px-2 py-px first:m-0 ml-4 rounded-lg text-white text-xs align-middle' key={idx}>{tag}</div>
                        ))}
                    </div>
                ) : null
            }
            <ReactMarkdown
                className=''
                children={task.content}
                components={{
                    ul: function ({ children, ...props }) {
                        return <ul className="list-disc list-inside" {...props}>{children}</ul>
                    },
                    li: function ({ children, ...props }) {
                        return <li className="ml-3" {...props}>{children}</li>
                    },
                    p: function ({ className, ...props }) {
                        return <p className='py-2' {...props}></p>
                    },
                    a: function ({ href, children, ...otherProps }) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                className='text-rose-600 font-bold hover:cursor-pointer inline-flex items-center'
                                {...otherProps}
                            >
                                <p className=''>{children}</p>
                                <div className='px-1'>
                                    <ArrowTopRightOnSquareIcon className=' w-4 h-4' />
                                </div>
                            </a>
                        )
                    },
                }}
            />
            <TaskFlagInput disabled={task.solved} className='' />
            {task.solutions.length > 0
                ? <TaskSolutions solutions={task.solutions} className='' />
                : null
            }
        </div>
    )
}

export default TaskView