import { useState } from "react";
import "./App.css";
import { getItems } from "./services/fakeFoodService";

function App() {
  const [items, setItems] = useState(getItems());

  const eye = <i className="fa-solid fa-eye"></i>;
  return (
    <>
      <div className="d-flex justify-content-center row row cols-4 text-center mt-4 ">
        <h1>L{eye}brary </h1>
        {items.map((i) => (
          <div key={i._id} className="col-3 m-2">
            <div className="d-grid justify-content-center h-100 p-3 border border-dark rounded-4 ">
              <div className="position-relative"></div>
              <h5 className="mt-2 mb-1">{i.title}</h5>
              <p className="small mb-0">{i.category.name}</p>
              <p className="small mb-0">{i.isBorrowable}</p>

              <div className="d-flex justify-content-between m-4"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
