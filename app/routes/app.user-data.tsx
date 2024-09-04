import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { ZodError } from "zod";
import { userDataFormSchema } from "~/validation/user-data-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { commitSession, getSession } from "~/services/session.server";

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userDetails = session.get("userData");

  return json({ userDetails });
};

export const action = async ({ request }: { request: Request }) => {
  const formData = new URLSearchParams(await request.text());
  const data = Object.fromEntries(formData);
  const errors: Record<string, string> = {};

  try {
    userDataFormSchema.parse(data);
    const session = await getSession(request.headers.get("Cookie"));
    session.set("userData", data);

    return redirect("/app/confirm", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
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

export default function UserDetailsForm() {
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();
  const {userDetails} = useLoaderData<typeof loader>()

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
              value={userDetails.userName}
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
              value={userDetails.userPhone}
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
              value={userDetails.userEmail}
            />
            {actionData?.errors?.userEmail && (
              <p className="text-red-500 text-sm pt-2">
                {actionData.errors.userEmail}
              </p>
            )}
          </div>
          <div className="w-full flex justify-between">
            <Button
              type="button"
              size="lg"
              disabled={transition.state !== "idle"}
            >
              <Link to="/app/apartment-pick" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={transition.state !== "idle"}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
