import * as _ from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SortColumn, getAbbreviation } from "@/pages/utils";
import { SearchBox, Table } from "@/components/index";
import { Columns } from "@types";
import { useItems } from "@/hooks/useLibraryItems";

const SORT_ITEM: SortColumn = { path: "title", order: "asc" };

function AllItemsPage() {
  const [sortColumn, setSortColumn] = useState(SORT_ITEM);
  const [searchQuery, setSearchQuery] = useState("");
  const { items, handleReturn } = useItems();

  const navigate = useNavigate();

  const query = searchQuery.toLowerCase();

  const filtredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.category.name.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query)
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
    { path: "type", label: "Type" },
    {
      path: "category.name",
      label: "Category",
    },
    {
      key: "action",
      content: (item) =>
        item.borrower ? (
          <button
            className="btn btn-outline-dark"
            onClick={() => handleReturn(item)}>
            Return
          </button>
        ) : (
          <button
            className="btn btn-outline-info"
            onClick={() => navigate(`/edit-item/${item.id}?type=${item.type}`)}>
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
