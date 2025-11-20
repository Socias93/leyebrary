import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CategoryFormData,
  categorySchema,
} from "./categoryschema/CreateCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { saveCategory } from "../../services/fakeCategoryService";
import { ItemType } from "../utils";

function CreateCategoryPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = (searchParams.get("type") ?? undefined) as ItemType | undefined;

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
