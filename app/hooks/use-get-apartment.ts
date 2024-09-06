import { useQuery } from "@apollo/client";
import { GET_APARTMENT_BOOKINGS } from "~/graphql/queries/get-apartment";

export function useGetApartment(apartmentId: string) {
  const { loading, error, data } = useQuery(GET_APARTMENT_BOOKINGS, {
    variables: { apartmentId },
  });

  return { loading, error, data };
}
