import { Category } from "../services/fakeCategoryService";

interface Props {
  items: Category[];
  selectedCategory: Category;
  onCategorySelect(category: Category): void;
}

function Listgroup({ items, onCategorySelect, selectedCategory }: Props) {
  return (
    <>
      {items.map((item) => (
        <button
          onClick={() => onCategorySelect(item)}
          key={item._id}
          className={`mt-2 btn btn-outline-dark rounded-4 m-1 ${
            item._id === selectedCategory._id ? "active" : ""
          }   `}>
          {item.name}
        </button>
      ))}
    </>
  );
}

export default Listgroup;
