import { range } from "@components/utils";

interface Props {
  pageSize: number;
  totalCount: number;
  selectedPage: number;
  onPageSelect(page: number): void;
}

function Pagination({
  onPageSelect,
  pageSize,
  selectedPage,
  totalCount,
}: Props) {
  let pageCount = Math.ceil(totalCount / pageSize);

  let pages = range(1, pageCount);

  if (pageCount === 1) return null;

  return (
    <>
      <div className="d-flex justify-content-center mt-2">
        <nav aria-label="...">
          <ul className="pagination">
            {pages.map((page) => (
              <li key={page} className="page-item">
                <a
                  onClick={() => onPageSelect(page)}
                  className={`clickable page-link text-black ${
                    page === selectedPage ? "bg-info text-white" : ""
                  } `}>
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Pagination;
