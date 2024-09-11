import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { useMemo } from "react";
import { useGetApartment } from "~/hooks/use-get-apartment.client";
import type { Booking } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DayProps } from "react-day-picker";
import { Day } from "react-day-picker";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { Loader2 } from "lucide-react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ apartmentId: params.apartmentId });
};

export default function ApartmentBookingsCalendar() {
  const { apartmentId } = useLoaderData<typeof loader>();

  if (!apartmentId) {
    return <p>Error: Apartment ID not found.</p>;
  }

  const { data, loading, error } = useGetApartment(apartmentId);

  const apartment = data?.apartment;

  const bookings = useMemo(() => apartment?.bookings || [], [apartment]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive">
          <AlertTitle>Error fetching apartments!</AlertTitle>
          <p>{error?.message || "An unknown error occurred."}</p>
        </Alert>
      </div>
    );
  }

  const isDateInRange = (date: number, start: number, end: number) =>
    date >= start && date <= end;

  return (
    <div className="flex-1">
      <div className="p-6 rounded-lg shadow-md flex flex-col h-[75vh] overflow-hidden bg-white flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full flex-1">
            <Loader2 className="animate-spin"/>
            <p className="ml-4 text-gray-600">Loading apartments...</p>
          </div>
        ) : (
          <Calendar
            className="h-full w-full flex"
            modifiers={{
              booked: (date) =>
                bookings.some((b: Booking) =>
                  isDateInRange(
                    date.getTime(),
                    Number(b.startDate),
                    Number(b.endDate)
                  )
                ),
            }}
            modifiersStyles={{
              booked: {
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "rgb(239, 68, 68)",
              },
            }}
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1 flex-1",
              head_row: "",
              row: "w-full mt-2",
            }}
            components={{
              Day: (props: DayProps) => {
                const booking = bookings.find((b: Booking) =>
                  isDateInRange(
                    props.date.getTime(),
                    Number(b.startDate),
                    Number(b.endDate)
                  )
                );
                if (booking) {
                  return (
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Day {...props} />
                        </TooltipTrigger>
                        <TooltipContent className="p-5 border border-gray-300 bg-white space-y-4">
                          <div>
                            <p className="text-base font-semibold text-gray-500 mb-2">
                              Booking Dates
                            </p>
                            <p className="text-sm font-medium text-gray-400">
                              {format(
                                new Date(Number(booking.startDate)),
                                "PP"
                              )}
                              -{" "}
                              {format(new Date(Number(booking.endDate)), "PP")}
                            </p>
                          </div>
                          <div className="border-t border-gray-200"></div>
                          <div className="space-y-2">
                            <p className="flex items-center text-base font-medium text-gray-700">
                              <span className=" font-semibold">
                                Guest Name:&nbsp;
                              </span>
                              {booking.userName}
                            </p>
                            <p className="flex items-center text-base font-medium text-gray-700">
                              <span className=" font-semibold">
                                Phone:&nbsp;
                              </span>
                              {booking.userPhone}
                            </p>
                            <p className="flex items-center text-base font-medium text-gray-700">
                              <span className=" font-semibold">
                                Email:&nbsp;
                              </span>
                              {booking.userEmail}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }
                return <Day {...props} />;
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
