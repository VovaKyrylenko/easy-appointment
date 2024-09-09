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
import { ZodError } from "zod";
import { userDataFormSchema } from "~/validation/user-data-form";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ActionButton } from "~/components/common/action-button";
import { Button } from "~/components/ui/button";
import { commitDataSession, getDataSession } from "~/services/booking.session.server";

export default function UserDetailsForm() {
  const actionData = useActionData<typeof action>();
  const { userData } = useLoaderData<typeof loader>();

  const transition = useNavigation();

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
            {/* TODO */}
            <ActionButton
              to="/app/apartment-pick"
              type="button"
              isDisabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </ActionButton>
            <ActionButton type="submit" isLoading={isSubmitting}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </ActionButton>
          </div>
        </Form>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getDataSession(request.headers.get("Cookie"));
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
    const session = await getDataSession(request.headers.get("Cookie"));
    session.set("userData", { userName, userPhone, userEmail });

    return redirect("/app/confirm", {
      headers: {
        "Set-Cookie": await commitDataSession(session),
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
