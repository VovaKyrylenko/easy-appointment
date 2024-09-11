import { json, type ActionFunction } from "@remix-run/node";
import {
  Form,
  useActionData,
  useSubmit,
  useNavigation,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useCreateApartment } from "~/hooks/use-create-apartment.client";
import { apartmentSchema } from "~/validation/apartment-form-schema";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const validatedData = apartmentSchema.parse({
      ...data,
      price: Number(data.price),
    });

    return json({ validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ errors: error.format() }, { status: 400 });
    }
    return json(
      { errors: { _errors: ["An unexpected error occurred"] } },
      { status: 500 }
    );
  }
};

export default function CreateApartment() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = transition.state === "submitting";

  const { create, loading, error } = useCreateApartment();

  useEffect(() => {
    if (actionData?.validatedData && !isSubmitting) {
      createApartment(actionData.validatedData);
    }
  }, [actionData, isSubmitting]);

  const createApartment = async (data: z.infer<typeof apartmentSchema>) => {
    try {
      const result = await create({
        name: data.name,
        price: data.price,
        location: data.location,
        image: data.image,
      });

      if (result) {
        formRef.current?.reset();
        navigate(`/app/dashboard/${result.id}`);
      }
    } catch (err) {
      console.error("Error creating apartment:", err);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Create New Apartment</CardTitle>
        <CardDescription>
          Fill in the details for your new apartment listing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form ref={formRef} method="post" className="space-y-4">
          <div>
            <Label htmlFor="name">
              Name<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input id="name" name="name" />
            {actionData?.errors?.name && (
              <p className="text-red-500 text-sm">
                {actionData.errors.name._errors.join(", ")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="price">
              Price<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input id="price" name="price" type="number" step="100" />
            {actionData?.errors?.price && (
              <p className="text-red-500 text-sm">
                {actionData.errors.price._errors.join(", ")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="location">
              Location<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input id="location" name="location" />
            {actionData?.errors?.location && (
              <p className="text-red-500 text-sm">
                {actionData.errors.location._errors.join(", ")}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" name="image" />
            {actionData?.errors?.image && (
              <p className="text-red-500 text-sm">
                {actionData.errors.image._errors.join(", ")}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting || loading}>
            {isSubmitting || loading ? "Creating..." : "Create Apartment"}
          </Button>
        </Form>
      </CardContent>
      <CardFooter>
        {actionData?.validatedData && !error && (
          <Alert>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your apartment has been created.
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
