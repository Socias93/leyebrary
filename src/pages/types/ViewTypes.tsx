import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BaseItem } from "@types";
import { getItems } from "@/services/itemService";

function ViewTypes() {
  const { type } = useParams();
  const [items, setItems] = useState<BaseItem[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await getItems();
      setItems(data);
    }

    fetch();
  }, []);

  const filteredItems = items.filter((item) => item.type === type);

  return (
    <>
      <h1 className="text-center mb-4 mt-3">{type}s </h1>
      <div className="row justify-content-center g-4">
        {filteredItems.length === 0 && (
          <div className="d-grid">
            <h5> There are no items in {type} </h5>
            <NavLink className={"btn btn-outline-info"} to={"/all/types"}>
              Go back
            </NavLink>
          </div>
        )}
        {filteredItems.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-lg ms-4 me-4">
              <div className="card-body justify-content-center ">
                <div className="col text-center">
                  <h5 className="card-title ">{item.title}</h5>
                  <span>{item.category.name}</span>

                  {["Book", "ReferenceBook"].includes(item.type!) && (
                    <ul className="list-unstyled mt-1">
                      <li>Author: {item.attributes?.author ?? "—"}</li>
                      <li>Pages: {item.attributes?.nbrPages ?? "—"}</li>
                    </ul>
                  )}

                  {["DVD", "AudioBook"].includes(item.type!) && (
                    <p className="mt-1">
                      Runtime: {item.attributes?.runTimeMinutes} min
                    </p>
                  )}
                </div>

                {item.image && (
                  <div className="col-auto text-center">
                    <img
                      src={typeof item.image === "string" ? item.image : ""}
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewTypes;
