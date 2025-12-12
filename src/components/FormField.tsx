import { FieldInput } from "../components/index";
import { ItemForm } from "../pages/items/schemas/DynamicSchema";
import { Category } from "../types";

export type AttributeField = "author" | "nbrPages" | "runTimeMinutes";

interface Props {
  isLoading: any;
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
  isLoading,
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
              &nbsp;Loading...
            </>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </form>
  );
}

export default FormField;
