import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { ZodError } from "zod";
import { userDataFormSchema } from "~/validation/user-data-form";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { commitSession, getSession } from "~/services/session.server";

export default function UserDetailsForm() {
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();
  const { userData } = useLoaderData<typeof loader>();

  const isSubmitting = transition.state !== "idle";
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="flex flex-col items-center w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-6">Enter Your Details</h2>
        <Form method="post" className="space-y-6 w-full">
          <div>
            <Label htmlFor="userName">Name</Label>
            <Input
              id="userName"
              name="userName"
              type="text"
              placeholder="John Doe"
              className="mt-2"
              defaultValue={userData?.userName}
            />
            {actionData?.errors?.userName && (
              <p className="text-red-500 text-sm pt-2">
                {actionData.errors.userName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="userPhone">Phone</Label>
            <Input
              id="userPhone"
              name="userPhone"
              type="tel"
              placeholder="+1234567890"
              className="mt-2"
              defaultValue={userData?.userPhone}
            />
            {actionData?.errors?.userPhone && (
              <p className="text-red-500 text-sm pt-2">
                {actionData.errors.userPhone}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="userEmail">Email</Label>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="you@example.com"
              className="mt-2"
              defaultValue={userData?.userEmail}
            />
            {actionData?.errors?.userEmail && (
              <p className="text-red-500 text-sm pt-2">
                {actionData.errors.userEmail}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                <Link to="/app/apartment-pick" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Link>
              )}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userData = session.get("userData");

  return json({ userData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userName = formData.get("userName");
  const userEmail = formData.get("userEmail");
  const userPhone = formData.get("userPhone");
  const errors: Record<string, string> = {};

  try {
    userDataFormSchema.parse({ userName, userPhone, userEmail });
    const session = await getSession(request.headers.get("Cookie"));
    session.set("userData", { userName, userPhone, userEmail });

    return redirect("/app/confirm", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        if (err.path.length) {
          errors[err.path[0]] = err.message;
        }
      });
    }
    return json({ errors });
  }
};
