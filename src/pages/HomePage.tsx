import { useState } from "react";
import { deleteItem, getItems } from "../services/fakeItemService";
import { paginate } from "../components/utils";
import {
  ItemsGroup,
  ListGroup,
  Pagination,
  HeaderImg,
} from "../components/index";
import { Category, getCategories } from "../services/utils";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const PAGE_SIZE = 4;

function HomePage() {
  const [items, setItems] = useState(getItems());
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedPage, setSelectedPage] = useState(1);
  const categories = getCategories();

  const itemsWithFields = items.map((item) => {
    const category = categories.find((c) => c.id === item.category.id);
    return {
      ...item,
      category: {
        ...item.category,
        fields: category?.fields || [],
      },
    };
  });

  function handleDelete(id: string) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    deleteItem(id);
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
            items={[DEFAULT_CATEGORY, ...getCategories()]}
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <ItemsGroup items={paginatedItems} onDelete={handleDelete} />
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
