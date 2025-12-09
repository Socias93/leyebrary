import { FieldInput } from "../components/index";
import { ItemForm } from "../pages/items/schemas/DynamicSchema";
import { Category } from "../types";

export type AttributeField = "author" | "nbrPages" | "runTimeMinutes";

interface Props {
  handleSubmit: any;
  selectedCategory?: Category;
  errors: any;
  onSubmit(data: ItemForm): void;
  register: any;
  fields: AttributeField[];
}

function FormField({
  handleSubmit,
  errors,
  onSubmit,
  register,
  fields,
}: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
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
