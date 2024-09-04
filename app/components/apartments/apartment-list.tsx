import { useState } from "react";
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
  const [selectedApartmentId, setSelectedApartmentId] = useState<string | null>(
    null
  );

  const handleSelect = (apartment: Apartment) => {
    setSelectedApartmentId(apartment.id);
    onSelect(apartment);
  };

  return (
    <div className="border border-blue-300 p-4 rounded-lg shadow-sm bg-white flex-1 max-h-full overflow-y-auto">
      {apartments.length > 0 ? (
        <ul className="w-full h-full">
          {apartments.map((apartment) => (
            <ApartmentItem
              key={apartment.id}
              apartment={apartment}
              isSelected={
                apartment.id === selectedApartmentId ||
                apartment.id === selectedApartment?.id
              }
              onClick={() => handleSelect(apartment)}
            />
          ))}
        </ul>
      ) : (
        <p>No apartments available.</p>
      )}
    </div>
  );
};
