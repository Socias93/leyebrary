import { NavLink } from "react-router-dom";

function Navbar() {
  const eye = <i className="fa-solid fa-eye text-info"></i>;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to={""} className="clickable navbar-brand">
            L{eye}brary
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={"home"}
                  className=" clickable nav-link"
                  aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"all/items"} className="clickable nav-link">
                  All items
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"all/categories"} className="clickable nav-link">
                  All Categories
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={"new-item"}
                      className="clickable dropdown-item">
                      New Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"new-category"}
                      className="clickable dropdown-item">
                      New Category
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
