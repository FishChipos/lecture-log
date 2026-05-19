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
    <div className="flex grow flex-col items-center justify-center gap-4">
      <div className="flex w-lg flex-col bg-yellow-400 px-4 py-3 text-xl font-bold text-neutral-800">
        Registration
      </div>
      <Form method="post" className="flex flex-col gap-4" viewTransition>
        <div className="flex w-lg flex-col gap-4 rounded-sm bg-white p-4 text-neutral-800">
          <div>Name</div>
          <TextField name="name" placeholder="Your Name" />
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
