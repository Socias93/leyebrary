import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/fakeCategoryService";

function NewCategoryPage() {
  const category = getCategories();
  const navigate = useNavigate();

  return (
    <>
      <div className="d-grid justify-content-center">
        <h1>What item would you like to create ?</h1>
        <div className="d-flex">
          {category.map((c) => (
            <button
              onClick={() => navigate(`/new-category/${c._id}`)}
              key={c._id}
              className="btn btn-outline-info col-2 mt-4 ms-1 w-25 ">
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewCategoryPage;
