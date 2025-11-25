import { Category } from "../services/utils";

interface Props {
  items: Category[];
  selectedCategory: Category;
  onCategorySelect(category: Category): void;
}

function Listgroup({ items, onCategorySelect, selectedCategory }: Props) {
  return (
    <div className="d-flex flex-wrap">
      {items.map((item) => (
        <button
          onClick={() => onCategorySelect(item)}
          key={item.id}
          className={`mt-1 mt-sm-2 btn btn-sm btn-outline-info rounded-4 m-1 px-2 px-sm-3 ${
            item.id === selectedCategory.id ? "active" : ""
          }`}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Listgroup;
