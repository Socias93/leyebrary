import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-grid justify-content-center">
      <h1 className="mt-3">404 Page not found !</h1>
      <Link to={"/home"} className="btn btn-outline-info mt-3">
        Go back
      </Link>
    </div>
  );
}

export default NotFound;
