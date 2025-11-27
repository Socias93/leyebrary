import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/fakeCategoryService";
import { useEffect, useState } from "react";
import { Category } from "../../services/utils";

function NewItemPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);
    }

    fetch();
  }, []);

  return (
    <div className="d-grid justify-content-center">
      <h1 className="mt-3">
        What item would you like to create <span className="text-info">?</span>
      </h1>
      <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center gap-2">
        {categories.map((c) => {
          return (
            <button
              style={{ minWidth: "120px" }}
              key={c.id}
              onClick={() =>
                navigate(`/new-item/new?category=${c.id}&type=${c.name}`)
              }
              className="btn btn-outline-info mt-4 m-2">
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NewItemPage;
