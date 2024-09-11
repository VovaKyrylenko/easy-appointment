import { useQuery } from "@apollo/client";
import { GET_BOOKINGS } from "~/graphql/queries/get-bookings";

export const useGetBookings = () => {
  const { data, loading, error } = useQuery(GET_BOOKINGS);

  return {
    bookings: data ? data.bookings : [],
    loading,
    error,
  };
};
