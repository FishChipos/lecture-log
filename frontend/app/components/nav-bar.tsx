import type { MouseEventHandler } from "react";
import { Link, useNavigation } from "react-router";

function NavBarLink({ children, href, className }: {
    children: React.ReactNode;
    href: string;
    className?: string;
}) {
    return (
        <Link 
            to={href} 
            className={`flex h-full p-4 justify-center items-center transition bg-yellow-400 text-neutral-800 hover:bg-yellow-500 hover:underline focus:underline ${className ? className : ""}`}
        >
            {children}
        </Link>
    );
}

function NavBarLinkButton({ children, to, className }: {
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
    user?: string;
}) {
    const navigation = useNavigation();

    const navBarLinkData = [
        { url: "/", text: "Home" },
        { url: "/about", text: "About" },
    ];

    return (
        <>
            <div className="grid grid-cols-3">
                <div className="flex gap-4 p-4 items-center">
                    <img 
                        width="340"
                        height="340"
                        src="/default-pfp.jpg"
                        className="size-10 rounded-[50%]"
                    />
                    This guy's name
                </div>
                <div className="flex gap-4 p-4 justify-center items-center font-bold text-2xl">
                    Lecture Log
                </div>
                <div className="flex flex-row-reverse gap-4 p-4 items-center">
                    {
                        user 
                        ? <NavBarLinkButton 
                            to="auth/logout"
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {
                                navigation.formAction === "/auth/logout"
                                ? "Logging out..."
                                : "Log out"
                            }
                        </NavBarLinkButton>
                        : <>
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
                    }
                </div>
            </div>
            <div className="sticky top-0 flex w-full h-8 bg-yellow-400">
                {
                    navBarLinkData.map((data, index) => (
                        <NavBarLink 
                            key={index} 
                            href={data.url}
                        >
                            {data.text}
                        </NavBarLink>
                    ))
                }
            </div>
        </>
    );
}
