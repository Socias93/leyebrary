import { useEffect, useState } from "react";
import { Audiobook, Book, DVD, LibraryItem } from "../services/fakeItemService";

interface Props {
  items: LibraryItem[];
}

function ItemsGroup({ items }: Props) {
  const [localItems, setLocalItems] = useState<LibraryItem[]>(items);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  const handleBorrowToggle = (id: string) => {
    const item = localItems.find((i) => i._id === id);
    if (!item) return;

    if (item.borrower) {
      setLocalItems((prev) =>
        prev.map((i) =>
          i._id === id
            ? {
                ...i,
                borrower: undefined,
                isBorrowable: true,
                borrowDate: undefined,
              }
            : i
        )
      );
    } else {
      const borrowerName = prompt("Enter borrower name")?.trim();
      if (!borrowerName) return;

      setLocalItems((prev) =>
        prev.map((i) =>
          i._id === id
            ? {
                ...i,
                borrower: borrowerName,
                isBorrowable: false,
                borrowDate: new Date().toISOString(),
              }
            : i
        )
      );
    }
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
            const diff = 48 * 60 * 60 * 500 - (now - borrowTime);
            newTimes[item._id] = Math.max(0, Math.floor(diff / 1000));
          }
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [localItems]);

  return (
    <div className="row g-4 mt-1 justify-content-center">
      {localItems.map((i) => (
        <div key={i._id} className="col-sm-12 col-md-6 col-lg-5">
          <div className="card h-100 shadow-sm rounded-4 m-2">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="mb-3">
                <h5 className="card-title">{i.title}</h5>
                <p className="card-subtitle text-muted">{i.category.name}</p>

                {i.type === "Book" || i.type === "Referencebook" ? (
                  <>
                    <p className="mb-1">Author: {(i as Book).author}</p>
                    <p className="mb-1">Pages: {(i as Book).nbrPages}</p>
                  </>
                ) : (
                  <p className="mb-1">
                    Runtime: {(i as DVD | Audiobook).runTimeMinutes} min
                  </p>
                )}
              </div>

              <div className="d-flex flex-column align-items-center mt-3">
                {i.type === "Referencebook" ? (
                  <span className="badge bg-secondary rounded-pill px-3 py-2 shadow-sm">
                    Not borrowable
                  </span>
                ) : i.isBorrowable ? (
                  <span
                    className="badge bg-info text-dark rounded-pill px-4 py-2 shadow-sm clickable"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleBorrowToggle(i._id)}>
                    Borrow
                  </span>
                ) : (
                  <div className="d-flex flex-column align-items-center">
                    <span
                      className="badge bg-dark rounded-pill px-4 py-2 shadow-sm clickable mb-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBorrowToggle(i._id)}>
                      Return
                    </span>
                    {i.borrower && timeLeft[i._id] !== undefined && (
                      <div className="text-center small text-muted">
                        <div>Borrowed by: {i.borrower}</div>
                        <div>
                          Time left: {Math.floor(timeLeft[i._id] / 3600)}h
                          {Math.floor((timeLeft[i._id] % 3600) / 60)}m
                          {timeLeft[i._id] % 60}s
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsGroup;
