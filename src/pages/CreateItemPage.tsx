import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BookishFormData, bookishSchema } from "./schemas/BookisSchema";
import { useForm } from "react-hook-form";
import {
  isTimeBasedSchema,
  TimeBasedFormData,
} from "./schemas/TimeBasedSchema";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

type LibraryFormData = BookishFormData | TimeBasedFormData;

function CreateItemPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const type = (searchParams.get("type") as ItemType) ?? "Book";

  const isBookish = type === "Book" || type === "Referencebook";
  const isTimeBased = type === "DVD" || type === "Audiobook";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookishFormData | TimeBasedFormData>({
    resolver: zodResolver(isBookish ? bookishSchema : isTimeBasedSchema),
  });

  function onSubmit(data: LibraryFormData) {
    console.log("Submitted", data);
    navigate("/all");
  }

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center">
          Create new <small>{type} </small>
        </h4>
        <div className="p-3 shadow rounded-4 mt-3" style={{ width: 350 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input className="form-control" {...register("title")} />
              {errors.title && (
                <p className="text-danger"> {errors.title.message} </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input className="form-control" {...register("categoryId")} />
              {errors.categoryId && (
                <p className="text-danger"> {errors.categoryId.message} </p>
              )}
            </div>
            {isBookish && (
              <>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input className="form-control" {...register("author")} />
                  {isBookish && (errors as any).author && (
                    <p className="text-danger">
                      {(errors as any).author?.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Nbr Pages</label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("nbrPages")}
                  />
                  {isBookish && (errors as any).nbrPages && (
                    <p className="text-danger">
                      {(errors as any).nbrPages?.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {isTimeBased && (
              <div className="mb-3">
                <label className="form-label">Run time (minutes)</label>
                <input
                  className="form-control"
                  {...register("runTimeMinutes")}
                />
                {isTimeBased && (errors as any).runTimeMinutes && (
                  <p className="text-danger">
                    {(errors as any).runTimeMinutes?.message}
                  </p>
                )}
              </div>
            )}
            <div className="text-center">
              <button className="btn btn-outline-info" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateItemPage;
