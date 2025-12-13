import { useEffect, useState } from "react";
import { paginate } from "@/components/utils";
import { getCategories } from "@/services/categoryService";
import { Category, LibraryItem } from "@types";
import { useItems } from "@/hooks/useLibraryItems";
import { deleteItem, getItems } from "@/services//itemService";
import {
  ItemsGroup,
  ListGroup,
  Pagination,
  HeaderImg,
  HandleFilterItem,
  SearchBox,
} from "@/components/index";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const PAGE_SIZE = 4;

function HomePage() {
  const { items, handleCheckout, handleReturn, setItems } = useItems();
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedPage, setSelectedPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowFilter, setBorrowFilter] = useState<
    "all" | "borrowed" | "available"
  >("all");

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);

      const { data } = await getItems();
      setItems(Array.isArray(data) ? data : []);
    }

    fetch();
  }, []);

  const itemsWithFields = items.map((item) => {
    const categoryId = item.category?.id;
    const category = categories.find((c) => c.id === categoryId);
    return {
      ...item,
      category: {
        ...item.category,
        fields: category?.fields || [],
      },
    } as LibraryItem;
  });

  function handleDelete(id: string) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    deleteItem(id);

    const newPageCount = Math.max(1, Math.ceil(newItems.length / PAGE_SIZE));

    if (selectedPage > newPageCount) {
      setSelectedPage(newPageCount);
    }
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
    setBorrowFilter("all");
    setSearchQuery("");
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
    setSelectedPage(1);
  }

  function handleBorrowFilter(value: "all" | "borrowed" | "available") {
    setBorrowFilter(value);
    setSelectedPage(1);
  }

  let filtredItems = selectedCategory.id
    ? itemsWithFields.filter((item) => item.category.id === selectedCategory.id)
    : itemsWithFields;

  filtredItems = filtredItems.filter((item) => {
    if (borrowFilter === "borrowed") return !!item.borrower;
    if (borrowFilter === "available") return !item.borrower;
    return items;
  });
  const query = searchQuery.toLowerCase();

  if (query) {
    filtredItems = filtredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.borrower?.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
  }

  const paginatedItems = paginate(filtredItems, PAGE_SIZE, selectedPage);

  const eye = <i className="fa-solid fa-eye text-info"></i>;

  return (
    <>
      <HeaderImg />
      <div className="d-grid justify-content-center">
        <h1 className="text-center">L{eye}brary </h1>
        <div className="d-flex">
          <ListGroup
            items={[DEFAULT_CATEGORY, ...categories]}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="m-3">
          <SearchBox value={searchQuery} onChange={handleSearch} />
        </div>
        <HandleFilterItem
          borrowFilter={borrowFilter}
          setBorrowFilter={handleBorrowFilter}
        />
      </div>

      <ItemsGroup
        items={paginatedItems}
        onDelete={handleDelete}
        onCheckOut={handleCheckout}
        onReturn={handleReturn}
      />
      <Pagination
        pageSize={PAGE_SIZE}
        totalCount={filtredItems.length}
        onPageSelect={setSelectedPage}
        selectedPage={selectedPage}
      />
    </>
  );
}

export default HomePage;
