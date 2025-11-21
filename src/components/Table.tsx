import { SortColumn } from "../pages/items/AllItemsPage";
import { Columns } from "../pages/utils";
import { BaseItem } from "../services/fakeItemService";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

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
