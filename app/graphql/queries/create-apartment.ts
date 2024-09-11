import { gql } from "apollo-server-express";

export const CREATE_APARTMENT_MUTATION = gql`
  mutation CreateApartment(
    $name: String!
    $price: Float!
    $location: String!
    $image: String
  ) {
    createApartment(
      name: $name
      price: $price
      location: $location
      image: $image
    ) {
      id
      name
      price
      location
      image
      createdAt
      updatedAt
    }
  }
`;
