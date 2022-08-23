import { Link, useParams } from "@remix-run/react"
import clsx from 'clsx'

export default function Cards() {
    return (
        <div className='grid grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense'>
            {/* <div className='bg-red-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-orange-500 rounded-lg shadow-xl min-h-[50px] col-span-3' />
            <div className='bg-yellow-500 rounded-lg shadow-xl min-h-[50px] row-span-2 col-span-2' />
            <div className='bg-green-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-teal-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-blue-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-indigo-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-purple-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-pink-500 rounded-lg shadow-xl min-h-[50px]' />
            <div className='bg-slate-500 rounded-lg shadow-xl min-h-[50px]' /> */}
            <CardItem color={'bg-red-500'} id={"1"} />
            <CardItem color={'bg-orange-500'} id={"2"} />
            <CardItem color={'bg-yellow-500'} id={"3"} />
            <CardItem color={'bg-green-500'} id={"4"} />
            <CardItem color={'bg-teal-500'} id={"5"} />
            <CardItem color={'bg-blue-500'} id={"6"} />
            <CardItem color={'bg-indigo-500'} id={"7"} />
            <CardItem color={'bg-purple-500'} id={"8"} />
            <CardItem color={'bg-pink-500'} id={"9"} />
            <CardItem color={'bg-slate-500'} id={"10"} />
        </div>
    )
}

function CardItem({ color, id }) {
    let { name } = useParams()
    console.log(name, id)

    return (
        <Link
            to={`/cards/${id}`}
            // className={}
            className={clsx(
                `${color}`,
                "rounded-lg shadow-xl min-h-[50px]",
                `${name === id ? "col-span-2 row-span-2" : ""}`
            )}
        >
            <div  >
                {name === id ? name : null}
            </div>
        </Link>
    )
}