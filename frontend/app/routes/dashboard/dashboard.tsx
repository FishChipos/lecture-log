import type { Route } from "./+types/dashboard";

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const user = loaderData.user;

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="text-2xl font-bold">Hello, {user.name}!</div>
            <div>
                Your classes
            </div>
        </div>
    );
}

export async function loader() {
    return {
        user: {
            name: "Test",
        },
    };
}
