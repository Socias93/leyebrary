import { useEffect, useState } from "react";
import { LibraryItem } from "../types";

interface Props {
  items: LibraryItem[];
  onDelete(id: string): void;
  onCheckOut(itemId: string, borrower: string): void;
  onReturn(itemId: string): void;
}
const NAME = "You must write your name";
const NEW_BORROWER = "Enter borrower name";

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
                      {`${item.title} - ( ${item.type} )`}
                    </h5>
                    {!item.borrowDate && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="btn btn-sm btn-outline-info position-absolute top-0 end-0 m-1 d-sm-inline-flex align-items-center justify-content-center">
                        X
                      </button>
                    )}
                  </div>
                  <p className="card-subtitle text-muted mt-2">
                    {item.category.name}
                  </p>

                  {["Book", "ReferenceBook"].includes(item.type) && (
                    <>
                      <ul className="list-unstyled mt-1">
                        <li>Author: {item.attributes?.author ?? "—"}</li>
                        <li>Pages: {item.attributes?.nbrPages ?? "—"}</li>
                      </ul>
                    </>
                  )}

                  {["DVD", "AudioBook"].includes(item.type) && (
                    <p className="mt-1">
                      Runtime: {item.attributes?.runTimeMinutes} minutes
                    </p>
                  )}
                </div>

                <div className="d-flex flex-column align-items-center mt-3">
                  {item.type === "ReferenceBook" ? (
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
