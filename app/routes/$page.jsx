import { 
    Outlet, 
    useRouteError,  
    useLoaderData, 
    isRouteErrorResponse,
 } from "@remix-run/react";
import { json } from "@remix-run/node";
import { z } from "zod";

import prisma from '~/utils/prisma.server'

import SectionInfo from "~/components/SectionInfo";
import Layout from "~/components/Layout";
import Error from "~/components/Error"

export async function loader({ params }) {
    const page = params.page
    const shema = z.enum(["web", "crypto", "reverse", "osint", "forensics", "misc"])

    const result = await shema.safeParseAsync(page)

    if (!result.success) {
        throw new Response(`Page ${page} not found`, {
            status: 404,
        });
    }

    const category = await prisma.category.findUnique({
        where: {
            name: result.data
        }
    })

    return json({ category })
}

export default function PageRoot() {
    const { category } = useLoaderData();
    return (
        <Layout>
            <div className="grid gap-8">
                <SectionInfo section={category} />
                <Outlet />
            </div>
        </Layout>
    )
}

export async function shouldRevalidate({
    currentParams,
    nextParams,
    defaultShouldRevalidate,
}) {
    const currentPage = currentParams.page;
    const nextPage = nextParams.page;

    if (currentPage !== nextPage) {
        return true;
    }

    return defaultShouldRevalidate;
}

export function ErrorBoundary() {
    const error = useRouteError();

    let message = ""
    if (error.status === 404) {
        message="К сожалению, страница, которую вы ищете, не найдена."
    } else{
        message = "К сожалению, страница, которую вы ищете, в данный момент не работает."
    }

    return (
        <Error
            code={error.status}
            text={message}
            error={error}
        />
    )
}