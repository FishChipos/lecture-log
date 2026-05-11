import { Link, useLocation, useNavigation } from "react-router";
import type { User } from "~/types";

function NavBarLink({
    children,
    href,
    className,
    activeClassName,
    active,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
    activeClassName?: string;
    active: boolean;
}) {
    return (
        <Link
            to={href}
            className={`flex h-full p-4 justify-center items-center transition bg-yellow-400 text-neutral-800 hover:bg-yellow-500 hover:underline ${active ? "bg-yellow-500" : ""} ${className ?? ""} ${active ? (activeClassName ?? "") : ""}`}
        >
            {children}
        </Link>
    );
}

function NavBarLinkButton({
    children,
    to,
    className,
}: {
    children: React.ReactNode;
    to: string;
    className?: string;
}) {
    return (
        <Link
            to={to}
            className={`h-fit px-4 py-2 cursor-pointer transition rounded-sm ${className ? className : ""}`}
        >
            {children}
        </Link>
    );
}

export function NavBar({ user }: { 
    user: User | null; 
}) {
    const navigation = useNavigation();
    const location = useLocation();

    const navBarLinkData = [
        { url: "/", text: "Home" },
        { url: "/dashboard", text: "Dashboard" },
        { url: "/about", text: "About" },
    ];

    return (
        <>
            <div className="grid grid-cols-3">
                <div className="flex gap-4 p-4 items-center">
                    {user ? (
                        <>
                            <img
                                width="340"
                                height="340"
                                src="/default-pfp.jpg"
                                className="size-10 rounded-[50%]"
                            />
                            This guy's name
                        </>
                    ) : ""}
                </div>
                <div className="flex gap-4 p-4 justify-center items-center font-bold text-2xl">
                    Lecture Log
                </div>
                <div className="flex flex-row-reverse gap-4 p-4 items-center">
                    {user ? (
                        <NavBarLinkButton
                            to="auth/logout"
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {navigation.formAction === "/auth/logout"
                                ? "Logging out..."
                                : "Log out"}
                        </NavBarLinkButton>
                    ) : (
                        <>
                            <NavBarLinkButton
                                to="auth/register"
                                className="bg-yellow-400 outline-2 outline-yellow-400 text-neutral-800 hover:bg-yellow-500"
                            >
                                Register
                            </NavBarLinkButton>
                            <NavBarLinkButton
                                to="auth/login"
                                className="outline-2 outline-transparent text-neutral-800 hover:outline-neutral-800"
                            >
                                Log in
                            </NavBarLinkButton>
                        </>
                    )}
                </div>
            </div>
            <div className="sticky top-0 flex flex-col w-full">
                <div className="flex w-full h-8 bg-yellow-400">
                    {navBarLinkData.map((data, index) => (
                        <NavBarLink key={index} href={data.url} active={location.pathname == data.url}>
                            {data.text}
                        </NavBarLink>
                    ))}
                </div>
                <div className="w-full h-1 bg-yellow-500"></div>
            </div>
        </>
    );
}
