import { ItemForm } from "@/pages/items/schemas/DynamicSchema";
import { Category } from "@/services/utils";
import { FieldInput } from "./index";

interface Props {
  handleSubmit: any;
  selectedCategory?: Category;
  errors: any;
  onSubmit(data: ItemForm): void;
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
