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

  type Availability {
    id: ID!
    apartment: Apartment!
    date: String!
    isBooked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    apartments: [Apartment!]!
    apartment(apartmentId: ID!): Apartment
    bookings: [Booking!]!
    availability(apartmentId: ID!): [Availability!]!
  }

  type Mutation {
    createApartment(
      name: String!
      description: String
      price: Float!
      location: String!
    ): Apartment!
    createBooking(
      apartmentId: ID!
      startDate: String!
      endDate: String!
      userName: String!
      userPhone: String!
      userEmail: String!
    ): Booking!
    updateAvailability(
      apartmentId: ID!
      date: String!
      isBooked: Boolean!
    ): Availability!
  }
`;
