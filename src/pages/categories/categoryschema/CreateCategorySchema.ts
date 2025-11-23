import { z } from "zod";
import { getCategories } from "../../../services/Utils";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .refine((name) => {
      const exists = getCategories().some(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      );
      return !exists;
    }, "Category already exists"),
  fields: z.array(z.enum(["author", "nbrPages", "runTimeMinutes"])).optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
