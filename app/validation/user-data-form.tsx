import { z } from "zod";

export const userDataFormSchema = z.object({
  userName: z.string().min(1, "Name is required"),
  userPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(
      /^\+?\d+$/,
      "Phone number can only contain digits and optional leading '+'"
    ),
  userEmail: z.string().email("Invalid email address"),
});

export type UserDataFormData = z.infer<typeof userDataFormSchema>;