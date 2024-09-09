import { ApolloError } from "apollo-server-express";
import { prisma } from "~/db.server";
import { Context } from "~/types/apollo-context";

export const apartmentResolvers = {
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
    apartment: async (_: any, { apartmentId }: { apartmentId: string }) => {
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
  },
  Mutation: {
    createApartment: async (
      _: any,
      {
        name,
        price,
        location,
        image,
      }: { name: string; price: number; location: string; image?: string },
      context: Context
    ) => {
      if (!context.isAuthenticated) {
        throw new ApolloError("Unauthorized", "UNAUTHORIZED");
      }

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
  },
};
