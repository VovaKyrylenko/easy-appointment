import { gql } from "@apollo/client";

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($bookingId: ID!) {
    deleteBooking(bookingId: $bookingId)
  }
`;
