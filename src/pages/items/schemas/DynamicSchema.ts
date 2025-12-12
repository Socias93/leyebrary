import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  type: z.enum(["AudioBook", "DVD", "ReferenceBook", "Book"]).optional(),
  image: z.union([z.instanceof(FileList), z.string().optional()]),
  attributes: z.object({
    author: z.string({ error: "Author is required" }).optional(),
    nbrPages: z.number({ error: "Pages is required" }).optional(),
    runTimeMinutes: z.number({ error: "You must write a number" }).optional(),
  }),
});
