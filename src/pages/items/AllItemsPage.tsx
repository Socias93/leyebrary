import { useState } from "react";
import { deleteItem, getItems } from "../../services/fakeItemService";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Columns } from "../utils";

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

const SORT_ITEM: SortColumn = { path: "title", order: "asc" };

function AllItemsPage() {
  const [items, setItems] = useState(getItems());
  const [sortColumn, setSortColumn] = useState(SORT_ITEM);
  const navigate = useNavigate();

  function handleDelete(id: string) {
    const newItem = items.filter((item) => item._id !== id);
    setItems(newItem);
    deleteItem(id);
  }

  const sortedItems = _.orderBy(items, sortColumn.path, sortColumn.order);

  const columns: Columns[] = [
    {
      path: "title",
      label: "Title",
    },
    {
      path: "category.name",
      label: "Category",
    },
    {
      key: "edit",
      content: (item) => (
        <button
          onClick={() =>
            navigate(`/edit-item/${item._id}?type=${item.category.name}`)
          }
          className="btn btn-outline-info">
          Edit
        </button>
      ),
    },
    {
      key: "delete",
      content: (item) => (
        <button
          onClick={() => handleDelete(item._id)}
          className="btn btn-outline-dark">
          Delete
        </button>
      ),
    },
  ];

  function handleSort(path: string) {
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    setSortColumn({ ...sortColumn });
  }

  return (
    <>
      <table className="table">
        <thead className="table-info">
          <tr>
            {columns.map((column) =>
              "path" in column ? (
                <th
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
        <tbody>
          {sortedItems.map((item) => (
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
      </table>
    </>
  );
}

export default AllItemsPage;
