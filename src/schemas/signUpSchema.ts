import { z } from "zod";

export const signUpSchema = z.object({
    mobile: z.string()
    .max(10, { message: "Mobile number must be at least 10 digit"})
    .regex(/^[0-9]+$/, { message: "Please provide mobile number"}) // Ensure only numbers are allowed
    .transform((value) => value.replace(/\D/g, '')), // Remove non-numeric characters,
    username: z.string().min(10,"Username must be at least 10 characters").max(100,"Username must be no more than 100 characters"),
    pin: z.string().min(6,'Pin must be at least 6 digits').max(6,'Pin must not be more than 6 digits')
})  