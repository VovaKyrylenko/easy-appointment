import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server-express";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    apartments: async () => {
      try {
        return await prisma.apartment.findMany({
          include: {
            bookings: true,
          },
        });
      } catch (error) {
        console.error(error);
        throw new ApolloError("Failed to fetch apartments");
      }
    },
    apartment: async (_, { apartmentId }: { apartmentId: string }) => {
      try {
        return await prisma.apartment.findUnique({
          where: {
            id: apartmentId,
          },
          include: {
            bookings: true,
          },
        });
      } catch (error) {
        console.error(error);
        throw new ApolloError("Failed to fetch apartment");
      }
    },
    bookings: async () => {
      try {
        return await prisma.booking.findMany();
      } catch (error) {
        throw new ApolloError("Failed to fetch bookings");
      }
    },
  },
  Mutation: {
    createApartment: async (
      _: any,
      {
        name,
        price,
        location,
        image,
      }: {
        name: string;
        price: number;
        location: string;
        image?: string;
      }
    ) => {
      try {
        const newApartment = await prisma.apartment.create({
          data: {
            name,
            price,
            location,
            image,
          },
        });
        return newApartment;
      } catch (error) {
        throw new ApolloError(
          "Failed to create apartment",
          "CREATE_APARTMENT_ERROR"
        );
      }
    },
    createBooking: async (
      _,
      {
        apartmentId,
        startDate,
        endDate,
        userName,
        userPhone,
        userEmail,
      }: {
        apartmentId: string;
        startDate: string;
        endDate: string;
        userName: string;
        userPhone: string;
        userEmail: string;
      }
    ) => {
      try {
        return await prisma.booking.create({
          data: {
            apartmentId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            userName,
            userPhone,
            userEmail,
          },
          include: {
            apartment: true,
          },
        });
      } catch (error) {
        throw new ApolloError("Failed to create booking");
      }
    },
  },
};
