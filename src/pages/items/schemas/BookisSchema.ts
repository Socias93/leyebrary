import z from "zod";

export const bookishSchema = z.object({
  title: z.string().min(1, { message: "Title is mandatory" }),
  categoryId: z.string().min(1, { message: "Category is requried" }),
  author: z.string().min(1, { message: "Author is required" }),
  nbrPages: z.number().min(1, { message: "Pages cant be less than 1" }),
});

export type BookishFormData = z.infer<typeof bookishSchema>;
