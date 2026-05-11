import { redirect, type LoaderFunctionArgs } from "react-router";
import { commitSession, getSession } from "~/session";

export default function Logout() {
    return <></>;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("Cookie"));

    session.set("userId", null);

    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}
