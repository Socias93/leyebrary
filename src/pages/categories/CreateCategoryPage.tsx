import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  getCategories,
  getCategory,
  saveCategory,
} from "../../services/categoryService";
import { CategoryFieldInput } from "../../components/index";
import { categorySchema } from "./categoryschema/CreateCategorySchema";
import { Category, CategoryFormData } from "../../types";

const CATEGORY_ERROR = "Category already exists";
const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dyqpakdse/image/upload";

function CreateCategoryPage() {
  const [categories, setCategories] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { name: "", image: undefined },
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    async function fetch() {
      if (!id || id === "new") return;
      const { data: category } = await getCategory(id);

      if (!category) return;

      setCategories(category);

      reset(mapToCategoryData(category));
    }
    fetch();
  }, [id, reset]);

  function mapToCategoryData(category: Category) {
    return {
      id: category.id,
      name: category.name,
      image: category.image,
    };
  }

  async function onSubmit(data: CategoryFormData) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await getCategories();
      const categories = (res as any).data ?? [];

      const exists = categories.some(
        (c: Category) =>
          c.name.toLowerCase() === data.name.toLowerCase() && c.id !== data.id // ignorera samma kategori vid edit
      );

      if (exists) {
        setErrorMessage(CATEGORY_ERROR);
        setIsLoading(false);
        return;
      }

      let imageUrl: string = "";
      if (data.image instanceof FileList && data.image.length > 0) {
        const formData = new FormData();
        formData.append("file", data.image[0]);
        formData.append("upload_preset", "leyebrary");
        const response = await axios.post(CLOUDINARY_API, formData);
        imageUrl = response.data.secure_url;
      } else if (typeof data.image === "string") {
        imageUrl = data.image;
      }

      await saveCategory({
        id: data.id,
        name: data.name,
        image: imageUrl,
      });

      navigate("/all/categories");
    } catch (err) {
      console.error(err);
      alert("Något gick fel vid uppladdning/sparande.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center mb-3">Create a new Category</h4>
        <div className="p-3 shadow rounded-4">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage} </div>
          )}
          <CategoryFieldInput
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default CreateCategoryPage;
