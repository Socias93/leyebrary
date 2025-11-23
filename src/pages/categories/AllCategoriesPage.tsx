import { useEffect, useState } from "react";
import { getCategories } from "../../services/Utils";
import { getItems } from "../../services/fakeItemService";

function AllCategoriesPage() {
  const [categories, setCategories] = useState(getCategories());
  const [items, setItems] = useState(() => getItems());

  useEffect(() => {
    setItems(getItems());
  }, []);

  function handleDelete(id: string) {
    const used = items.some((item) => item.category.id === id);
    if (used) return;

    const newCategory = categories.filter((category) => category.id !== id);

    setCategories(newCategory);
  }

  return (
    <>
      <div className="container py-4">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
          {categories.map((category) => {
            const usedCount = items.filter(
              (it) => it.category.id === category.id
            ).length;
            const disabled = usedCount > 0;

            return (
              <div key={category.id} className="col">
                <div className="card h-100 shadow-lg border-0 rounded-4 relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="card-img-top rounded-top-4 relative"
                    style={{ height: 160, objectFit: "cover" }}
                  />
                  <div className="d-grid justify-content-center">
                    <h3 className="text-center">{category.name}</h3>
                    <div className="text-center">
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="btn btn-dark mt-2 mb-3"
                        style={{ width: 150 }}
                        disabled={disabled}>
                        {disabled ? `In use (${usedCount})` : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllCategoriesPage;
