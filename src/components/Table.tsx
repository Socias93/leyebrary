import { Columns, SortColumn } from "@pages/utils";
import { BaseItem } from "@services/utils";
import { TableBody, TableHeader } from "@components/index";

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
