import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["AudioBook", "DVD", "ReferenceBook", "Book"]).optional(),

  imageUrl: z
    .instanceof(FileList)
    .refine((fl) => fl.length > 0, { message: "Image is required" }),
});
