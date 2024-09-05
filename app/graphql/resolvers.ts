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
        console.error(error)
        throw new ApolloError("Failed to fetch apartments");
      }
    },
    bookings: async () => {
      try {
        return await prisma.booking.findMany();
      } catch (error) {
        throw new ApolloError("Failed to fetch bookings");
      }
    },
    availability: async (_, { apartmentId }: { apartmentId: string }) => {
      try {
        return await prisma.availability.findMany({
          where: { apartmentId },
        });
      } catch (error) {
        throw new ApolloError("Failed to fetch availability");
      }
    },
  },
  Mutation: {
    createApartment: async (
      _,
      {
        name,
        description,
        price,
        location,
      }: { name: string; description?: string; price: number; location: string }
    ) => {
      try {
        return await prisma.apartment.create({
          data: { name, description, price, location },
        });
      } catch (error) {
        throw new ApolloError("Failed to create apartment");
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
    updateAvailability: async (
      _,
      {
        apartmentId,
        date,
        isBooked,
      }: { apartmentId: string; date: string; isBooked: boolean }
    ) => {
      try {
        return await prisma.availability.upsert({
          where: {
            apartmentId_date: { apartmentId, date: new Date(date) },
          },
          update: { isBooked },
          create: { apartmentId, date: new Date(date), isBooked },
        });
      } catch (error) {
        throw new ApolloError("Failed to update availability");
      }
    },
  },
};