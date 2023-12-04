import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function points(solves) {
    //round(1000 × min(1, 10 / (9 + solves))),
    return Math.round(1000 * Math.min(1, 10 / (9 + solves)))
}