import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Category } from "@/services/utils";
import {
  CategoryFormData,
  categorySchema,
} from "./categoryschema/CreateCategorySchema";
import { CategoryFieldInput } from "@/components";
import { getCategories, saveCategory } from "@services/categoryService";

function CreateCategoryPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { name: "", fields: [], imageUrl: "" },
    resolver: zodResolver(categorySchema),
  });

  async function onSubmit(data: CategoryFormData) {
    console.log("Submitted", data);

    const res = await getCategories();
    const categories = (res as any).data ?? [];
    const exists = categories.some(
      (c: Category) => c.name.toLowerCase() === data.name.toLowerCase()
    );

    if (exists) {
      alert("Category already exists");
      return;
    }

    await saveCategory(data);
    navigate("/all/categories");
  }

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center mb-3">Create a new Category</h4>
        <div className="p-3 shadow rounded-4">
          <CategoryFieldInput
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        </div>
      </div>
    </>
  );
}

export default CreateCategoryPage;
