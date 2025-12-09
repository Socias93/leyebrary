import { Category, CategoryFormData, ItemType } from "../types";

interface Props {
  handleSubmit: any;
  selectedCategory?: Category;
  errors: any;
  onSubmit(data: CategoryFormData): void;
  register: any;
  isLoading?: boolean;
}

const TYPES: ItemType[] = ["Book", "ReferenceBook", "DVD", "AudioBook"];

function CategoryFieldInput({
  errors,
  handleSubmit,
  onSubmit,
  register,
  isLoading,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input {...register("name")} type="text" className="form-control" />
        {errors.name && <p className="text-danger">{errors.name.message} </p>}
      </div>

      <div className="mb-3">
        <select {...register("type")} className="form-select">
          <option className="form-label d-blick">Select Type</option>
          {TYPES.map((type) => (
            <option key={type} value={type} className="form-label d-blick">
              {type}
            </option>
          ))}
        </select>

        <div className="mb-3">
          <label className="form-label mt-3">Image</label>
          <input
            {...register("imageUrl")}
            type="file"
            className="form-control"
          />
          {errors.imageUrl && (
            <p className="text-danger">{errors.imageUrl.message} </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-outline-info"
        disabled={isLoading}>
        {isLoading ? (
          <>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"></span>
            &nbsp;Laddar...
          </>
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
}

export default CategoryFieldInput;
