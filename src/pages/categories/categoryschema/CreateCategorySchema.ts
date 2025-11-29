import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  fields: z
    .array(z.enum(["author", "nbrPages", "runTimeMinutes"]))
    .min(1, { message: "You must choose at least 1 field" }),
  imageUrl: z
    .instanceof(FileList)
    .refine((fl) => fl.length > 0, { message: "Image is required" }),
});
