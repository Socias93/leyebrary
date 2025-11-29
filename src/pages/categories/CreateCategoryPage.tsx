import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Category } from "@/services/utils";
import {
  CategoryFormData,
  categorySchema,
} from "./categoryschema/CreateCategorySchema";
import { CategoryFieldInput } from "@/components";
import { getCategories, saveCategory } from "@services/categoryService";
import axios from "axios";

const CATEGORY_ERROR = "Category already exists";
const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dyqpakdse/image/upload";

function CreateCategoryPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { name: "", fields: [], imageUrl: undefined },
    resolver: zodResolver(categorySchema),
  });

  async function onSubmit(data: CategoryFormData) {
    const res = await getCategories();
    const categories = (res as any).data ?? [];
    const exists = categories.some(
      (c: Category) => c.name.toLowerCase() === data.name.toLowerCase()
    );

    if (exists) {
      alert(CATEGORY_ERROR);
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
  }

  return (
    <>
      <div className="vh-100 d-grid justify-content-center align-content-center">
        <h4 className="text-center mb-3">Create a new Category</h4>
        <div className="p-3 shadow rounded-4">
          <CategoryFieldInput
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
        </div>
      </div>
    </>
  );
}

export default CreateCategoryPage;
