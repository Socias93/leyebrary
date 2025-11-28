import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getItem, saveItem } from "../../services/fakeItemService";
import { BaseItem, Category } from "../../services/utils";
import { FormField } from "../../components/index";
import { getCategories } from "../../services/fakeCategoryService";
import { itemSchema } from "./schemas/DynamicSchema";
import z from "zod";

function CreateItemPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const initialCategoryFromQuery = searchParams.get("category") ?? "";

  type ItemForm = z.infer<typeof itemSchema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ItemForm>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: "",
      title: "",
      categoryId: initialCategoryFromQuery || "",
      attributes: {
        author: "",
        nbrPages: undefined,
        runTimeMinutes: undefined,
      },
    },
  });
  const watchedCategoryId = watch("categoryId");
  const selectedCategory = categories.find((c) => c.id === watchedCategoryId);

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories(); // AxiosResponse<Category[]>
      setCategories(categories);

      if (!id || id === "new") return;
      const { data: item } = await getItem(id);

      if (!item) return;

      reset(mapToFormData(item));
    }

    fetch();
  }, [id, reset]);

  async function onSubmit(data: ItemForm) {
    console.log("Submitted", data);
    await saveItem(data);
    navigate("/");
  }

  function mapToFormData(item: BaseItem) {
    return {
      id: item.id,
      title: item.title,
      categoryId: item.category.id,
      attributes: {
        author: item.attributes?.author || "",
        nbrPages: item.attributes?.nbrPages ?? undefined,
        runTimeMinutes: item.attributes?.runTimeMinutes ?? undefined,
      },
    };
  }

  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <h4 className="text-center">
        {id === "new"
          ? `Create new ${selectedCategory?.name}`
          : `Update your ${selectedCategory?.name}`}
      </h4>

      <div className="p-3 shadow rounded-4 mt-3" style={{ width: 350 }}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" {...register("title")} />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3 mt-4">
          <select className="form-select" {...register("categoryId")}>
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-danger">{errors.categoryId.message}</p>
          )}
        </div>

        <FormField
          key={watchedCategoryId}
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          selectedCategory={selectedCategory}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default CreateItemPage;
