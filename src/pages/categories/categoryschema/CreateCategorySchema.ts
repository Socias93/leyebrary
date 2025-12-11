import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Category name is required"),
  image: z
    .instanceof(FileList)
    .refine((fl) => fl.length > 0, { message: "Image is required" }),
});
