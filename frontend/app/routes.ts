import {
  type RouteConfig,
  index,
  route,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("auth", [
      route("login", "routes/auth/login.tsx"),
      route("logout", "routes/auth/logout.tsx"),
      route("register", "routes/auth/register.tsx"),
    ]),
    ...prefix("about", [index("routes/about/about.tsx")]),
    ...prefix("dashboard", [
      layout("routes/dashboard/layout.tsx", [
        index("routes/dashboard/dashboard.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
