import { ApolloError } from "apollo-server-express";
import { prisma } from "~/db.server";
import { Context } from "~/types/apollo-context";

export const bookingResolvers = {
  Query: {
    bookings: async () => {
      try {
        return await prisma.booking.findMany({ include: { apartment: true } });
      } catch (error) {
        throw new ApolloError("Failed to fetch bookings");
      }
    },
  },
  Mutation: {
    createBooking: async (
      _: any,
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
      },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new ApolloError("Unauthorized", "UNAUTHORIZED");
      }

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
    deleteBooking: async (
      _: any,
      { bookingId }: { bookingId: string }
    ) => {
      try {
        await prisma.booking.delete({
          where: { id: bookingId },
        });
        return true;
      } catch (error) {
        console.error("Error deleting booking:", error);
        return false;
      }
    },
  },
};
