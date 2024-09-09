import { Apartment } from "~/graphql/generated/graphql";
import { ApartmentList } from "./apartment-list";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "@remix-run/react";

interface ApartmentSelectionSectionProps {
  apartments: Apartment[] | [];
  onSelect: (apartment: Apartment) => void;
  selectedApartment: Apartment | null;
  isDashboard?: boolean;
}

export const ApartmentSelectionSection = ({
  apartments,
  onSelect,
  selectedApartment,
  isDashboard,
}: ApartmentSelectionSectionProps) => {
  const isEmpty = apartments.length === 0;

  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col h-[75vh] overflow-hidden">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Choose an Apartment
        </h2>
        {isDashboard && (
          <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to="/app/dashboard/requests-list">
              View all reservations
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link to="/app/dashboard/create-apartment">
              <Plus />
            </Link>
          </Button>
          </div>
        )}
      </div>
      <p className="mb-6 text-gray-600">
        Browse through our collection of charming apartments and select the one
        that suits your needs.
      </p>

      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No apartments available</p>
          </div>
        ) : (
          <ApartmentList
            apartments={apartments}
            onSelect={onSelect}
            selectedApartment={selectedApartment}
          />
        )}
      </div>
    </div>
  );
};
