import { gql } from "apollo-server-express";

export const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $apartmentId: ID!
    $startDate: String!
    $endDate: String!
    $userName: String!
    $userPhone: String!
    $userEmail: String!
  ) {
    createBooking(
      apartmentId: $apartmentId
      startDate: $startDate
      endDate: $endDate
      userName: $userName
      userPhone: $userPhone
      userEmail: $userEmail
    ) {
      id
      userName
      apartment {
        name
      }
      startDate
      endDate
    }
  }
`;