import {
    Form,
    redirect,
    type ActionFunctionArgs,
    useNavigation,
} from "react-router";
import { TextField } from "~/components/text-field";
import { Button } from "~/components/button";

export default function Register() {
    const navigation = useNavigation();

    return (
        <div className="flex flex-col gap-4 grow justify-center items-center">
            <div className="flex flex-col w-lg px-4 py-3 bg-yellow-400 text-neutral-800 font-bold text-xl">
                Registration
            </div>
            <Form method="post" className="flex flex-col gap-4">
                <div className="flex flex-col w-lg p-4 gap-4 bg-white text-neutral-800 rounded-sm">
                    <div>Name</div>
                    <TextField name="name" placeholder="Your Name" />
                    <div>Email</div>
                    <TextField name="email" placeholder="yours@email.com" />
                    <div>Password</div>
                    <TextField
                        name="password"
                        placeholder="verySecurePassword123!!"
                    />
                </div>
                <div className="flex flex-col w-lg p-4 gap-4 bg-white text-neutral-800 rounded-sm">
                    <Button
                        type="submit"
                        className="w-fit self-end bg-yellow-400 text-neutral-800 hover:bg-yellow-500"
                    >
                        {navigation.formAction === "/auth/register"
                            ? "Submitting..."
                            : "Submit"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    console.log(`Got email ${email} and password ${password}`);

    return redirect("/auth/login");
}
