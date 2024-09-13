import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "~/graphql/queries/create-booking";

export const useCreateBooking = () => {
  const [createBooking, { data, loading, error }] = useMutation(CREATE_BOOKING);
  return { createBooking, data, loading, error };
};
