import moment from 'moment'
import clsx from 'clsx'
import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function TaskSolutions({ solutions, className }) {
    let sortedSolutions = solutions.sort(function (a, b) {
        return b.createdAt.localeCompare(a.createdAt)
    })

    return (
        <div className={clsx('relative overflow-x-auto mb-8 mx-5 pt-5 ', className)}>
            <table className='w-full table-auto'>
                <tbody>
                    {sortedSolutions.map((solution) => (
                        <tr key={solution.id} className='h-10 whitespace-nowrap'>
                            <td>{moment().from(solution.createdAt, Boolean)} ago</td>
                            <td className='px-3'>{solution.user.name}</td>
                            <td className='px-3'>{solution.flag}</td>
                            <td className=''>
                                {
                                    solution.isCorrect
                                        ? <CheckIcon strokeWidth={2} className='h-4 w-4 font-bold text-green-500' />
                                        : <XCircleIcon strokeWidth={2} className='h-4 w-4 font-bold text-red-500' />
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}