import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SortColumn, getAbbreviation } from "../../pages/utils";
import { getItems } from "../../services/itemService";
import { SearchBox, Table } from "../../components/index";
import * as _ from "lodash";
import { BaseItem, Columns } from "../../types";

const SORT_ITEM: SortColumn = { path: "title", order: "asc" };

function AllItemsPage() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [sortColumn, setSortColumn] = useState(SORT_ITEM);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const { data: items } = await getItems();
      setItems(items);
    }

    fetch();
  }, []);

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
    { path: "type", label: "Type" },
    {
      path: "category.name",
      label: "Category",
    },
    {
      key: "edit",
      content: (item) => (
        <button
          onClick={() => navigate(`/edit-item/${item.id}?type=${item}`)}
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
