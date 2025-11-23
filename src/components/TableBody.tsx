import _ from "lodash";
import { Columns } from "../pages/utils";
import { BaseItem } from "../services/Utils";

interface Props {
  items: BaseItem[];
  columns: Columns[];
}

function TableBody({ columns, items }: Props) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => {
            const cellKey = "key" in column ? column.key : column.path;
            return "content" in column ? (
              <td key={`${item._id}-${cellKey}`}>{column.content(item)}</td>
            ) : (
              <td key={`${item._id}-${cellKey}`}>{_.get(item, column.path)}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
