import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemForm } from "@/pages/utils";
import { itemSchema } from "@/pages/items/schemas/DynamicSchema";
import { AttributeField } from "@/components/FormField";

const ALL_ATTRIBUTE_KEYS: Array<keyof ItemForm["attributes"]> = [
  "author",
  "nbrPages",
  "runTimeMinutes",
];

export function useItemForm() {
  const form = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
  });

  const watchedType = form.watch("type");

  const fieldsToShow = useMemo<AttributeField[]>(() => {
    switch (watchedType) {
      case "Book":
      case "ReferenceBook":
        return ["author", "nbrPages"];
      case "DVD":
      case "AudioBook":
        return ["runTimeMinutes"];
      default:
        return [];
    }
  }, [watchedType]);

  useEffect(() => {
    ALL_ATTRIBUTE_KEYS.forEach((key) => {
      if (!fieldsToShow.includes(key as AttributeField)) {
        form.setValue(`attributes.${key}`, undefined);
      }
    });
  }, [fieldsToShow, form]);

  return {
    ...form,
    watchedType,
    fieldsToShow,
  };
}
