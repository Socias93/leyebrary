import { useState } from "react";
import "./App.css";
import { getItems } from "./services/fakeFoodService";
import Listgroup from "./components/Listgroup";
import { Category, getCategories } from "./services/fakeCategoryService";
import Pagination from "./components/Pagination";
import { paginate } from "./components/utils";

const DEFAULT_CATEGORY: Category = { _id: "", name: "All Categories" };
const PAGE_SIZE = 5;

function App() {
  const [items, setItems] = useState(getItems());
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [selectedPage, setSelectedPage] = useState(1);

  let filtredItems = selectedCategory._id
    ? items.filter((item) => item.category._id === selectedCategory._id)
    : items;

  const paginatedItems = paginate(filtredItems, PAGE_SIZE, selectedPage);

  const eye = <i className="fa-solid fa-eye"></i>;
  return (
    <>
      <div className="d-grid justify-content-center">
        <h1 className="text-center">L{eye}brary </h1>
        <div className="d-flex">
          <Listgroup
            items={[DEFAULT_CATEGORY, ...getCategories()]}
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center row row cols-4 text-center mt-4 ">
        {paginatedItems.map((i) => (
          <div key={i._id} className="col-3 m-2">
            <div className="d-grid justify-content-center h-100 p-3 border border-dark rounded-4 ">
              <div className="position-relative"></div>
              <h5 className="mt-2 mb-1">{i.title}</h5>
              <p className="small mb-0">{i.category.name}</p>
              <div className="d-flex justify-content-between m-4"></div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageSize={PAGE_SIZE}
        totalCount={filtredItems.length}
        onPageSelect={setSelectedPage}
        selectedPage={selectedPage}
      />
    </>
  );
}

export default App;
