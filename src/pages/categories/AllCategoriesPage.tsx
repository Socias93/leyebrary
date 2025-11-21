import { useState } from "react";
import { getCategories } from "../../services/fakeCategoryService";

function AllCategoriesPage() {
  const [categories, setCategories] = useState(getCategories());

  function handleDelete(id: string) {
    const newCategory = categories.filter((category) => category._id !== id);

    setCategories(newCategory);
  }

  return (
    <>
      <>
        <div className="container py-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
            {categories.map((category) => (
              <div key={category._id} className="col">
                <div className="card h-100 shadow-lg border-0 rounded-4 relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="card-img-top rounded-top-4 relative"
                    style={{ height: 160, objectFit: "cover" }}
                  />
                  <div className="d-grid justify-content-center">
                    <h3 className="text-center">{category.name}</h3>
                    <span
                      onClick={() => handleDelete(category._id)}
                      className="clickable badge bg-dark rounded-pill p-2 shadow mt-2 mb-3"
                      style={{ width: 150 }}>
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}

export default AllCategoriesPage;
