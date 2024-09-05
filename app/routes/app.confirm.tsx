import { Link, useLoaderData, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { destroySession, getSession } from "~/services/session.server";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useCreateBooking } from "~/hooks/use-create-booking";

export default function ConfirmBooking() {
  const { apartment, dates, userData } = useLoaderData<typeof loader>();
  const { createBooking, error } = useCreateBooking();
  const transition = useNavigation();

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

  const handleConfirmBooking = async () => {
    try {
      await createBooking({
        variables: {
          apartmentId: apartment.id,
          startDate: dates.from,
          endDate: dates.to,
          userName: userData.userName,
          userPhone: userData.userPhone,
          userEmail: userData.userEmail,
        },
      });
       await fetch("/app/confirm", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "X-Remix-Action": "destroy-session",
         },
       });
    } catch (error) {
      console.error("Booking creation failed:", error);
    }
  };

  const isSubmitting = transition.state !== "idle";

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Booking Summary
        </h2>

        {error && (
          <p className="text-red-500 text-center">
            Failed to create booking: {error.message}
          </p>
        )}

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

        <div className="flex mt-6 w-full justify-between">
          <Button type="button" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              <Link to="/app/user-data" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
            )}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={handleConfirmBooking}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              <Link to="/app/success" className="flex">
                Confirm Booking <Check className="ml-2 h-5 w-5" />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const apartment = session.get("apartment");
  const dates = session.get("date");
  const userData = session.get("userData");

  return json({ apartment, dates, userData });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session) {
    return redirect("/app/success", {
      headers: { "Set-Cookie":  await destroySession(session) },
    });
  }
};
