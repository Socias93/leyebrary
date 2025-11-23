import { NavLink } from "react-router-dom";

function DropDown() {
  return (
    <>
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
            <NavLink to={"new-item"} className="clickable dropdown-item">
              New Item
            </NavLink>
          </li>
          <li>
            <NavLink to={"new-category"} className="clickable dropdown-item">
              New Category
            </NavLink>
          </li>
        </ul>
      </li>
    </>
  );
}

export default DropDown;
