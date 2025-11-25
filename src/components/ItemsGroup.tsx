import { useEffect, useState } from "react";
import { LibraryItem } from "../services/utils";

interface Props {
  items: LibraryItem[];
  onDelete(id: string): void;
}

function ItemsGroup({ items, onDelete }: Props) {
  const [localItems, setLocalItems] = useState<LibraryItem[]>(items);
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  const handleBorrowToggle = (id: string) => {
    const item = localItems.find((i) => i.id === id);
    if (!item) return;

    if (item.borrower) {
      setLocalItems((prev) =>
        prev.map((i) =>
          i.id === id
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
          i.id === id
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
            newTimes[item.id] = Math.max(0, Math.floor(diff / 1000));
          }
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [localItems]);

  return (
    <div className="container-lg px-3 py-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 g-4 justify-content-center">
        {localItems.map((i) => (
          <div key={i.id} className="col-12 col-sm-6 my-4 d-flex">
            <div className="card h-100 w-100 shadow-sm rounded-4">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="mb-3">
                  <div className="position-relative">
                    <h5 className="card-title mb-0 pe-5 text-truncate">
                      {i.title}
                    </h5>
                    {!i.borrowDate && (
                      <button
                        onClick={() => onDelete(i.id)}
                        className="btn btn-sm btn-outline-info position-absolute top-0 end-0 m-1 d-sm-inline-flex align-items-center justify-content-center">
                        X
                      </button>
                    )}
                  </div>
                  <p className="card-subtitle text-muted">{i.category.name}</p>

                  {i.category.fields?.map((field) => {
                    let label = "";
                    let value: string | number = "";

                    switch (field) {
                      case "author":
                        label = "Author";
                        value = (i as any).author;
                        break;
                      case "nbrPages":
                        label = "Pages";
                        value = (i as any).nbrPages;
                        break;
                      case "runTimeMinutes":
                        label = "Runtime (minutes)";
                        value = (i as any).runTimeMinutes;
                        break;
                      default:
                        label = field;
                        value = (i as any)[field];
                    }

                    if (value === undefined || value === null) return null;

                    return (
                      <p className="mb-1" key={i.id + "_" + field}>
                        {label}: {value}
                      </p>
                    );
                  })}
                </div>

                <div className="d-flex flex-column align-items-center mt-3">
                  {i.category.name === "Referencebook" ? (
                    <span className="badge bg-secondary rounded-pill px-3 py-2 shadow-sm">
                      Not borrowable
                    </span>
                  ) : i.isBorrowable ? (
                    <span
                      className="badge bg-info text-dark rounded-pill px-4 py-2 shadow-sm clickable"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleBorrowToggle(i.id)}>
                      Borrow
                    </span>
                  ) : (
                    <div className="d-flex flex-column align-items-center">
                      <span
                        className="badge bg-dark rounded-pill px-4 py-2 shadow-sm clickable mb-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleBorrowToggle(i.id)}>
                        Return
                      </span>
                      {i.borrower && timeLeft[i.id] !== undefined && (
                        <div className="text-center small text-muted">
                          <div>Borrowed by: {i.borrower}</div>
                          <span>{new Date(i.borrowDate!).toDateString()}</span>
                          <div>
                            Return within : {Math.floor(timeLeft[i.id] / 3600)}h
                            {Math.floor((timeLeft[i.id] % 3600) / 60)}m
                            {timeLeft[i.id] % 60}s
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
