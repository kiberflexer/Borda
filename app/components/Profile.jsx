import { Link } from "@remix-run/react"
import moment from "moment-timezone"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function Profile({ user }) {
    const icon = user.name.charAt(0)

    const date = moment(user.createdAt).format("Do MMMM  YYYY")
    return (
        <div>
            <div className=" flex flex-row justify-between items-center">
                <div className="w-24 h-24  rounded-md bg-white grid grid-cols-1 place-items-center">
                    <p className="text-6xl text-black">{icon}</p>
                </div>
                {user.privateProfile &&(
                    <Link to="settings/profile" className="p-5">
                        <Cog6ToothIcon className='w-5 h-5 hover:text-neutral-200' />
                    </Link>
                )}
            </div>
            <h1 className="mt-5 mr-4 text-4xl font-bold">{user.name}</h1>
            <p className="mt-5 font-light tracking-wider">На платформе с {date}</p>
        </div>
    )
}