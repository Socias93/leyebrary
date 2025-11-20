import z from "zod";

export const isTimeBasedSchema = z.object({
  _id: z.string().optional(),

  title: z.string().min(1, { message: "Title is mandatory" }),
  categoryId: z.string().min(1, { message: "Category is requried" }),
  runTimeMinutes: z
    .number()
    .min(1, { message: "Time cant be less than 1 minute" })
    .optional(),
});

export type TimeBasedFormData = z.infer<typeof isTimeBasedSchema>;
