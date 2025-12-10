import { ItemType } from "../types";

const TYPES: { type: ItemType; imageUrl: string }[] = [
  { type: "Book", imageUrl: "/public/images/Book1.png" },
  { type: "ReferenceBook", imageUrl: "/public/images/Referencebook.jpg" },
  { type: "DVD", imageUrl: "/public/images/DVD1.jpg" },
  { type: "AudioBook", imageUrl: "/public/images/AudioBook.avif" },
];

function AllTypesPage() {
  return (
    <div className="row">
      {TYPES.map((t) => (
        <div key={t.type} className="col">
          <div className="card h-100 shadow-lg border-0 rounded-4 relative">
            <img
              src={t.imageUrl || ""}
              alt={t.type}
              style={{ height: 180, objectFit: "scale-down" }}
            />
            <div className="d-grid justify-content-center">
              <h3 className="text-center">{t.type}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllTypesPage;
