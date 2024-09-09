import { Form, useNavigation } from "@remix-run/react";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { Booking } from "~/graphql/generated/graphql";
import { useGetBookings } from "~/hooks/use-get-bookings";
import { useDeleteBooking } from "~/hooks/use-delete-booking";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

export default function BookingRequests() {
  const { bookings } = useGetBookings();
  const { deleteBooking, loading } = useDeleteBooking();
  const transition = useNavigation();

  const handleDelete = async (bookingId: string) => {
    await deleteBooking(bookingId);
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col h-[75vh] overflow-hidden">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Booking Requests
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="border border-blue-300 p-4 rounded-lg shadow-sm bg-white flex-1 h-full overflow-y-auto">
          {bookings.length > 0 ? (
            bookings.map((booking: Booking) => (
              <Card key={booking.id} className="shadow-lg mb-4">
                <CardHeader>
                  <CardTitle>{booking.apartment.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>User:</strong> {booking.userName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {booking.userPhone}
                  </p>
                  <p>
                    <strong>Email:</strong> {booking.userEmail}
                  </p>
                  <p>
                    <strong>Dates:</strong>{" "}
                    {`${format(new Date(Number(booking.startDate)), "PP")}`} to{" "}
                    {`${format(new Date(Number(booking.endDate)), "PP")}`}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(booking.id)}
                    disabled={loading || transition.state !== "idle"}
                  >
                    {loading ? "Deleting..." : "Cancel reservation"}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
