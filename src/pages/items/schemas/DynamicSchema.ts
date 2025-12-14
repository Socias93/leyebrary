import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  type: z.enum(["AudioBook", "DVD", "ReferenceBook", "Book"], {
    message: "Type is required",
  }),
  image: z
    .union([z.instanceof(FileList), z.string()])
    .refine(
      (val) =>
        (val instanceof FileList && val.length > 0) ||
        (typeof val === "string" && val.length > 0),
      { message: "Image is required" }
    ),
  attributes: z.object({
    author: z
      .string()
      .optional()
      .refine((val) => val === undefined || val.length > 0, {
        message: "Author is required if filled",
      }),
    nbrPages: z.number({ message: "Pages is required" }).optional(),
    runTimeMinutes: z.number({ message: "You must write a number" }).optional(),
  }),
});
