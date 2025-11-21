import { useEffect, useState } from "react";
import { Audiobook, Book, DVD, LibraryItem } from "../services/fakeItemService";

interface Props {
  items: LibraryItem[];
}

function ItemsGroup({ items }: Props) {
  const [localItems, setLocalItems] = useState<LibraryItem[]>(items);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  const handleBorrowToggle = (id: string) => {
    setLocalItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          if (item.borrower) {
            return { ...item, borrower: undefined, isBorrowable: true };
          } else {
            return {
              ...item,
              borrower: "You",
              isBorrowable: false,
              borrowDate: new Date().toISOString(),
            };
          }
        }
        return item;
      })
    );
  };

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(() => {
        const newTimes: Record<string, number> = {};
        localItems.forEach((item) => {
          if (item.borrower && item.borrowDate) {
            const borrowTime = new Date(item.borrowDate).getTime();
            const now = Date.now();
            const diff = 48 * 60 * 60 * 1000 - (now - borrowTime); // 48 timmar i ms
            newTimes[item._id] = Math.max(0, Math.floor(diff / 1000)); // sekunder kvar
          }
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [localItems]);

  return (
    <div className="d-flex justify-content-center row row cols-4 text-center mt-4 ">
      {localItems.map((i) => (
        <div key={i._id} className="col-3 m-2">
          <div className="d-grid justify-content-center h-100 p-4 border border-dark rounded-4 ">
            <div className="position-relative"></div>
            <h5 className="mb-1">{i.title}</h5>
            <p className="small mb-0">{i.category.name}</p>
            {i.type === "Book" || i.type === "Referencebook" ? (
              <>
                <p className="mb-1">Author : {(i as Book).author}</p>
                <p className="mb-1">Pages : {(i as Book).nbrPages}</p>
              </>
            ) : i.type === "DVD" || i.type === "Audiobook" ? (
              <p className="mb-1">
                Runtime : {(i as DVD | Audiobook).runTimeMinutes} minutes
              </p>
            ) : null}

            <div
              className="d-flex justify-content-center"
              style={{ width: 400, height: 30 }}>
              {i.type === "Referencebook" ? (
                <span className="badge bg-secondary rounded-pill p-2 shadow">
                  Not borrowable
                </span>
              ) : i.isBorrowable ? (
                <span
                  className="clickable badge bg-info rounded-pill p-2 shadow"
                  onClick={() => handleBorrowToggle(i._id)}>
                  Borrow
                </span>
              ) : (
                <div className="d-grid justify-content-center">
                  <span
                    className="clickable badge bg-dark rounded-pill p-2 shadow"
                    onClick={() => handleBorrowToggle(i._id)}>
                    Return
                  </span>
                  {i.borrower && timeLeft[i._id] !== undefined && (
                    <span>
                      Time left: {Math.floor(timeLeft[i._id] / 3600)}h
                      {Math.floor((timeLeft[i._id] % 3600) / 60)}m
                      {timeLeft[i._id] % 60}s
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsGroup;
