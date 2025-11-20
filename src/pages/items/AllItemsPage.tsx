import { JSX, useState } from "react";
import { BaseItem, deleteItem, getItems } from "../../services/fakeItemService";
import { useNavigate } from "react-router-dom";
import { th } from "zod/locales";

interface TextColumn {
  path: string;
  label: string;
}

interface ContentColumn {
  key: string;
  content: (item: BaseItem) => JSX.Element;
}

type Columns = TextColumn | ContentColumn;

function AllItemsPage() {
  const [items, setItems] = useState(getItems());
  const [sortColumn, setSortColumn] = useState();
  const navigate = useNavigate();

  function handleDelete(id: string) {
    const newItem = items.filter((item) => item._id !== id);
    setItems(newItem);
    deleteItem(id);
  }

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
      key: "delete",
      content: (item) => (
        <button
          onClick={() => handleDelete(item._id)}
          className="btn btn-outline-dark">
          Delete
        </button>
      ),
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
  ];

  return (
    <>
      <table className="table">
        <thead className="table-info">
          <tr>
            {columns.map((column) =>
              "path" in column ? (
                <th scope="col" key={column.path}>
                  {column.label}
                </th>
              ) : (
                <th key={column.key} />
              )
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title} </td>
              <td> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllItemsPage;
