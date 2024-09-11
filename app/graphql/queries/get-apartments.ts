import { gql } from "@apollo/client";

export const GET_APARTMENTS = gql`
  query GetApartments {
    apartments {
      id
      name
      image
      price
      location
      createdAt
      updatedAt
      bookings {
        id
        startDate
        endDate
        userName
      }
    }
  }
`;
