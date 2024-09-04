import { Apartment } from "~/graphql/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageOff } from "lucide-react";
import clsx from "clsx";

interface ApartmentItemProps {
  apartment: Apartment;
  isSelected: boolean;
  onClick: () => void;
}

export const ApartmentItem = ({
  apartment,
  isSelected,
  onClick,
}: ApartmentItemProps) => {
  return (
    <li
      className={clsx(
        "relative mb-4 h-full cursor-pointer transform transition-transform duration-500 ease-in-out rounded-xl",
        {
          "scale-105 border-2 border-blue-500 shadow-xl": isSelected,
          "hover:scale-105 hover:shadow-2xl": !isSelected,
        }
      )}
      onClick={onClick}
    >
      <Card
        className={clsx(
          "flex flex-col md:flex-row transition-colors duration-500 ease-in-out",
          {
            "bg-blue-50": isSelected,
            "bg-white": !isSelected,
          }
        )}
      >
        <div className="relative md:w-1/3 w-full overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          {apartment.image ? (
            <img
              src={apartment.image}
              alt={apartment.name}
              className="object-cover h-full w-full transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center bg-gray-200 h-full w-full">
              <ImageOff className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <Badge
            variant="outline"
            className="absolute top-2 right-2 text-blue-600 bg-blue-50 border-blue-600 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100"
          >
            ${apartment.price} / night
          </Badge>
        </div>
        <div className="flex-1 flex flex-col justify-between p-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-bold text-gray-800">
              {apartment.name}
            </CardTitle>
            <div className="text-gray-500">{apartment.location}</div>
          </CardHeader>
          <CardContent className="text-gray-700 p-0"></CardContent>
        </div>
      </Card>
    </li>
  );
};
