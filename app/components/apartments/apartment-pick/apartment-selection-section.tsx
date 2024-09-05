import { Apartment } from "~/graphql/generated/graphql";
import { ApartmentList } from "./apartment-list";

interface ApartmentSelectionSectionProps {
  apartments: Apartment[] | [];
  onSelect: (apartment: Apartment) => void;
  selectedApartment: Apartment | null;
}

export const ApartmentSelectionSection = ({
  apartments,
  onSelect,
  selectedApartment,
}: ApartmentSelectionSectionProps) => {
  const isEmpty = apartments.length === 0;

  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md flex flex-col h-[75vh] overflow-hidden">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Choose an Apartment
      </h2>
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
