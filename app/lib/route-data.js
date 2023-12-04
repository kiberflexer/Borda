import {useMatches} from "@remix-run/react";

export const useRouteData = (routeId) => {
    const matches = useMatches();
    const data = matches.find((match) => match.id === routeId)?.data;

    return data;
};