import { Category, NewCategoryData } from "@services/utils";
import axios from "axios";

const API_URL = "http://localhost:5313/api/categories";

export function getCategories() {
  return axios.get<Category[]>(API_URL);
}

export function saveCategory(category: NewCategoryData) {
  return axios.post(API_URL, category);
}

export function deleteCategory(id: string) {
  return axios.delete<Category>(`${API_URL}/${id}`);
}
