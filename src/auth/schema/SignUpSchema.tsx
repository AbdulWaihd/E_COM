import { z } from "zod";




export const signupSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full name is required"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  age: z.coerce     
    .number()
    .int("Age must be an integer")
    .positive("Age must be a positive number")
    .max(120, "Age must be less than or equal to 120"),
  gender: z
    .string()
    .min(1, "Gender is required"),
  profilepic: z
    .string()
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  confirmpassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters")
})
.refine((data) => data.password === data.confirmpassword, {
  message: "Passwords do not match",
  path: ["confirmpassword"]
});
