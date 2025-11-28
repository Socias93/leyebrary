interface Props {
  field: string;
  register: any;
  errors: any;
  item?: any;
}

function FieldInput({ errors, field, register }: Props) {
  const labels: { [key: string]: string } = {
    author: "Author",
    nbrPages: "Number of Pages",
    runTimeMinutes: "Run time (minutes)",
  };

  const isNumberField = field === "nbrPages" || field === "runTimeMinutes";

  return (
    <div className="mb-3">
      <label className="form-label d-block">{labels[field]}</label>
      <input
        type={isNumberField ? "number" : "text"}
        className={`form-control ${
          errors.attributes?.[field] ? "is-invalid" : ""
        }`}
        {...register(`attributes.${field}`, {
          ...(isNumberField && {
            valueAsNumber: true,
            setValueAs: (v: any) => (v === "" ? undefined : Number(v)),
          }),
        })}
      />
      {errors.attributes?.[field] && (
        <div className="invalid-feedback">
          {errors.attributes[field]?.message}
        </div>
      )}
    </div>
  );
}

export default FieldInput;
