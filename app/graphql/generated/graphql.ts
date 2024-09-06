/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Apartment = {
  __typename?: 'Apartment';
  bookings?: Maybe<Array<Booking>>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Availability = {
  __typename?: 'Availability';
  apartment: Apartment;
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isBooked: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  apartment: Apartment;
  createdAt: Scalars['String']['output'];
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  startDate: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userEmail: Scalars['String']['output'];
  userName: Scalars['String']['output'];
  userPhone: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createApartment: Apartment;
  createBooking: Booking;
  updateAvailability: Availability;
};


export type MutationCreateApartmentArgs = {
  image?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};


export type MutationCreateBookingArgs = {
  apartmentId: Scalars['ID']['input'];
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userPhone: Scalars['String']['input'];
};


export type MutationUpdateAvailabilityArgs = {
  apartmentId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  isBooked: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  apartment?: Maybe<Apartment>;
  apartments: Array<Apartment>;
  availability: Array<Availability>;
  bookings: Array<Booking>;
};


export type QueryApartmentArgs = {
  apartmentId: Scalars['ID']['input'];
};


export type QueryAvailabilityArgs = {
  apartmentId: Scalars['ID']['input'];
};

export type CreateBookingMutationVariables = Exact<{
  apartmentId: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userPhone: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string, userName: string, startDate: string, endDate: string, apartment: { __typename?: 'Apartment', name: string } } };

export type GetApartmentBookingsQueryVariables = Exact<{
  apartmentId: Scalars['ID']['input'];
}>;


export type GetApartmentBookingsQuery = { __typename?: 'Query', apartment?: { __typename?: 'Apartment', id: string, name: string, bookings?: Array<{ __typename?: 'Booking', id: string, startDate: string, endDate: string, userName: string, userPhone: string, userEmail: string }> | null } | null };

export type GetApartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApartmentsQuery = { __typename?: 'Query', apartments: Array<{ __typename?: 'Apartment', id: string, name: string, image?: string | null, price: number, location: string, createdAt: string, updatedAt: string, bookings?: Array<{ __typename?: 'Booking', id: string, startDate: string, endDate: string, userName: string }> | null }> };


export const CreateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"apartmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userPhone"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"apartmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"apartmentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"userName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userName"}}},{"kind":"Argument","name":{"kind":"Name","value":"userPhone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userPhone"}}},{"kind":"Argument","name":{"kind":"Name","value":"userEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userEmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"apartment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]} as unknown as DocumentNode<CreateBookingMutation, CreateBookingMutationVariables>;
export const GetApartmentBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApartmentBookings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"apartmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apartment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"apartmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"apartmentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userPhone"}},{"kind":"Field","name":{"kind":"Name","value":"userEmail"}}]}}]}}]}}]} as unknown as DocumentNode<GetApartmentBookingsQuery, GetApartmentBookingsQueryVariables>;
export const GetApartmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApartments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apartments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}}]}}]}}]}}]} as unknown as DocumentNode<GetApartmentsQuery, GetApartmentsQueryVariables>;