import { gql } from "@apollo/client";

export const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      id
      apartment {
        id
        name
      }
      startDate
      endDate
      userName
      userPhone
      userEmail
      createdAt
      updatedAt
    }
  }
`;
