import { useNavigate } from "react-router-dom";
import { getItems } from "../../services/fakeFoodService";

function NewItemPage() {
  const items = getItems();
  const navigate = useNavigate();

  const uniqueCategories = Array.from(
    new Map(items.map((it) => [it.category._id, it.category])).values()
  );

  const mapCategoryToType = (categoryName: string) => {
    if (categoryName.includes("Reference")) return "Referencebook";
    if (categoryName.includes("Dvd")) return "DVD";
    if (categoryName.includes("Audio")) return "Audiobook";
    if (categoryName.includes("Book")) return "Book";
    return "DVD";
  };

  return (
    <div className="d-grid justify-content-center">
      <h1>What item would you like to create ?</h1>
      <div className="d-flex">
        {uniqueCategories.map((i) => {
          const type = mapCategoryToType(i.name);
          return (
            <button
              key={i._id}
              onClick={() => navigate(`/new-item/${i._id}?type=${type}`)}
              className="btn btn-outline-info col-2 mt-4 ms-1 w-25">
              {i.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NewItemPage;
