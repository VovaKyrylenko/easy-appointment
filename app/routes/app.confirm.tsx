import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { json } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import { ArrowLeft, Check } from "lucide-react";
import { useCreateBooking } from "~/hooks/use-create-booking";

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const apartment = session.get("apartment");
  const dates = session.get("date");
  const userDetails = session.get("userData");

  return json({ apartment, dates, userDetails });
};

export default function BookingSummary() {
  const { apartment, dates, userDetails } = useLoaderData<typeof loader>();
  const { createBooking, data, loading, error } = useCreateBooking();
  if (!apartment || !dates?.from || !dates?.to || !userDetails) {
    return (
      <p>Something went wrong. Please go back and fill in all the details.</p>
    );
  }

  const { userName, userPhone, userEmail } = userDetails;

  const calculateTotalPrice = () => {
    const startDate = new Date(dates.from);
    const endDate = new Date(dates.to);
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days * apartment.price;
  };

  const handleConfirmBooking = async () => {
    await createBooking({
      variables: {
        apartmentId: apartment.id,
        startDate: dates.from,
        endDate: dates.to,
        userName: userDetails.userName,
        userPhone: userDetails.userPhone,
        userEmail: userDetails.userEmail,
      },
    });
  };

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Booking Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{userPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{userEmail}</span>
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

        <div className="flex mt-6 space-x-2">
          <Link to="/app/user-data" className="w-full">
            <Button size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back
            </Button>
          </Link>
          <Button size="lg" onClick={handleConfirmBooking}>
            Confirm Booking <Check className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
