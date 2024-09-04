import { useState } from "react";
import { useQuery } from "@apollo/client";
import { redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ApartmentList } from "~/components/apartments/apartment-list";
import { DatePickerWithRange } from "~/components/apartments/date-picker-with-range";
import { GET_APARTMENTS } from "~/graphql/queries/get-apartments";
import { Apartment } from "~/graphql/generated/graphql";
import { commitSession, getSession } from "~/services/session.server";
import { useToast } from "~/hooks/use-toast";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { DateRange } from "react-day-picker";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const apartment = session.get("apartment");
  const date = session.get("date");

  return { apartment, date };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { apartment, date } = await request.json();

  if (!apartment || !date) {
    const session = await getSession(request.headers.get("Cookie"));
    session.flash("error", "Invalid data");
    return redirect("/app/apartment-pick", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("apartment", apartment);
  session.set("date", date);

  return redirect("/app/user-data", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};

export default function ApartmentPickPage() {
  const { apartment, date } = useLoaderData<typeof loader>();

  const { data, loading, error } = useQuery(GET_APARTMENTS);

  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    apartment
  );
  const [selectedDates, setSelectedDates] = useState<DateRange | null>(date);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSelectApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const handleDatesChange = (from: Date | null, to: Date | null) => {
    if (!from || !to) return;
    setSelectedDates({ from, to });
  };

  const handleSaveApartmentAndDate = async () => {
    if (!selectedApartment || !selectedDates?.from || !selectedDates?.to) {
      toast.toast({
        title: "Please select an apartment and dates before proceeding.",
      });
      return;
    }

    try {
      const response = await fetch("/app/apartment-pick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apartment: selectedApartment,
          date: {
            from: new Date(selectedDates.from).toISOString(),
            to: new Date(selectedDates.to).toISOString(),
          },
        }),
      });

      if (!response.ok) {
        return toast.toast({
          title: "Oops, something went wrong, try again!",
          variant: "destructive",
        });
      }

      return navigate("/app/user-data");
    } catch (err) {
      return toast.toast({
        title: "Oops, network error, try again!",
        variant: "destructive",
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching apartments!</p>;

  const bookedDates = selectedApartment?.bookings?.map((booking) => ({
    from: new Date(booking.startDate),
    to: new Date(booking.endDate),
  }));

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col max-h-[75vh] overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Choose an Apartment
          </h2>
          <p className="mb-6 text-gray-600">
            Browse through our collection of charming apartments and select the
            one that suits your needs.
          </p>
          <div className="flex-1 overflow-y-auto">
            <ApartmentList
              apartments={data.apartments}
              onSelect={handleSelectApartment}
              selectedApartment={selectedApartment}
            />
          </div>
        </div>

        <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col max-h-[75vh] overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Select Your Dates
          </h2>
          <div className="flex-1 overflow-y-auto">
            <DatePickerWithRange
              onChange={handleDatesChange}
              selectedDates={selectedDates}
              bookedDates={bookedDates}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          size="lg"
          onClick={handleSaveApartmentAndDate}
          disabled={
            !selectedApartment || !selectedDates?.from || !selectedDates?.to
          }
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
