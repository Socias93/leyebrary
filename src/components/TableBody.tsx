import _ from "lodash";
import { Columns } from "../pages/utils";
import { BaseItem } from "../services/fakeItemService";

interface Props {
  items: BaseItem[];
  columns: Columns[];
}

function TableBody({ columns, items }: Props) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) =>
            "path" in column ? (
              <td key={column.path}>{_.get(item, column.path)} </td>
            ) : (
              <td key={column.key}> {column.content(item)} </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
