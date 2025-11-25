import { CategoryFormData } from "../pages/categories/categoryschema/CreateCategorySchema";
import { Category } from "../services/utils";
import FieldInput from "./FieldInput";

interface Props {
  handleSubmit: any;
  selectedCategory?: Category;
  errors: any;
  onSubmit(ddata: CategoryFormData): void;
  register: any;
}

function FormField({
  handleSubmit,
  errors,
  onSubmit,
  register,
  selectedCategory,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectedCategory?.fields?.map((field) => (
        <FieldInput
          key={field}
          field={field}
          register={register}
          errors={errors}
        />
      ))}

      <div className="text-center">
        <button className="btn btn-outline-info" type="submit">
          Create
        </button>
      </div>
    </form>
  );
}

export default FormField;
