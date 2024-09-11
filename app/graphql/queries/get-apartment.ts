import { gql } from "apollo-server-express";

export const GET_APARTMENT_BOOKINGS = gql`
  query GetApartmentBookings($apartmentId: ID!) {
    apartment(apartmentId: $apartmentId) {
      id
      name
      bookings {
        id
        startDate
        endDate
        userName
        userPhone
        userEmail
      }
    }
  }
`;
