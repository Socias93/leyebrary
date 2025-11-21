import { useState } from "react";
import { deleteItem, getItems } from "../../services/fakeItemService";
import { useNavigate } from "react-router-dom";
import { Columns, SortColumn } from "../utils";
import { Table, SearchBox } from "../../components";
import _ from "lodash";

const SORT_ITEM: SortColumn = { path: "title", order: "asc" };

function AllItemsPage() {
  const [items, setItems] = useState(getItems());
  const [sortColumn, setSortColumn] = useState(SORT_ITEM);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleDelete(id: string) {
    const newItem = items.filter((item) => item._id !== id);
    setItems(newItem);
    deleteItem(id);
  }

  const filtredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = _.orderBy(
    filtredItems,
    sortColumn.path,
    sortColumn.order
  );

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
      <div className="mb-3 p-1 w-25">
        <SearchBox value={searchQuery} onChange={setSearchQuery} />
      </div>
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
