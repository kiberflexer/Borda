import prisma from "~/utils/prisma.server";

export async function getCTF() {
    return prisma.event.findUnique({where: {id: 1}});
}