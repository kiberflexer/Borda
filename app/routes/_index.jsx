import * as React from 'react';
import {useLoaderData} from '@remix-run/react';
import {json} from '@remix-run/node';
import moment from 'moment-timezone';

import authenticator from '~/utils/auth.server';
import prisma from '~/utils/prisma.server';

import {MakaraIcon} from '~/components/icons/MakaraIcon';
import CountdownTimer from '~/components/Timer';
import Error from '~/components/Error';

export async function action({request}) {
    return await authenticator.logout(request, {redirectTo: '/sign-in',})
}

export async function loader({request}) {
    let player = await authenticator.isAuthenticated(request)
    let event = await prisma.event.findUnique({where: {id: 1}})

    return json({player, event})
}

export default function IndexPage() {
    const {event} = useLoaderData()
    const eventTime = moment.tz(event.startDate, "Europe/Moscow").format('D MMM YYYY, HH:mm')

    return (
        <div>
            <img
                alt=''
                src="/images/icons.png"
                decoding="async"
                data-nimg="fill"
                className='mx-auto'
            />

            <div className='container mx-auto max-w-md'>
                <h1 className='pt-32 uppercase text-6xl font-bold text-center'>{event.name}</h1>
            </div>

            <div className=' ' style={{backgroundColor: "black"}}>
                <div className='py-32 container max-w-2xl mx-auto px-5'>
                    {/*<h1 className='mb-32 text-5xl font-bold text-center'>*/}
                    {/*    Предстоящие мероприятия*/}
                    {/*</h1>*/}
                    <div className='bg-blue-500 rounded-2xl max-w-lg mx-auto overflow-clip'>
                        <div className='px-6 pt-6'>
                            <p className='tracking-wide font-bold'>
                                {eventTime}
                            </p>
                            <h2 className='text-4xl font-semibold mt-4 uppercase'>
                                {event.name}
                            </h2>
                        </div>
                        <div className='p-10 grid place-items-center gap-10'>
                            <MakaraIcon className='w-64 h-64'/>
                        </div>
                        <div
                            style={{backgroundColor: "#274795"}}
                            className='p-6 flex items-center justify-center bg-opacity-50 backdrop-filter backdrop-blur-xl  backdrop-saturate-150'
                        >
                            <CountdownTimer time={event.startDate} className='text-center'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function ErrorBoundary({error}) {
    console.log({error})
    return (
        <Error
            code="500"
            text="К сожалению, страница, которую вы ищете, в данный момент не работает."
            error={error}
        />
    )
}