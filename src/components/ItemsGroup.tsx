import { Audiobook, Book, DVD, LibraryItem } from "../services/fakeItemService";

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
            {i.type === "Book" || i.type === "Referencebook" ? (
              <>
                <p className="mb-1">Author : {(i as Book).author}</p>
                <p className="mb-1">Pages : {(i as Book).nbrPages}</p>
              </>
            ) : i.type === "DVD" || i.type === "Audiobook" ? (
              <p className="mb-1">
                Runtime : {(i as DVD | Audiobook).runTimeMinutes} minutes
              </p>
            ) : null}
            <div
              className="d-flex justify-content-center mt-2"
              style={{ width: 400 }}>
              <span className="badge bg-info rounded-pill w-50 p-2 shadow">
                {i.isBorrowable} Borrow
              </span>
            </div>

            <div className="d-flex justify-content-between m-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsGroup;
