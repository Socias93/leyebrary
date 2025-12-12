import { LibraryItem } from "@types";
import { formatHMS } from "./utils";

interface Props {
  isOverdue: boolean;
  isBorrowed: boolean;
  handleBorrowToggle(item: LibraryItem): void;
  item: LibraryItem;
  remaining: number;
}
function LibrarySpan({
  isBorrowed,
  isOverdue,
  handleBorrowToggle,
  item,
  remaining,
}: Props) {
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
        {isOverdue ? "Late with return" : isBorrowed ? "Return" : "Borrow"}
      </span>

      {isBorrowed && remaining !== undefined && (
        <div className="text-center small text-muted">
          <div>Borrowed by: {item.borrower}</div>
          <span>{new Date(item.borrowDate!).toDateString()}</span>
          <div>
            {remaining >= 0 ? (
              <>
                Return within : {Math.floor(remaining / 3600)}h
                {Math.floor((remaining % 3600) / 60)}m{remaining % 60}s
              </>
            ) : (
              <>Late by : {formatHMS(remaining)}</>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LibrarySpan;
