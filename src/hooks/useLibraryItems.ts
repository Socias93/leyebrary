import { useEffect, useState } from "react";
import { checkoutItem, getItems, returnItem } from "@/services/itemService";
import { BaseItem } from "@types";

export function useItems() {
  const [items, setItems] = useState<BaseItem[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const { data } = await getItems();
      setItems(Array.isArray(data) ? data : []);
    }
    fetchItems();
  }, []);

  async function handleCheckout(itemId: string, borrower: string) {
    try {
      const { data: updatedItem } = await checkoutItem(itemId, borrower);
      setItems((prev) =>
        prev.map((i) =>
          i.id === updatedItem.id ? { ...i, ...updatedItem } : i
        )
      );
      console.log(
        `${updatedItem.borrower} borrowed ${updatedItem.title} - ${updatedItem.type}`
      );
    } catch (err) {
      console.error(err);
      alert("Could not checkout item");
    }
  }

  async function handleReturn(item: BaseItem) {
    try {
      const { data: updatedItem } = await returnItem(item.id);

      setItems((prev) =>
        prev.map((i) =>
          i.id === updatedItem.id ? { ...i, ...updatedItem } : i
        )
      );
      console.log(
        `${item.borrower} returned ${updatedItem.title} - ${updatedItem.type}`
      );
    } catch (err) {
      console.error(err);
      alert("Could not return item");
    }
  }

  return { items, setItems, handleCheckout, handleReturn };
}
