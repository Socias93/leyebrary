import { useEffect, useState } from "react";
import { LibraryItem } from "@types";

const BORROW_TTL_MS = 24 * 60 * 60 * 1000;

export function useBorrowTimer(items: LibraryItem[]) {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes: Record<string, number> = {};
      items.forEach((item) => {
        if (item.borrower && item.borrowDate) {
          const borrowTime = new Date(item.borrowDate).getTime();
          const now = Date.now();
          newTimes[item.id] = Math.floor(
            (borrowTime + BORROW_TTL_MS - now) / 1000
          );
        }
      });
      setTimeLeft(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  return timeLeft;
}
