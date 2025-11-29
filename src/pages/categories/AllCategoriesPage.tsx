import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../services/categoryService";
import { getItems } from "../../services/itemService";
import { BaseItem, Category } from "../../types";

function AllCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<BaseItem[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);

      const { data: items } = await getItems();
      setItems(items);
    }

    fetch();
  }, []);

  async function handleDelete(id: string) {
    const used = items.some((item) => item.category.id === id);
    if (used) return;

    await deleteCategory(id);
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
                    src={
                      category.imageUrl instanceof FileList &&
                      category.imageUrl[0]
                        ? URL.createObjectURL(category.imageUrl[0])
                        : typeof category.imageUrl === "string"
                        ? category.imageUrl
                        : ""
                    }
                    alt={category.name}
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
