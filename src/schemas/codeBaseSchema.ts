import { z } from "zod";

export const codeBaseSchema = z.object({
    language_name: z.string(), // Remove non-numeric characters,
    language_category: z.string(), // Remove non-numeric characters,
    programe_name: z.string(), // Remove non-numeric characters,
    programe_code: z.string(), // Remove non-numeric characters,
})  