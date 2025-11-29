import { Columns, SortColumn } from "@pages/utils";

interface Props {
  columns: Columns[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

function TableHeader({ columns, onSort, sortColumn }: Props) {
  function handleSort(path: string) {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort({ ...sortColumn });
  }

  return (
    <thead className="table-info">
      <tr>
        {columns.map((column) =>
          "path" in column ? (
            <th
              className="clickable"
              onClick={() => handleSort(column.path)}
              scope="col"
              key={column.path}>
              {column.label}
            </th>
          ) : (
            <th key={column.key} />
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
