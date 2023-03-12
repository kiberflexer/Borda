import * as React from 'react'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import { Bar } from 'react-chartjs-2';

import prisma from '~/utils/prisma.server'
import { calculatePoints } from '~/utils/score.server'

import Layout from '~/components/Layout';
import Error from "~/components/Error";

export const meta = () => ({
    title: 'SCOREBOARD | CTFBOARD',
});

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export async function loader() {
    try {
        let teams = await prisma.team.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        const tasks = await prisma.task.findMany({
            select: {
                id: true,
            }
        })

        const taskPoints = await tasks.reduce(async function (result, task) {
            let solves = await prisma.solution.count({
                where: {
                    taskId: task.id,
                    isCorrect: true,
                }
            })
            return { ...await result, [task.id]: calculatePoints(solves) }
        }, {})

        const event = await prisma.event.findUnique({ where: { id: 1 } })

        await Promise.all(
            teams.map(async function (team) {
                let score = 0

                let teamCorrectSolutions = await prisma.solution.findMany({
                    where: {
                        teamId: team.id,
                        isCorrect: true,
                        createdAt:{
                            lte: new Date(event.endDate)
                        }
                    }
                });

                teamCorrectSolutions.forEach(function (solution) {
                    console.log(solution.taskId)
                    score += taskPoints[solution.taskId]
                })

                return Object.assign(team, { score: score })
            })
        )

        teams.sort(function (a, b) {
            return b.score - a.score;
        })

        const top5Teams = teams.slice(0, 5)

        const labels = top5Teams.map(function (team) {
            return team.name
        })

        const data = top5Teams.map(function (team) {
            return team.score
        })

        return json({
            teams,
            graph: {
                data: data,
                labels: labels
            }
        })
    } catch (err) {
        console.log(err)
        throw err
    }
}

// const data = {
//     datasets: [
//         {
//             label: 'Team 1',
//             data: [
//                 { "x": new Date('2023-04-03T10:00:00'), "y": 50 },
//                 { "x": new Date('2023-04-03T12:00:00'), "y": 1000 },
//                 { "x": new Date('2023-04-03T13:00:00'), "y": 909 },
//                 { "x": new Date('2023-04-03T14:00:00'), "y": 1200 },
//                 { "x": new Date('2023-04-03T15:00:00'), "y": 1500 },
//             ],
//             borderColor: 'rgb(255, 99, 132)',
//             backgroundColor: 'rgb(255, 99, 132)',
//         },
//     ],
// };

// export const options = {
//     scales: {
//         x: {
//             type: "time",
//             time: {
//                 unit: 'minute'
//             },
//         },
//         y: {
//             beginAtZero: true,
//         },
//     },
// };

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'right',
        },
        title: {
            display: true,
            text: 'Top 5 teams score',
        },
    },
};


export default function ScoreboardPage() {
    let { teams, graph } = useLoaderData();

    const data = {
        labels: graph.labels,
        datasets: [
            {
                axis: 'y',
                data: graph.data,
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
            },
        ],
    };

    return (
        <Layout className="mt-14">
            {/* <Line
                options={options}
                data={data}
            /> */}
            <Bar options={options} data={data} />

            <div className='my-14 px-5 w-full bg-neutral-900 rounded-xl'>
                <div className='py-5 relative overflow-x-auto'>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className='h-12 whitespace-nowrap font-bold '>
                                <td className="px-3" >Место</td>
                                <td className="px-3">Команда</td>
                                <td className="px-3 text-center">Очки</td>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => (
                                <tr key={team.id} className='h-12 whitespace-nowrap border-t  border-white/30'>
                                    <td className="px-3 font-bold">
                                        {index + 1}
                                    </td>
                                    <td className="px-3">
                                        {team.name}
                                    </td>
                                    <td className="px-3 text-center">
                                        {team.score}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export function ErrorBoundary({ error }) {
    console.log({ error })
    return (
        <Error
            code="500"
            text="К сожалению, страница, которую вы ищете, в данный момент не работает."
            error={error}
        />
    )
}