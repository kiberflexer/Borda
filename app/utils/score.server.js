export default function score(solves, points) {

    if ((solves > 1) && (points - points * 0.1 * (solves - 1)) > 0.5 * points) {
        points = points - points * 0.1 * (solves - 1)
    } else if ((solves > 1) && (points - points * 0.1 * (solves - 1)) < 0.5 * points) {
        points = points * 0.5
    } else {
        points = points
    }

    return points
}

function calculatePoints(solves) {
    //round(1000 × min(1, 10 / (9 + solves))),
    return Math.round(1000 * Math.min(1, 10 / (9 + solves)))
}

export { calculatePoints }