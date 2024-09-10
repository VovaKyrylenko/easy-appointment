import { useLoaderData, useNavigation, Form } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  commitDataSession,
  getDataSession,
} from "~/services/booking.session.server";
import { ArrowLeft, Check } from "lucide-react";
import { ActionButton } from "~/components/common/action-button";

export default function ConfirmBooking() {
  const { apartment, dates, userData } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  if (!apartment || !dates?.from || !dates?.to || !userData) {
    return (
      <p>Something went wrong. Please go back and fill in all the details.</p>
    );
  }

  const calculateTotalPrice = () => {
    const startDate = new Date(dates.from);
    const endDate = new Date(dates.to);
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days * apartment.price;
  };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Booking Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{userData.userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{userData.userPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{userData.userEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Apartment:</span>
            <span>{apartment.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{apartment.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Check-in:</span>
            <span>{new Date(dates.from).toDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Check-out:</span>
            <span>{new Date(dates.to).toDateString()}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Price:</span>
            <span>${calculateTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <Form method="post" className="flex mt-6 w-full justify-between">
          <input
            type="hidden"
            name="totalAmount"
            value={calculateTotalPrice().toFixed(2)}
          />
          <ActionButton to="/app/user-data" isDisabled={isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </ActionButton>
          <ActionButton type="submit" isLoading={isSubmitting}>
            Proceed to payment <Check className="ml-2 h-5 w-5" />
          </ActionButton>
        </Form>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getDataSession(request.headers.get("Cookie"));
  const apartment = session.get("apartment");
  const dates = session.get("date");
  const userData = session.get("userData");

  if (!apartment || !dates || !userData) {
    throw redirect("/app/search");
  }

  return json({ apartment, dates, userData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getDataSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const totalAmount = formData.get("totalAmount");

  if (!totalAmount) {
    return json({ error: "Total amount is required" }, { status: 400 });
  }

  session.set("totalAmount", totalAmount);
  return redirect("/app/pay", {
    headers: { "Set-Cookie": await commitDataSession(session) },
  });
};