import { useNavigate } from "react-router-dom";
import { ItemType } from "@types";

const TYPES: { type: ItemType; imageUrl: string }[] = [
  { type: "Book", imageUrl: "/images/Book1.png" },
  { type: "ReferenceBook", imageUrl: "/images/Referencebook.jpg" },
  { type: "DVD", imageUrl: "/images/DVD1.jpg" },
  { type: "AudioBook", imageUrl: "/images/AudioBook.avif" },
];

function AllTypesPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="row g-3 justify-content-center">
        {TYPES.map((t) => (
          <div
            key={t.type}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
            <div className="card shadow-lg border-0 rounded-4 w-100 d-flex flex-column">
              <img
                src={t.imageUrl || ""}
                alt={t.type}
                className="mx-auto mt-3"
                style={{
                  height: 180,
                  objectFit: "cover",
                  width: "auto",
                  maxWidth: "100%",
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center mb-3">{t.type}</h5>

                <div className="mt-auto text-center">
                  <button
                    onClick={() => navigate(`/view-type/${t.type}`)}
                    className="btn btn-outline-primary">
                    View All {t.type}s
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTypesPage;
