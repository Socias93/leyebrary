import { useState } from "react";
import { getItems } from "../../services/fakeItemService";
import { useNavigate } from "react-router-dom";
import { Columns, SortColumn, getAbbreviation } from "../utils";
import { SearchBox, Table } from "../../components/index";
import _ from "lodash";

const SORT_ITEM: SortColumn = { path: "title", order: "asc" };

function AllItemsPage() {
  const items = getItems();
  const [sortColumn, setSortColumn] = useState(SORT_ITEM);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const query = searchQuery.toLowerCase();

  const filtredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.category.name.toLowerCase().includes(query)
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
      content: (item) => {
        const abbr = getAbbreviation(item.title);
        return (
          <>
            {item.title}
            {abbr ? <span className="text-muted ms-2">({abbr})</span> : null}
          </>
        );
      },
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
            navigate(`/edit-item/${item.id}?type=${item.category.name}`)
          }
          className="btn btn-outline-info">
          Edit
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
