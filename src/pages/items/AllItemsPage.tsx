import { useState } from "react";
import { deleteItem, getItems } from "../../services/fakeFoodService";
import { useNavigate } from "react-router-dom";

function AllItemsPage() {
  const [items, setItems] = useState(getItems());
  const navigate = useNavigate();

  function handleDelete(id: string) {
    const newItem = items.filter((item) => item._id !== id);
    setItems(newItem);
    deleteItem(id);
  }

  return (
    <>
      <table className="table">
        <thead className="table-info">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.title} </td>
              <td>{item.category.name} </td>
              <td>
                <button
                  onClick={() => navigate(`/edit-item/${item._id}`)}
                  className="btn btn-outline-info">
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-outline-dark">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllItemsPage;
