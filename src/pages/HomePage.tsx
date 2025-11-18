import { useState } from "react";
import { Category, getCategories } from "../services/fakeCategoryService";
import { getItems } from "../services/fakeFoodService";
import { paginate } from "../components/utils";
import { ItemsGroup, ListGroup, Pagination, Navbar } from "../components/index";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };
const PAGE_SIZE = 5;

function HomePage() {
  const [items, setItems] = useState(getItems());
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedPage, setSelectedPage] = useState(1);

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  let filtredItems = selectedCategory._id
    ? items.filter((item) => item.category._id === selectedCategory._id)
    : items;

  const paginatedItems = paginate(filtredItems, PAGE_SIZE, selectedPage);

  const eye = <i className="fa-solid fa-eye text-info"></i>;

  return (
    <>
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
      <ItemsGroup items={paginatedItems} />
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
