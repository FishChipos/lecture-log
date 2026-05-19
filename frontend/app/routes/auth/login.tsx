import {
  Form,
  redirect,
  type ActionFunctionArgs,
  useNavigation,
  type LoaderFunctionArgs,
} from "react-router";
import { TextField } from "~/components/text-field";
import { Button } from "~/components/button";
import { commitSession, getSession } from "~/session";

export default function Login() {
  const navigation = useNavigation();

  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <div className="flex w-lg flex-col gap-4 bg-yellow-400 px-4 py-3 text-xl font-bold text-neutral-800">
        Login
      </div>
      <Form method="post" className="flex flex-col gap-4" viewTransition>
        <div className="flex w-lg flex-col gap-4 rounded-sm bg-white p-4 text-neutral-800">
          <div>Email</div>
          <TextField name="email" placeholder="yours@email.com" />
          <div>Password</div>
          <TextField name="password" placeholder="verySecurePassword123!!" />
        </div>
        <div className="flex w-lg flex-col gap-4 rounded-sm bg-white p-4 text-neutral-800">
          <Button
            type="submit"
            className="w-fit self-end bg-yellow-400 text-neutral-800 hover:bg-yellow-500 hover:text-white"
          >
            {navigation.formAction === "/auth/login"
              ? "Submitting..."
              : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  console.log(`Got email ${email} and password ${password}`);

  const session = await getSession(request.headers.get("Cookie"));

  session.set("userId", "1");

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
