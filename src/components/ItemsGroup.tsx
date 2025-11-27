import { useEffect, useState } from "react";
import { BaseItem, LibraryItem } from "../services/utils";

interface Props {
  items: LibraryItem[];
  onDelete(id: string): void;
  onCheckOut(itemId: string, borrower: string): void;
  onReturn(itemId: string): void;
}

function ItemsGroup({ items, onDelete, onCheckOut, onReturn }: Props) {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  // Timer för alla items
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes: Record<string, number> = {};
      items.forEach((item) => {
        if (item.borrower && item.borrowDate) {
          const borrowTime = new Date(item.borrowDate).getTime();
          const now = Date.now();
          const diff = 48 * 60 * 60 * 1000 - (now - borrowTime); // 48h
          newTimes[item.id] = Math.max(0, Math.floor(diff / 1000));
        }
      });
      setTimeLeft(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const handleBorrowToggle = (item: LibraryItem) => {
    if (item.borrower) {
      // Return
      onReturn(item.id);
    } else {
      const borrowerName = prompt("Enter borrower name")?.trim();
      if (!borrowerName) return;

      onCheckOut(item.id, borrowerName);
    }
  };

  return (
    <div className="container-lg px-3 py-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-4 justify-content-center">
        {items.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 my-4 d-flex">
            <div className="card h-100 w-100 shadow-sm rounded-4">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="mb-3">
                  <div className="position-relative">
                    <h5 className="card-title mb-0 pe-5 text-truncate">
                      {item.title}
                    </h5>
                    {!item.borrowDate && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="btn btn-sm btn-outline-info position-absolute top-0 end-0 m-1 d-sm-inline-flex align-items-center justify-content-center">
                        X
                      </button>
                    )}
                  </div>
                  <p className="card-subtitle text-muted">
                    {item.category.name}
                  </p>

                  {item.category.fields?.map((field) => {
                    let label = "";
                    let value: string | number = "";

                    switch (field) {
                      case "author":
                        label = "Author";
                        value = item.attributes?.author;
                        break;
                      case "nbrPages":
                        label = "Pages";
                        value = item.attributes?.nbrPages;
                        break;
                      case "runTimeMinutes":
                        label = "Runtime (minutes)";
                        value = item.attributes?.runTimeMinutes;
                        break;
                      default:
                        label = field;
                        value = (item as any)[field];
                    }

                    if (value === undefined || value === null) return null;

                    return (
                      <p className="mb-1" key={item.id + "_" + field}>
                        {label}: {value}
                      </p>
                    );
                  })}
                </div>

                <div className="d-flex flex-column align-items-center mt-3">
                  {item.category.name === "Referencebook" ? (
                    <span className="badge bg-secondary rounded-pill px-3 py-2 shadow-sm">
                      Not borrowable
                    </span>
                  ) : (
                    <div className="d-flex flex-column align-items-center">
                      <span
                        className={`badge ${
                          item.borrower ? "bg-dark" : "bg-info text-dark"
                        } rounded-pill px-4 py-2 shadow-sm clickable mb-2`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleBorrowToggle(item)}>
                        {item.borrower ? "Return" : "Borrow"}
                      </span>
                      {item.borrower && timeLeft[item.id] !== undefined && (
                        <div className="text-center small text-muted">
                          <div>Borrowed by: {item.borrower}</div>
                          <span>
                            {new Date(item.borrowDate!).toDateString()}
                          </span>
                          <div>
                            Return within :{" "}
                            {Math.floor(timeLeft[item.id] / 3600)}h
                            {Math.floor((timeLeft[item.id] % 3600) / 60)}m
                            {timeLeft[item.id] % 60}s
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
    </div>
  );
}

export default ItemsGroup;
