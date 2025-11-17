import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/publicLayout.tsx", [
        index("routes/home.tsx"),
        route("login", "routes/login.tsx"),
        route("signup", "routes/signup.tsx"),
    ]),
    layout("layouts/dashboardLayout.tsx", [
        route("dashboard", "routes/dashboard/dashboard.tsx"),
        route("dashboard/scenarios", "routes/dashboard/dashboard.scenarios.tsx"),
        route("dashboard/scenario-creator", "routes/dashboard/dashboard.scenario-creator.tsx"),
        route("dashboard/sessions", "routes/dashboard/dashboard.sessions.tsx"),
        route("dashboard/analytics", "routes/dashboard/dashboard.analytics.tsx"),
        route("dashboard/settings", "routes/dashboard/dashboard.settings.tsx"),
    ]),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;