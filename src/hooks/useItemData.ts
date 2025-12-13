import { useState, useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import { getItem } from "@/services/itemService";
import { Category } from "@types";

export function useItemData(id?: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data: categories } = await getCategories();
      setCategories(categories);

      if (!id || id === "new") {
        setItem(null);
      } else {
        const { data } = await getItem(id);
        setItem(data || null);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  return { categories, item, loading };
}
