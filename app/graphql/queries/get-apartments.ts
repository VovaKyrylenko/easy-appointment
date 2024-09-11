import { gql } from "apollo-server-express";

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
