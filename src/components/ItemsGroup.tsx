import { useEffect, useState } from "react";
import { LibraryItem } from "@services/utils";

interface Props {
  items: LibraryItem[];
  onDelete(id: string): void;
  onCheckOut(itemId: string, borrower: string): void;
  onReturn(itemId: string): void;
}
const NAME = "You must write your name";
const NEW_NAME = "Enter your name to return the item";
const NEW_BORROWER = "Enter borrower name";
const WRONG_RETURN = "Wrong name! This item is borrowed by";

function formatHMS(totalSeconds: number) {
  const abs = Math.abs(totalSeconds);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = Math.floor(abs % 60);
  return `${h}h ${m}m ${s}s`;
}

const BORROW_TTL_MS = 24 * 60 * 60 * 1000;

function ItemsGroup({ items, onDelete, onCheckOut, onReturn }: Props) {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes: Record<string, number> = {};
      items.forEach((item) => {
        if (item.borrower && item.borrowDate) {
          const borrowTime = new Date(item.borrowDate).getTime();
          const now = Date.now();
          const remaningSeconds = Math.floor(
            (borrowTime + BORROW_TTL_MS - now) / 1000
          );
          newTimes[item.id] = remaningSeconds;
        }
      });
      setTimeLeft(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const handleBorrowToggle = (item: LibraryItem) => {
    if (item.borrower) {
      const returnerName = prompt(NEW_NAME)?.trim();
      if (!returnerName) {
        alert(NAME);
        return;
      }

      if (returnerName !== item.borrower) {
        alert(`${WRONG_RETURN} ${item.borrower}`);
        return;
      }

      onReturn(item.id);
    } else {
      const borrowerName = prompt(NEW_BORROWER)?.trim();
      if (!borrowerName) {
        alert(NAME);
        return;
      }
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
                      {(() => {
                        const remaining = timeLeft[item.id];
                        const isOverdue =
                          remaining !== undefined && remaining < 0;
                        const isBorrowed = !!item.borrower;

                        return (
                          <>
                            <span
                              className={`clickable badge rounded-pill px-4 py-2 shadow-sm clickable mb-2 ${
                                isOverdue
                                  ? "bg-danger text-white"
                                  : isBorrowed
                                  ? "bg-dark text-white"
                                  : "bg-info text-dark"
                              }`}
                              onClick={() => handleBorrowToggle(item)}>
                              {isOverdue
                                ? "Late with return"
                                : isBorrowed
                                ? "Return"
                                : "Borrow"}
                            </span>

                            {isBorrowed && remaining !== undefined && (
                              <div className="text-center small text-muted">
                                <div>Borrowed by: {item.borrower}</div>
                                <span>
                                  {new Date(item.borrowDate!).toDateString()}
                                </span>
                                <div>
                                  {remaining >= 0 ? (
                                    <>
                                      Return within :{" "}
                                      {Math.floor(remaining / 3600)}h
                                      {Math.floor((remaining % 3600) / 60)}m
                                      {remaining % 60}s
                                    </>
                                  ) : (
                                    <>Late by : {formatHMS(remaining)}</>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
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
