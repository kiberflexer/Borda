import * as React from 'react'
import { Link, useLoaderData } from "@remix-run/react";
import Typist from 'react-typist';
import { MakaraIcon } from '~/components/icons/MakaraIcon';
import authenticator from '~/utils/auth.server';

export const loader = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login"
    });
};

export default function IndexPage() {
    const data = useLoaderData();
    console.log(data)

    const [isTypingDone, setTypingDone] = React.useState(0);

    return (
        <div className='flex justify-center items-center h-screen bg-black p-64' >
            <div className='absolute top-12 left-28 z-0 scale-100z' width="500" height="500">
                <MakaraIcon />
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='z-50 text-white text-9xl font-bold uppercase'>
                    {isTypingDone ? "" : (
                        <Typist avgTypingDelay={100} cursor={{ blink: true, }} onTypingDone={() => setTypingDone(1)}>
                            <span>adm</span><br />
                            <Typist.Delay ms={100} />

                            <span>makarov</span><br />
                            <Typist.Delay ms={1000} />

                            <span>stf </span>
                            <Typist.Backspace count={4} delay={1000} />

                            <span> ctf </span>
                            <Typist.Delay ms={100} />

                            <span>2022!</span>
                            <Typist.Delay ms={1000} />
                        </Typist>
                    )}
                </h1>
                <div className='my-16'>
                    <Link to="/play"
                        className='px-5 py-2.5 text-black bg-white focus:ring-4 focus:outline-none focus:ring-grey font-medium rounded-lg text-sm text-center'
                    >
                        <span>Play</span>
                    </Link>
                    <Link to="/about"
                        className='px-5 py-2.5 ml-10 text-white underline focus:ring-4 focus:outline-none focus:ring-grey font-medium rounded-lg text-sm text-center'
                    >
                        <span>Learn more</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}