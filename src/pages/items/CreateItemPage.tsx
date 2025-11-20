import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BookishFormData, bookishSchema } from "./schemas/BookisSchema";
import { useForm } from "react-hook-form";
import { getCategories } from "../../services/fakeCategoryService";
import { getItem, LibraryItem, saveItem } from "../../services/fakeItemService";
import { LibraryFormData } from "../utils";
import { useEffect, useState } from "react";
import {
  isTimeBasedSchema,
  TimeBasedFormData,
} from "./schemas/TimeBasedSchema";

function CreateItemPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [itemData, setItemData] = useState<LibraryItem | null>(null);
  const categories = getCategories();
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    searchParams.get("type") ?? ""
  );

  const selectedCategory = categories.find((c) => c._id === selectedCategoryId);
  const isBookish =
    selectedCategory?.name === "Book" ||
    selectedCategory?.name === "Referencebook";
  const isTimeBased =
    selectedCategory?.name === "DVD" || selectedCategory?.name === "Audiobook";

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookishFormData | TimeBasedFormData>({
    resolver: zodResolver(isBookish ? bookishSchema : isTimeBasedSchema),
  });

  useEffect(() => {
    if (!id || id === "new") return;
    const item = getItem(id);
    if (!item) return;

    setItemData(item);
    setSelectedCategoryId(item.category._id);

    reset(mapToFormData(item));

    function mapToFormData(item: LibraryItem): LibraryFormData {
      const base: LibraryFormData = {
        _id: item._id,
        title: item.title,
        categoryId: item.category._id,
      };
      if (item.type === "Book" || item.type === "Referencebook")
        return { ...base, author: item.author, nbrPages: item.nbrPages };
      if (item.type === "DVD" || item.type === "Audiobook")
        return { ...base, runTimeMinutes: item.runTimeMinutes };
      return base;
    }
  }, [id, reset]);

  function onSubmit(data: LibraryFormData) {
    console.log("Submitted", data);
    navigate("/all/items");
    saveItem(data);
  }

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center">
          Create new <small>{"type"} </small>
        </h4>
        <div className="p-3 shadow rounded-4 mt-3" style={{ width: 350 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input className="form-control" {...register("title")} />
              {errors.title && (
                <p className="text-danger"> {errors.title.message} </p>
              )}
            </div>

            <div className="mb-3 mt-4">
              <select
                className="form-select"
                {...register("categoryId")}
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}>
                <option value={""}>Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-danger"> {errors.categoryId.message} </p>
              )}
            </div>
            {isBookish && (
              <>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input className="form-control" {...register("author")} />
                  {isBookish && (errors as any).author && (
                    <p className="text-danger">
                      {(errors as any).author?.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Nbr Pages</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("nbrPages", { valueAsNumber: true })}
                  />
                  {isBookish && (errors as any).nbrPages && (
                    <p className="text-danger">
                      {(errors as any).nbrPages?.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {isTimeBased && (
              <div className="mb-3">
                <label className="form-label">Run time (minutes)</label>
                <input
                  className="form-control"
                  {...register("runTimeMinutes", { valueAsNumber: true })}
                />
                {isTimeBased && (errors as any).runTimeMinutes && (
                  <p className="text-danger">
                    {(errors as any).runTimeMinutes?.message}
                  </p>
                )}
              </div>
            )}
            <div className="text-center">
              <button className="btn btn-outline-info" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateItemPage;
