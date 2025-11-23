import { Category } from "../services/Utils";

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
          key={item.id}
          className={`mt-2 btn btn-outline-info rounded-4 m-1 ${
            item.id === selectedCategory.id ? "active" : ""
          }   `}>
          {item.name}
        </button>
      ))}
    </>
  );
}

export default Listgroup;
