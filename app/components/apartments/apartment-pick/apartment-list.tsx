import { Apartment } from "~/graphql/generated/graphql";
import { ApartmentItem } from "./apartment-item";

interface ApartmentListProps {
  apartments: Apartment[];
  onSelect: (apartment: Apartment) => void;
  selectedApartment: Apartment | null;
}

export const ApartmentList = ({
  apartments,
  onSelect,
  selectedApartment,
}: ApartmentListProps) => {
  const handleSelect = (apartment: Apartment) => {
    onSelect(apartment);
  };

  return (
    <div className="border border-blue-300 p-4 rounded-lg shadow-sm bg-white flex-1 h-full overflow-y-auto">
      {apartments.length > 0 ? (
        <ul className="w-full h-full">
          {apartments.map((apartment) => (
            <ApartmentItem
              key={apartment.id}
              apartment={apartment}
              isSelected={apartment.id === selectedApartment?.id}
              onClick={() => handleSelect(apartment)}
            />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No apartments available</p>
        </div>
      )}
    </div>
  );
};
