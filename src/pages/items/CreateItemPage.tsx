import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";
import { getItem, saveItem } from "../../services/itemService";
import { FormField } from "../../components/index";
import { ItemForm, itemSchema } from "./schemas/DynamicSchema";
import { BaseItem, Category } from "../../types";
import { AttributeField } from "../../components/FormField";

const AUTHOR = "author";
const NBR_PAGES = "nbrPages";
const RUN_TIMES_MINUTES = "runTimeMinutes";
const itemTypes = ["Book", "ReferenceBook", "DVD", "AudioBook"] as const;

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
      const { data: categories } = await getCategories();
      setCategories(categories);

      if (!id || id === "new") return;
      const { data: item } = await getItem(id);

      if (!item) return;

      reset(mapToFormData(item));
    }

    fetch();
  }, [id, reset]);

  const watchedType = watch("type");

  const fieldsToShow: AttributeField[] = (() => {
    switch (watchedType) {
      case "Book":
      case "ReferenceBook":
        return ["author", "nbrPages"];
      case "DVD":
      case "AudioBook":
        return ["runTimeMinutes"];
      default:
        return [];
    }
  })();

  useEffect(() => {
    const allKeys: Array<keyof ItemForm["attributes"]> = [
      AUTHOR,
      NBR_PAGES,
      RUN_TIMES_MINUTES,
    ];
    allKeys.forEach((k) => {
      if (!fieldsToShow.includes(k as any)) {
        setValue(`attributes.${k}`, undefined);
      }
    });
  }, [watch("type"), setValue]);

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
    <div className="container-lg px-3 py-3">
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-center">
          {id === "new"
            ? `Create a new item`
            : `Update your ${selectedCategory?.name} ${watchedType || ""}`}
        </h4>

        <div
          className="p-3 shadow rounded-4 mt-2 mx-3"
          style={{ width: "100%", maxWidth: 420 }}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" {...register("title")} />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-3 mt-4">
            <select className="form-select" {...register("type")}>
              <option value="">Select Type</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-danger">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-3 mt-4">
            <select className="form-select" {...register("categoryId")}>
              <option value="">Select Category</option>
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
            fields={fieldsToShow}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateItemPage;
