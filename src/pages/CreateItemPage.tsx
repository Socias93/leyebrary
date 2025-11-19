import { useParams } from "react-router-dom";

function CreateItemPage() {
  const { id } = useParams();

  return (
    <h1>
      Create new <button>{id} </button>
    </h1>
  );
}

export default CreateItemPage;
