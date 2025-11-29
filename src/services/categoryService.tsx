import axios from "axios";
import { Category, NewCategoryData } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/api/categories";

export function getCategories() {
  return axios.get<Category[]>(API_URL);
}

export function saveCategory(category: NewCategoryData) {
  return axios.post(API_URL, category);
}

export function deleteCategory(id: string) {
  return axios.delete<Category>(`${API_URL}/${id}`);
}
