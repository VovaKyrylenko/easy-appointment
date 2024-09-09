import { useMutation } from "@apollo/client";
import { DELETE_BOOKING } from "~/graphql/queries/delete-booking";
import { GET_BOOKINGS } from "~/graphql/queries/get-bookings";

export const useDeleteBooking = () => {
  const [deleteBookingMutation, { loading, error }] = useMutation(
    DELETE_BOOKING,
    {
      refetchQueries: [{ query: GET_BOOKINGS }],
      awaitRefetchQueries: true,
    }
  );

  const deleteBooking = async (bookingId: string) => {
    try {
      await deleteBookingMutation({
        variables: {
          bookingId,
        },
      });
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  return { deleteBooking, loading, error };
};
