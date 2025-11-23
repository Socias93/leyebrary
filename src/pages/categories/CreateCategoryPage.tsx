import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CategoryFormData,
  categorySchema,
} from "./categoryschema/CreateCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { saveCategory } from "../../services/fakeCategoryService";

const FIELD_OPTIONS = [
  { value: "author", label: "Author" },
  { value: "nbrPages", label: "Number of pages" },
  { value: "runTimeMinutes", label: "Run time (minutes)" },
] as const;

function CreateCategoryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = (searchParams.get("type") ?? undefined) as string | undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({ resolver: zodResolver(categorySchema) });

  function onSubmit(data: CategoryFormData) {
    console.log("Submitted", data);
    saveCategory(data);
    navigate("/home");
  }

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center mb-3">Create new {type}</h4>
        <div className="p-3 shadow rounded-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message} </p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label d-blick">
                Fields (choose which field items this category has)
              </label>
              {FIELD_OPTIONS.map((fields) => (
                <div key={fields.value} className="form-check">
                  <input
                    value={fields.value}
                    {...register("fields")}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <label className="form-check-label">{fields.label} </label>
                </div>
              ))}
              {errors.fields && (
                <p className="text-danger"> {errors.fields.message} </p>
              )}
            </div>
            <div className="text-center m-2">
              <button className="btn btn-outline-info">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateCategoryPage;
