import {
  Outlet,
  useLoaderData,
  useNavigation,
  type LoaderFunctionArgs,
} from "react-router";

import { GlobalSpinner } from "~/components/global-spinner";
import { getSession } from "~/session";

import { NavBar } from "./nav-bar";

export default function Layout() {
  const loaderData = useLoaderData();
  const userId = loaderData.userId;

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <div className="flex h-full flex-col">
      <NavBar user={userId ? { userId } : null} />
      {isNavigating ? (
        <div className="flex grow items-center justify-center">
          <GlobalSpinner />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return {
    userId: session.get("userId"),
  };
}
