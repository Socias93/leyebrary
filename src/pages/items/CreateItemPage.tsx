import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveItem } from "@/services/itemService";
import { FormField } from "@/components/index";
import { ItemForm, mapToFormData } from "@/pages/utils";
import { useItemForm } from "@/hooks/useItemForm";
import { uploadImage } from "@/services/imageService";
import { useItemData } from "@/hooks/useItemData";

const itemTypes = ["Book", "ReferenceBook", "DVD", "AudioBook"] as const;

function CreateItemPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    watchedType,
    fieldsToShow,
  } = useItemForm();

  const { categories, item } = useItemData(id);
  const watchedCategoryId = watch("categoryId");
  const selectedCategory = categories.find((c) => c.id === watchedCategoryId);

  useEffect(() => {
    if (!item) {
      reset({
        id: "",
        title: "",
        categoryId: "",
        type: undefined,
        image: undefined,
        attributes: {
          author: "",
          nbrPages: undefined,
          runTimeMinutes: undefined,
        },
      });
      setImagePreview(undefined);
      return;
    }

    reset(mapToFormData(item));
    setImagePreview(item.image);
  }, [item, reset]);

  async function onSubmit(data: ItemForm) {
    setIsLoading(true);
    try {
      let imageUrl: string | undefined;

      if (data.image instanceof FileList && data.image.length > 0) {
        imageUrl = await uploadImage(data.image[0]);
      } else if (typeof data.image === "string") {
        imageUrl = data.image;
      }

      await saveItem({ ...data, image: imageUrl });
      console.log("Submitted", data);
      navigate("/");
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
    <div className="container-lg px-3 py-3">
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-center">
          {id === "new"
            ? `Create a new item`
            : `Update your ${selectedCategory?.name} ${watchedType || ""}`}
        </h4>

        <div
          className="p-3 shadow rounded-4 mt-2 mx-3"
          style={{ width: "100%", maxWidth: 420 }}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" {...register("title")} />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-3 mt-4">
            <select
              key={id}
              className="form-select"
              {...register("type")}
              value={watch("type") ?? ""}>
              <option value="">Select Type</option>
              {itemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-danger">{errors.type.message}</p>
            )}
          </div>

          <div className="mt-4">
            <select className="form-select" {...register("categoryId")}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-danger">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label mt-3">Image</label>

            {imagePreview && (
              <div className="mb-2">
                <img
                  className="rounded-3"
                  src={imagePreview}
                  alt="preview"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              </div>
            )}
            <input
              key={id}
              {...register("image")}
              type="file"
              className="form-control"
            />

            {errors.image && (
              <p className="text-danger">{errors.image.message} </p>
            )}
          </div>

          <FormField
            errors={errors}
            handleSubmit={handleSubmit}
            register={register}
            onSubmit={onSubmit}
            fields={fieldsToShow}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateItemPage;
