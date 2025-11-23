import { z } from "zod";
import { Category } from "../../../services/Utils";

export function getDynamicSchema(category?: Category) {
  const shape: Record<string, any> = {
    _id: z.string().optional(),
    title: z.string().min(1, { message: "Title is mandatory" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
  };

  category?.fields?.forEach((field) => {
    switch (field) {
      case "author":
        shape.author = z.string().min(1, { message: "Author is required" });
        break;
      case "nbrPages":
        shape.nbrPages = z
          .number({ error: "Must be a number" })
          .min(1, { message: "Pages must be at least 1" });
        break;
      case "runTimeMinutes":
        shape.runTimeMinutes = z
          .number({ error: "Must be a number" })
          .min(1, { message: "Time must be at least 1" });
        break;
    }
  });

  return z.object(shape);
}
