interface Props {
  borrowFilter: "all" | "borrowed" | "available";
  setBorrowFilter: (value: "all" | "borrowed" | "available") => void;
}

function HandleFilterItem({ borrowFilter, setBorrowFilter }: Props) {
  return (
    <div className="mb-1 mt-3 d-flex justify-content-center gap-2">
      <label className="form-label mb-0 align-self-center">
        Filter by status:
      </label>
      <select
        className="form-select w-auto"
        value={borrowFilter}
        onChange={(e) => setBorrowFilter(e.target.value as any)}>
        <option value="all">All</option>
        <option value="borrowed">Borrowed</option>
        <option value="available">Available</option>
      </select>
    </div>
  );
}

export default HandleFilterItem;
