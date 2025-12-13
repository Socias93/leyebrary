import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CategoryFieldInput } from "@/components/index";
import { categorySchema } from "@/pages/categories/categoryschema/CreateCategorySchema";
import { Category, CategoryFormData } from "@types";
import {
  getCategories,
  getCategory,
  saveCategory,
} from "@/services/categoryService";

const CATEGORY_ERROR = "Category already exists";
const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dyqpakdse/image/upload";

function CreateCategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { name: "", image: undefined },
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    async function fetch() {
      if (!id || id === "new-category") {
        reset({
          id: "",
          name: "",
          image: undefined,
        });
        setImagePreview(undefined);
        return;
      }
      const { data: category } = await getCategory(id);
      if (!category) return;

      reset(mapToCategoryData(category));
      setImagePreview(
        typeof category.image === "string" ? category.image : undefined
      );
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
          c.name.toLowerCase() === data.name.toLowerCase() && c.id !== data.id
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

  const watchedImage = watch("image");
  useEffect(() => {
    if (watchedImage instanceof FileList && watchedImage.length > 0) {
      setImagePreview(URL.createObjectURL(watchedImage[0]));
    }
  }, [watchedImage]);

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center mb-3">
          {id === "new-category" || !id
            ? "Create a new Category"
            : `Edit your ${watch("name")}`}
        </h4>
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
            imagePreview={imagePreview}
          />
        </div>
      </div>
    </>
  );
}

export default CreateCategoryPage;
