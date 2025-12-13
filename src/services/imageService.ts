import axios from "axios";

const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/dyqpakdse/image/upload";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "leyebrary");

  const response = await axios.post(CLOUDINARY_API, formData);
  return response.data.secure_url;
}
