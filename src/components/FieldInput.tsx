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
      <label className="form-label">{labels[field] ?? field}</label>
      <input
        type={isNumberField ? "number" : "text"}
        className="form-control"
        {...register(field, { valueAsNumber: isNumberField })}
      />
      {errors[field] && <p className="text-danger">{errors[field]?.message}</p>}
    </div>
  );
}

export default FieldInput;
