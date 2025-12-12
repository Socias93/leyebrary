import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Category name is required"),
  image: z.union([z.instanceof(FileList), z.string().optional()]),
});
