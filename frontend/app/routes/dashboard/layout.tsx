import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { getSession } from "~/session";
import type { Route } from "./+types/layout";

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

async function authMiddleware({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/auth/login");
  }
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];
