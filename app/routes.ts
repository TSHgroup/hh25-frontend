import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/publicLayout.tsx", [
        index("routes/home.tsx"),
        route("login", "routes/login.tsx"),
        route("signup", "routes/signup.tsx"),
        route("*","routes/not-found.tsx"),
        route("tos", "routes/tos.tsx"),
        route("team", "routes/team.tsx"),
        route("scenarios", "routes/scenarios.tsx"),
    ]),
    route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;