import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/Utils";

function NewItemPage() {
  const categories = getCategories();
  const navigate = useNavigate();

  return (
    <div className="d-grid justify-content-center">
      <h1 className="mt-3">
        What item would you like to create <span className="text-info">?</span>
      </h1>
      <div className="d-flex justify-content-center">
        {categories.map((c) => {
          return (
            <button
              key={c._id}
              onClick={() =>
                navigate(`/new-item/new?category=${c._id}&type=${c.name}`)
              }
              className="btn btn-outline-info col-2 mt-4 ms-3 w-25">
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NewItemPage;
