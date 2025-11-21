import { BaseItem } from "../services/fakeItemService";
import { Columns, SortColumn } from "../pages/utils";
import { TableBody, TableHeader } from "./index";

interface Props {
  columns: Columns[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  items: BaseItem[];
}

function Table({ columns, onSort, sortColumn, items }: Props) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} items={items} />
    </table>
  );
}

export default Table;
