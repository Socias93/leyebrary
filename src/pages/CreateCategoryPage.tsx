import { useSearchParams } from "react-router-dom";
import { ItemType } from "./CreateItemPage";

function CreateCategoryPage() {
  const [searchParams] = useSearchParams();
  const type = (searchParams.get("type") ?? undefined) as ItemType | undefined;
  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center mb-3">Create new {type}</h4>
        <div className="p-3 shadow rounded-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input type="text" className="form-control" />
            </div>
            <div className="text-center m-2">
              <button className="btn btn-outline-info">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateCategoryPage;
