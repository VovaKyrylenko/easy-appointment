import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useActionData, useNavigation } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { loginFormSchema } from "~/validation/login-form";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { AlertTitle, Alert } from "~/components/ui/alert";
import { ZodError } from "zod";
import { AuthorizationError } from "remix-auth";

export default function Login() {
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();

  const isSubmitting = transition.state !== "idle";
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-center">Sign In</h2>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full ${
                  actionData?.errors?.email ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {actionData?.errors?.email && (
                <p className="text-red-500 text-sm">
                  {actionData.errors.email}
                </p>
              )}
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full ${
                  actionData?.errors?.password ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
              {actionData?.errors?.password && (
                <p className="text-red-500 text-sm">
                  {actionData.errors.password}
                </p>
              )}
            </div>
            {actionData?.generalError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="pl-0 ">
                  {actionData.generalError}
                </AlertTitle>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                <>Log In</>
              )}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/app/dashboard",
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors: Record<string, string> = {};

  try {
    loginFormSchema.parse({
      email,
      password,
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

  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/app/dashboard",
    });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return json({ generalError: error.message });
    }
  }
}
