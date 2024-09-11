import { gql } from "apollo-server-express";

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($bookingId: ID!) {
    deleteBooking(bookingId: $bookingId)
  }
`;
