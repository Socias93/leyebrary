import { Category, CategoryFormData } from "../types";

interface Props {
  handleSubmit: any;
  selectedCategory?: Category;
  errors: any;
  onSubmit(ddata: CategoryFormData): void;
  register: any;
  isLoading?: boolean;
}

const FIELD_OPTIONS = [
  { value: "author", label: "Author" },
  { value: "nbrPages", label: "Number of pages" },
  { value: "runTimeMinutes", label: "Run time (minutes)" },
] as const;

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
        <div className="mb-3">
          <label className="form-label">Image</label>
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
