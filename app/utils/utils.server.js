import CyrillicToTranslit from "cyrillic-to-translit-js";

import prisma from "~/utils/prisma.server";

const cyrillicToTranslit = new CyrillicToTranslit();

export async function validateAction({ request, schema }) {
    const body = Object.fromEntries(await request.formData());
    console.log({ body })

    try {
        schema.parse(body);


        return { formData: body, errors: null }

    } catch (e) {
        console.log(e)

        return {
            formData: body,
            errors: e.issues.reduce((acc, curr) => {
                const key = curr.path[0];

                acc[key] = curr.message;

                return acc
            }, {}),
        };
    }

}

export function transformToTranslit(str) {
    // Remove all special characters then remove duplicated white space
    const s = str
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
        .replace(/\s+/g, " ")

    return cyrillicToTranslit.transform(s, '-').toLowerCase();
}

export async function isEventStarted() {
    const event = await prisma.event.findFirst({
        where: {
            id: 1
        },
    });

    const now = Date.now()
    const eventStart = Date.parse(event.startDate)

    // console.log({now, eventStart})

    if (now > eventStart) {
        return true
    }

    return false
}

export function isSubmissionAvailable() {
    const event = prisma.event.findFirst({
        where: {
            id: 1
        },
    });

    const now = Date.now()

    if (now > event.startDate && now < event.Endate) {
        return true
    }

    return false
}