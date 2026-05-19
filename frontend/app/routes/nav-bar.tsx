import { Link, useLocation, useNavigation } from "react-router";
import type { User } from "~/types";
import { Button } from "~/components/button";

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
      className={`flex h-full items-center justify-center bg-yellow-400 p-4 font-semibold text-neutral-800 transition hover:bg-yellow-500 hover:text-white ${active ? "bg-yellow-500 text-white" : ""} ${className ?? ""} ${active ? (activeClassName ?? "") : ""}`}
      viewTransition
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
    <Link to={to} viewTransition>
      <Button className={className}>{children}</Button>
    </Link>
  );
}

export function NavBar({ user }: { user: User | null }) {
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
        <div className="m-4 flex cursor-pointer items-center gap-4">
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
          ) : (
            ""
          )}
        </div>
        <div className="m-4 flex items-center justify-center gap-4 text-2xl font-bold">
          Lecture Log
        </div>
        <div className="m-4 flex flex-row-reverse items-center gap-4">
          {user ? (
            <NavBarLinkButton
              to="auth/logout"
              className="border-2 border-transparent text-red-500 hover:border-red-500"
            >
              {navigation.formAction === "/auth/logout"
                ? "Logging out..."
                : "Log out"}
            </NavBarLinkButton>
          ) : (
            <>
              <NavBarLinkButton
                to="auth/register"
                className="bg-yellow-400 outline-yellow-400 hover:bg-yellow-500 hover:text-white hover:outline-yellow-500"
              >
                Register
              </NavBarLinkButton>
              <NavBarLinkButton
                to="auth/login"
                className="border-2 border-transparent bg-white hover:border-neutral-800 hover:bg-transparent"
              >
                Log in
              </NavBarLinkButton>
            </>
          )}
        </div>
      </div>
      <div className="sticky top-0 flex w-full flex-col">
        <div className="flex h-8 w-full bg-yellow-400">
          {navBarLinkData.map((data, index) => (
            <NavBarLink
              key={index}
              href={data.url}
              active={location.pathname == data.url}
            >
              {data.text}
            </NavBarLink>
          ))}
        </div>
        <div className="h-1 w-full bg-yellow-500"></div>
      </div>
    </>
  );
}
