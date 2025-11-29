import * as _ from "lodash";
import { BaseItem, Columns } from "../types";

interface Props {
  items: BaseItem[];
  columns: Columns[];
}

function TableBody({ columns, items }: Props) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => {
            const cellKey = "key" in column ? column.key : column.path;
            return "content" in column ? (
              <td key={`${item.id}-${cellKey}`}>{column.content(item)}</td>
            ) : (
              <td key={`${item.id}-${cellKey}`}>{_.get(item, column.path)}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
