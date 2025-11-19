import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

function CreateItemPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = (searchParams.get("type") as ItemType) ?? "Book";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [nbrPages, setNbrPages] = useState<number | "">("");
  const [runTimeMinutes, setRunTimeMinutes] = useState<number | "">("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { title, categoryId: id, type };

    if (type === "Book" || type === "Referencebook") {
      payload.author = author;
      payload.nbrPages = Number(nbrPages);
    } else {
      payload.runTimeMinutes = Number(runTimeMinutes);
    }
  };

  const isBookish = type === "Book" || type === "Referencebook";
  const isTimeBased = type === "DVD" || type === "Audiobook";

  return (
    <>
      <h1>
        Create new <small>{type} </small>
      </h1>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input className="form-control" />
        </div>
        {isBookish && (
          <>
            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                className="form-control"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nbr Pages</label>
              <input
                type="number"
                className="form-control"
                value={nbrPages}
                onChange={(e) =>
                  setNbrPages(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>
          </>
        )}

        {isTimeBased && (
          <div className="mb-3">
            <label className="form-label">Run time (minutes)</label>
            <input
              className="form-control"
              value={runTimeMinutes}
              onChange={(e) =>
                setRunTimeMinutes(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>
        )}
        <button className="btn btn-outline-info" type="submit">
          Create
        </button>
      </form>
    </>
  );
}

export default CreateItemPage;
