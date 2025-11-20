import { useNavigate } from "react-router-dom";
import { getItems } from "../../services/fakeItemService";

function NewItemPage() {
  const items = getItems();
  const navigate = useNavigate();

  const uniqueCategories = Array.from(
    new Map(items.map((it) => [it.category._id, it.category])).values()
  );

  return (
    <div className="d-grid justify-content-center">
      <h1>What item would you like to create ?</h1>
      <div className="d-flex">
        {uniqueCategories.map((i) => {
          return (
            <button
              key={i._id}
              onClick={() => navigate(`/new-item/${i._id}?type=${i.name}`)}
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
