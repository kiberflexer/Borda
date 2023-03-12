import { Link } from '@remix-run/react'
import * as React from 'react'

function Copyright({ author, full }) {
    var now = new Date()
    var year = now.getFullYear()

    if (full) {
        return (
            <div className='text-white/70 text-center text-sm'>
                Copyright <span>&#169;</span> {year} {author}. All rights reserved.
            </div>
        )

    }

    return (
        <div className='text-neutral-100 text-sm'>
            <span>&#169;</span> 
            <span className='mx-1'>{year} </span>
            <span>{author}.</span>
        </div>
    )
}

export default Copyright