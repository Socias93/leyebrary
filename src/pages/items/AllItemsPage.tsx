import { useState } from "react";
import { deleteItem, getItems } from "../../services/fakeItemService";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Columns } from "../utils";
import Table from "../../components/Table";

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

  return (
    <>
      <Table
        columns={columns}
        items={sortedItems}
        onSort={setSortColumn}
        sortColumn={sortColumn}
      />
    </>
  );
}

export default AllItemsPage;
