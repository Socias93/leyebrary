import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  imageUrl: z.string().min(1, { message: "You must add an image" }),

  fields: z
    .array(z.enum(["author", "nbrPages", "runTimeMinutes"]))
    .min(1, { message: "You must choose at least 1 field" }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
