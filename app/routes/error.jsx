import * as React from 'react'
import { Link } from "@remix-run/react";

export default function Erorr({ status = "404" }) {
    return (
        <div>
            {status == 404 ?
                <>
                    <div className="flex justify-center">
                        <img src="https://media.giphy.com/avatars/404academy/kGwR3uDrUKPI.gif" />
                    </div>
                    <div className="flex justify-center">
                    <Link to="/" className="text-4xl animate-pulse font-bold animate-bounce hover:text-blue-800">- Go home -</Link>
                    </div>
                </>
                : ""}

            {status == 405 ? "Пока пусто" : ""}
            {status == 500 ? "Пока пусто" : ""}
        </div>
    )
}