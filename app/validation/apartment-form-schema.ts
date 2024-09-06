import { z } from "zod";

export const apartmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  price: z.number().positive("Price must be positive"),
  location: z.string().min(1, "Location is required"),
  image: z
    .union([z.string().url("Invalid image URL"), z.string().max(0)])
    .optional()
    .nullable(),
});
