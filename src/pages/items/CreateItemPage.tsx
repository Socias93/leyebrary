import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getItem, saveItem } from "../../services/fakeItemService";
import { LibraryFormData } from "../utils";
import { getDynamicSchema } from "../index";
import { BaseItem, Category } from "../../services/utils";
import { FormField } from "../../components/index";
import z from "zod";
import { getCategories } from "../../services/fakeCategoryService";

function CreateItemPage() {
  const { id } = useParams();
  const [items, setItems] = useState<BaseItem>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const initialCategoryFromQuery = searchParams.get("category") ?? "";
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategoryFromQuery
  );

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  const dynamicSchema = getDynamicSchema(selectedCategory);
  type DynamicFormData = z.infer<typeof dynamicSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DynamicFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { categoryId: initialCategoryFromQuery || "" },
  });

  useEffect(() => {
    async function fetch() {
      const { data: categories } = await getCategories(); // AxiosResponse<Category[]>
      setCategories(categories);

      if (!id || id === "new") return;
      const { data: item } = await getItem(id);
      if (!item) return;

      setSelectedCategoryId(item.category.id);
      reset(mapToFormData(item));
      setItems(item);
    }

    fetch();
  }, [id, reset]);

  function mapToFormData(item: BaseItem): DynamicFormData {
    const base: DynamicFormData = {
      id: item.id,
      title: item.title,
      categoryId: item.category.id,
    };

    item.category.fields?.forEach((field) => {
      if (field in item) {
        (base as any)[field] = (item as any)[field];
      }
    });

    return base;
  }

  async function onSubmit(data: DynamicFormData) {
    const { title, categoryId, ...rest } = data;
    const payload = {
      title,
      categoryId,
      attributes: rest,
    };
    await saveItem(payload as LibraryFormData);
    navigate("/");
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
          <select
            className="form-select"
            {...register("categoryId")}
            onChange={(e) => setSelectedCategoryId(e.target.value)}>
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
          key={selectedCategoryId}
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
