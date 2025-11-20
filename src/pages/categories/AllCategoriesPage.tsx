import { getCategories } from "../../services/fakeCategoryService";

function AllCategoriesPage() {
  const categories = getCategories();

  return (
    <>
      <>
        <div className="container py-4">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
            {categories.map((category) => (
              <div key={category._id} className="col">
                <div className="card h-100 shadow-sm border-0 rounded-4 relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="card-img-top rounded-top-4 relative"
                    style={{ height: 160, objectFit: "cover" }}
                  />
                  <div className="card-body relative">
                    <div className="d-flex align-items-start justify-content-between">
                      <h5 className="card-title mb-1">{category.name}</h5>
                    </div>
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
