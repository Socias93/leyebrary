import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../services/fakeItemService";
import { paginate } from "../components/utils";
import { checkoutItem, returnItem } from "../services/fakeItemService";
import {
  ItemsGroup,
  ListGroup,
  Pagination,
  HeaderImg,
} from "../components/index";
import { BaseItem, Category, LibraryItem } from "../services/utils";
import { getCategories } from "../services/fakeCategoryService";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const PAGE_SIZE = 4;

function HomePage() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedPage, setSelectedPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);

      const { data } = await getItems();
      setItems(Array.isArray(data) ? data : []);
    }

    fetch();
  }, []);

  async function handleCheckout(itemId: string, borrower: string) {
    try {
      const { data: updatedItem } = await checkoutItem(itemId, borrower);

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? {
                ...item,
                borrower: updatedItem.borrower,
                isBorrowable: updatedItem.isBorrowable,
                borrowDate: updatedItem.borrowDate,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not checkout item");
    }
  }

  async function handleReturn(itemId: string) {
    try {
      const { data: updatedItem } = await returnItem(itemId);

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? {
                ...item,
                borrower: updatedItem.borrower,
                isBorrowable: updatedItem.isBorrowable,
                borrowDate: updatedItem.borrowDate,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not return item");
    }
  }
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
  }

  let filtredItems = selectedCategory.id
    ? itemsWithFields.filter((item) => item.category.id === selectedCategory.id)
    : itemsWithFields;

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
