import * as React from 'react'

function Video({ className, src, ...props }) {
    return (
        <video
            className={className}
            autoPlay
            src={src}
            muted
            loop
            controls={false}
            {...props}
        />
    )
}

export default Video