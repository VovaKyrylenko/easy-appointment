import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ApartmentSelectionSection } from "~/components/apartments/apartment-pick/apartment-selection-section";
import { Apartment } from "~/graphql/generated/graphql";
import { useGetApartments } from "~/hooks/use-get-apartments.client";
import { authenticator } from "~/services/auth.server";
import { useNavigate } from "@remix-run/react";
import { Loader2 } from "lucide-react";
import { Alert, AlertTitle } from "~/components/ui/alert";

export default function DashboardPage() {
  const { apartmentId } = useLoaderData<typeof loader>();
  const { apartments, loading, error } = useGetApartments();
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    apartments.find((apartment) => apartmentId === apartment.id) ?? null
  );
  const navigate = useNavigate();

  const handleSelectApartment = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    navigate(`/app/dashboard/${apartment.id}`);
  };

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="flex items-center justify-center h-full flex-1">
            <Loader2 className="animate-spin" />
            <p className="ml-4 text-gray-600">Loading apartments...</p>
          </div>
        ) : (
          <ApartmentSelectionSection
            apartments={apartments}
            onSelect={handleSelectApartment}
            selectedApartment={selectedApartment}
            isDashboard
          />
        )}

        <Outlet />
      </div>
    </div>
  );
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
  return json({ apartmentId: params.apartmentId });
};
