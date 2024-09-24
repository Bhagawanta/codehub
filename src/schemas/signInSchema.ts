import { z } from "zod";

export const signInSchema = z.object({
    mobile: z.string()
    .max(10, { message: "Mobile number must be at least 10 digit"})
    .regex(/^[0-9]+$/, { message: "Please provide mobile number"}) // Ensure only numbers are allowed
    .transform((value) => value.replace(/\D/g, '')), // Remove non-numeric characters,
    pin: z.string().min(6).max(6,'Pin must not be more than 6 digits')
})  