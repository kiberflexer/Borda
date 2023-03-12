import * as React from 'react'
import errorStack from "error-stack-parser";

import Video from './Video'
import Layout from './Layout';

export default function Error({ error, code, text }) {
    const number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    // const number = 2
    return (
        <Layout>
            <div className="flex items-center" style={{ height: "calc(100vh - 64px)" }}>
                <div className=''>
                    <div className='flex flex-wrap md:flex-nowrap items-center justify-center text-center md:text-left text-neutral-100'>
                        <Video src={`/images/hacker-${number}.mp4`} className="w-44 float-left rounded-md mb-5 md:mb-0 md:mr-5" />

                        <div className=''>
                            <h1 className='pb-4 text-3xl font-bold'>
                                Ошибка {code}
                            </h1>
                            <p className='text-lg'>{text}</p>
                        </div>
                    </div>
                    {error && process.env.NODE_ENV === 'development'
                        ? <RedBox error={error} />
                        : null
                    }
                </div>
            </div>
        </Layout>
    )
}

function RedBox({ error }) {
    const frames = errorStack.parse(error)
    return (
        <div className="border-lg relative mx-5vw my-16 max-h-48 w-full max-w-md overflow-scroll rounded-lg bg-red-600 p-12">
            <h2>{error.message}</h2>
            <div>
                {frames.map(frame => (
                    <div
                        key={[frame.fileName, frame.lineNumber, frame.columnNumber].join(
                            '-',
                        )}
                        className="pt-4"
                    >
                        <h6 as="div" className="pt-2">
                            {frame.functionName}
                        </h6>
                        <div className="font-mono opacity-75">
                            {frame.fileName}:{frame.lineNumber}:{frame.columnNumber}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}