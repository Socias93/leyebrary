import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BaseItem, Category } from "@services/utils";
import { getCategories } from "@services/categoryService";
import { ItemForm, itemSchema } from "../index";
import { getItem, saveItem } from "@services/itemService";
import { FormField } from "@/components";

function CreateItemPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  const initialCategoryFromQuery = searchParams.get("category") ?? "";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
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

  useEffect(() => {
    const fields = selectedCategory?.fields ?? [];

    fields.forEach((field) => {
      if (field === "author") {
        setValue("attributes.author", "");
      } else if (field === "nbrPages") {
        setValue("attributes.nbrPages", undefined);
      } else if (field === "runTimeMinutes") {
        setValue("attributes.runTimeMinutes", undefined);
      }
    });

    const allKeys: Array<keyof ItemForm["attributes"]> = [
      "author",
      "nbrPages",
      "runTimeMinutes",
    ];
    allKeys.forEach((k) => {
      if (!fields.includes(k as any)) {
        setValue(`attributes.${k}`, undefined);
      }
    });
  }, [watchedCategoryId, selectedCategory, setValue]);

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
        author: item.attributes?.author,
        nbrPages: item.attributes?.nbrPages,
        runTimeMinutes: item.attributes?.runTimeMinutes,
      },
    };
  }

  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <h4 className="text-center">
        {id === "new"
          ? `Create a new item`
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
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}

export default CreateItemPage;
