import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Apartment {
    id: ID!
    name: String!
    image: String
    price: Float!
    bookings: [Booking!]
    location: String!
    createdAt: String!
    updatedAt: String!
  }

  type Booking {
    id: ID!
    apartment: Apartment!
    startDate: String!
    endDate: String!
    userName: String!
    userPhone: String!
    userEmail: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    apartments: [Apartment!]!
    apartment(apartmentId: ID!): Apartment
    bookings: [Booking!]!
  }

  type Mutation {
    createApartment(
      name: String!
      price: Float!
      location: String!
      image: String
    ): Apartment!
    createBooking(
      apartmentId: ID!
      startDate: String!
      endDate: String!
      userName: String!
      userPhone: String!
      userEmail: String!
    ): Booking!
  }
`;
