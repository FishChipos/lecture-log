import type { Route } from "./+types/dashboard";

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const isRentingCar = loaderData.isRentingCar;
    const user = loaderData.user;

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="text-2xl font-bold">Hello, {user.name}!</div>
            {isRentingCar ? (
                <div>You have rented a car.</div>
            ) : (
                <div>You are not renting a car right now.</div>
            )} 
        </div>
    );
}

export async function loader() {
    return {
        isRentingCar: false,
        user: {
            name: "Test",
        },
    };
}
