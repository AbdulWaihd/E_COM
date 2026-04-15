import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z
    .boolean()
    .optional()
});