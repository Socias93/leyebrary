import { LibraryItem } from "../services/fakeFoodService";

interface Props {
  items: LibraryItem[];
}

function ItemsGroup({ items }: Props) {
  return (
    <div className="d-flex justify-content-center row row cols-4 text-center mt-4 ">
      {items.map((i) => (
        <div key={i._id} className="col-3 m-2">
          <div className="d-grid justify-content-center h-100 p-3 border border-dark rounded-4 ">
            <div className="position-relative"></div>
            <h5 className="mt-2 mb-1">{i.title}</h5>
            <p className="small mb-0">{i.category.name}</p>
            <div className="d-flex justify-content-between m-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsGroup;
