import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getItem, saveItem } from "../../services/fakeItemService";
import { LibraryFormData } from "../utils";
import { getDynamicSchema } from "../index";
import { getCategories, Category, LibraryItem } from "../../services/Utils";
import z from "zod";

function CreateItemPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categories = getCategories();

  const initialCategoryFromQuery = searchParams.get("category") ?? "";
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategoryFromQuery
  );

  const selectedCategory = categories.find(
    (c) => c.id === selectedCategoryId
  ) as Category | undefined;

  const dynamicSchema = getDynamicSchema(selectedCategory);
  type DynamicFormData = z.infer<typeof dynamicSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DynamicFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { categoryId: initialCategoryFromQuery || "" },
  });

  useEffect(() => {
    setValue("categoryId", selectedCategoryId);
  }, [selectedCategoryId, setValue]);

  useEffect(() => {
    if (!id || id === "new") return;

    const item = getItem(id);
    if (!item) return;

    setSelectedCategoryId(item.category.id);
    reset(mapToFormData(item));

    function mapToFormData(item: LibraryItem): DynamicFormData {
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
  }, [id, reset]);

  function onSubmit(data: DynamicFormData) {
    console.log("Submitted", data);
    saveItem(data as unknown as LibraryFormData);
    navigate("/all/items");
  }

  return (
    <div className="vh-100 d-grid justify-content-center align-content-center">
      <h4 className="text-center">
        Create new <small>{"type"}</small>
      </h4>
      <div className="p-3 shadow rounded-4 mt-3" style={{ width: 350 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {selectedCategory?.fields?.map((field) => {
            let label = "";
            let type: "text" | "number" = "text";

            switch (field) {
              case "author":
                label = "Author";
                type = "text";
                break;
              case "nbrPages":
                label = "Number of Pages";
                type = "number";
                break;
              case "runTimeMinutes":
                label = "Run time (minutes)";
                type = "number";
                break;
              default:
                label = field;
            }

            return (
              <div key={field} className="mb-3">
                <label className="form-label">{label}</label>
                <input
                  type={type}
                  className="form-control"
                  {...register(field as keyof DynamicFormData, {
                    valueAsNumber: type === "number",
                  })}
                />
                {errors[field as keyof DynamicFormData] && (
                  <p className="text-danger">
                    {(errors[field as keyof DynamicFormData] as any)?.message}
                  </p>
                )}
              </div>
            );
          })}

          <div className="text-center">
            <button className="btn btn-outline-info" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItemPage;
