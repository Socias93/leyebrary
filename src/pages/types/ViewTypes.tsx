import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BaseItem } from "@types";
import { getItems } from "@/services/itemService";
import { Pagination, SearchBox } from "@/components";
import { PAGE_SIZE } from "@/pages/HomePage";
import { paginate } from "@/components/utils";

function ViewTypes() {
  const [items, setItems] = useState<BaseItem[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { type } = useParams();

  useEffect(() => {
    async function fetch() {
      const { data } = await getItems();
      setItems(data);
    }

    fetch();
  }, []);

  function handleSearch(value: string) {
    setSearchQuery(value);
    setSelectedPage(1);
  }

  let filtredItems = items.filter((item) => item.type === type);
  const query = searchQuery.toLowerCase();

  if (query)
    filtredItems = filtredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.name.toLowerCase().includes(query)
    );

  const paginatedItems = paginate(filtredItems, PAGE_SIZE, selectedPage);

  return (
    <>
      <h1 className="text-center mb-4 mt-3">{type}s </h1>
      <div className="d-flex justify-content-center mb-4">
        <SearchBox onChange={handleSearch} value={searchQuery} />
      </div>
      <div className="row justify-content-center g-4">
        {filtredItems.length === 0 && (
          <div className="d-grid">
            <h5> There are no items in {type} </h5>
            <NavLink className={"btn btn-outline-info"} to={"/all/types"}>
              Go back
            </NavLink>
          </div>
        )}
        {paginatedItems.map((item) => (
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
      <div className="mt-3">
        <Pagination
          pageSize={4}
          selectedPage={selectedPage}
          totalCount={filtredItems.length}
          onPageSelect={setSelectedPage}
        />
      </div>
    </>
  );
}

export default ViewTypes;
