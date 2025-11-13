import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/publicLayout.tsx", [
        index("routes/home.tsx"),
        route("login", "routes/login.tsx"),
        route("signup", "routes/signup.tsx"),
    ]),
    route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;