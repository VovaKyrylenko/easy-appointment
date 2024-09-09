import { useState } from "react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Apartment } from "~/graphql/generated/graphql";
import { commitDataSession, getDataSession} from "~/services/booking.session.server";
import { useToast } from "~/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { ApartmentSelectionSection } from "~/components/apartments/apartment-pick/apartment-selection-section";
import { DateSelectionSection } from "~/components/apartments/apartment-pick/date-selection-section";
import { useGetApartments } from "~/hooks/use-get-apartments";
import { Alert, AlertTitle } from "~/components/ui/alert";
import { ActionButton } from "~/components/common/action-button";

export default function ApartmentPickPage() {
  const submit = useSubmit();
  const { toast } = useToast();
  const transition = useNavigation();

  const isSubmitting = transition.state !== "idle";

  const { initialApartment, initialDate } = useLoaderData<typeof loader>();
  const { apartments, loading, error } = useGetApartments();

  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    initialApartment
  );
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(
    initialDate
  );

  const handleSelectApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const handleDatesChange = (range: DateRange | undefined) => {
    setSelectedDates(range);
  };

  const handleSaveApartmentAndDate = () => {
    if (!selectedApartment || !selectedDates?.from || !selectedDates?.to) {
      return toast({
        title: "Please select an apartment and dates before proceeding.",
      });
    }

    const formData = new FormData();
    formData.append("apartment", JSON.stringify(selectedApartment));
    formData.append(
      "date",
      JSON.stringify({
        from: new Date(selectedDates.from).toISOString(),
        to: new Date(selectedDates.to).toISOString(),
      })
    );

    submit(formData, { method: "post" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full flex-1">
        <Loader2 className="animate-spin"/>
        <p className="ml-4 text-gray-600">Loading apartments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Alert variant="destructive">
          <AlertTitle>Error fetching apartments!</AlertTitle>
          <p>{error.message || "An unknown error occurred."}</p>
        </Alert>
      </div>
    );
  }

  const bookedDates = selectedApartment?.bookings?.map((booking) => ({
    from: new Date(Number(booking.startDate)),
    to: new Date(Number(booking.endDate)),
  }));

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ApartmentSelectionSection
          apartments={apartments}
          onSelect={handleSelectApartment}
          selectedApartment={selectedApartment}
        />
        <DateSelectionSection
          onChange={handleDatesChange}
          selectedDates={selectedDates}
          bookedDates={bookedDates}
        />
      </div>
      <div className="flex justify-end mt-4">
        <ActionButton
          isLoading={isSubmitting}
          isDisabled={
            !selectedApartment || !selectedDates?.from || !selectedDates?.to
          }
          onClick={handleSaveApartmentAndDate}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </ActionButton>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getDataSession(request.headers.get("Cookie"));
  const initialApartment = session.get("apartment");
  const initialDate = session.get("date");

  return json({ initialApartment, initialDate });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const apartment = formData.get("apartment");
  const date = formData.get("date");

  const session = await getDataSession(request.headers.get("Cookie"));
  session.set("apartment", JSON.parse(apartment as string));
  session.set("date", JSON.parse(date as string));

  return redirect("/app/user-data", {
    headers: { "Set-Cookie": await commitDataSession(session) },
  });
};
