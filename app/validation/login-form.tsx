import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
