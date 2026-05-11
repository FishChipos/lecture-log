import {
    Outlet,
    useLoaderData,
    useNavigation,
    type LoaderFunctionArgs,
} from "react-router";

import { NavBar } from "~/components/nav-bar";
import { GlobalSpinner } from "~/components/global-spinner";
import { getSession } from "~/session";

export default function Layout() {
    const loaderData = useLoaderData();
    const userId = loaderData.userId;

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex flex-col h-full">
            <NavBar user={userId ? { userId } : null} />
            {isNavigating ? (
                <div className="flex grow justify-center items-center">
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
