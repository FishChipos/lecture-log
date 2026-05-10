import { Outlet, useNavigation } from "react-router";

import { NavBar } from "~/components/nav-bar";
import { GlobalSpinner } from "~/components/global-spinner";

export default function Layout() {
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex flex-col h-full">
            <NavBar />
            { 
                isNavigating 
                ? <div className="flex grow justify-center items-center">
                    <GlobalSpinner/>
                </div>
                : <Outlet />
            }
        </div>
    );
}
