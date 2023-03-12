/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
    future: {
        v2_routeConvention: true,
    },
    serverDependenciesToBundle: ["chartjs-adapter-date-fns"],
    // ignoredRouteFiles: [".*"],
    // serverModuleFormat: "esm",
};
