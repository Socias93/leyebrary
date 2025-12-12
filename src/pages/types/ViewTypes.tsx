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
      <h1 className="text-center mb-4 mt-3">Type {type} </h1>
      <div className="d-flex justify-content-center align-content-center gap-4">
        {filteredItems.length === 0 && (
          <div className="d-grid">
            <h5> There are no items in {type} </h5>
            <NavLink className={"btn btn-outline-info"} to={"/all/types"}>
              Go back
            </NavLink>
          </div>
        )}
        {filteredItems.map((item) => (
          <div key={item.id} className="col-3 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="card-title">{item.title}</h5>
                  <span>{item.category.name}</span>

                  {["Book", "ReferenceBook"].includes(item.type!) && (
                    <ul className="list-unstyled mt-1">
                      <li>Author: {item.attributes?.author ?? "—"}</li>
                      <li>Pages: {item.attributes?.nbrPages ?? "—"}</li>
                    </ul>
                  )}

                  {["DVD", "AudioBook"].includes(item.type!) && (
                    <p className="mt-1">
                      Runtime: {item.attributes?.runTimeMinutes} minutes
                    </p>
                  )}
                </div>

                {item.image && (
                  <img
                    src={typeof item.image === "string" ? item.image : ""}
                    alt={item.title}
                    className="ms-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
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
