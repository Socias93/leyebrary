import { z } from "zod";

export const itemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  categoryId: z.string(),
  attributes: z.object({
    author: z.string().optional(),
    nbrPages: z.number().optional(),
    runTimeMinutes: z.number().optional(),
  }),
});

export type ItemForm = z.infer<typeof itemSchema>;
