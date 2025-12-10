import axios from "axios";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getCategories, saveCategory } from "../../services/categoryService";
import { CategoryFieldInput } from "../../components/index";
import { categorySchema } from "./categoryschema/CreateCategorySchema";
import { Category, CategoryFormData } from "../../types";

const CATEGORY_ERROR = "Category already exists";
const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dyqpakdse/image/upload";

function CreateCategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { name: "", imageUrl: undefined },
    resolver: zodResolver(categorySchema),
  });

  async function onSubmit(data: CategoryFormData) {
    setIsLoading(true);
    try {
      const res = await getCategories();
      const categories = (res as any).data ?? [];
      const exists = categories.some(
        (c: Category) => c.name.toLowerCase() === data.name.toLowerCase()
      );
      if (exists) {
        setErrorMessage(CATEGORY_ERROR);
        setIsLoading(false);
        return;
      }

      console.log("Submitted", data);

      if (data.imageUrl) {
        const cloudinaryUrl = CLOUDINARY_API;
        const formData = new FormData();
        formData.append("file", data.imageUrl[0]);
        formData.append("upload_preset", "leyebrary");
        const respone = await axios.post(cloudinaryUrl, formData);
        console.log(respone);
        await saveCategory({ ...data, imageUrl: respone.data.secure_url });
        navigate("/all/categories");
      }
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
