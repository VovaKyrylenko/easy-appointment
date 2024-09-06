/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateBooking(\n    $apartmentId: ID!\n    $startDate: String!\n    $endDate: String!\n    $userName: String!\n    $userPhone: String!\n    $userEmail: String!\n  ) {\n    createBooking(\n      apartmentId: $apartmentId\n      startDate: $startDate\n      endDate: $endDate\n      userName: $userName\n      userPhone: $userPhone\n      userEmail: $userEmail\n    ) {\n      id\n      userName\n      apartment {\n        name\n      }\n      startDate\n      endDate\n    }\n  }\n": types.CreateBookingDocument,
    "\n  query GetApartmentBookings($apartmentId: ID!) {\n    apartment(apartmentId: $apartmentId) {\n      id\n      name\n      bookings {\n        id\n        startDate\n        endDate\n        userName\n        userPhone\n        userEmail\n      }\n    }\n  }\n": types.GetApartmentBookingsDocument,
    "\n  query GetApartments {\n    apartments {\n      id\n      name\n      image\n      price\n      location\n      createdAt\n      updatedAt\n      bookings {\n        id\n        startDate\n        endDate\n        userName\n      }\n    }\n  }\n": types.GetApartmentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBooking(\n    $apartmentId: ID!\n    $startDate: String!\n    $endDate: String!\n    $userName: String!\n    $userPhone: String!\n    $userEmail: String!\n  ) {\n    createBooking(\n      apartmentId: $apartmentId\n      startDate: $startDate\n      endDate: $endDate\n      userName: $userName\n      userPhone: $userPhone\n      userEmail: $userEmail\n    ) {\n      id\n      userName\n      apartment {\n        name\n      }\n      startDate\n      endDate\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBooking(\n    $apartmentId: ID!\n    $startDate: String!\n    $endDate: String!\n    $userName: String!\n    $userPhone: String!\n    $userEmail: String!\n  ) {\n    createBooking(\n      apartmentId: $apartmentId\n      startDate: $startDate\n      endDate: $endDate\n      userName: $userName\n      userPhone: $userPhone\n      userEmail: $userEmail\n    ) {\n      id\n      userName\n      apartment {\n        name\n      }\n      startDate\n      endDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetApartmentBookings($apartmentId: ID!) {\n    apartment(apartmentId: $apartmentId) {\n      id\n      name\n      bookings {\n        id\n        startDate\n        endDate\n        userName\n        userPhone\n        userEmail\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetApartmentBookings($apartmentId: ID!) {\n    apartment(apartmentId: $apartmentId) {\n      id\n      name\n      bookings {\n        id\n        startDate\n        endDate\n        userName\n        userPhone\n        userEmail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetApartments {\n    apartments {\n      id\n      name\n      image\n      price\n      location\n      createdAt\n      updatedAt\n      bookings {\n        id\n        startDate\n        endDate\n        userName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetApartments {\n    apartments {\n      id\n      name\n      image\n      price\n      location\n      createdAt\n      updatedAt\n      bookings {\n        id\n        startDate\n        endDate\n        userName\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;