import { useParams } from "react-router-dom";

function ViewTypes() {
  const { type } = useParams();
  return <h1>Type {type} </h1>;
}

export default ViewTypes;
