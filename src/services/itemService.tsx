import axios from "axios";
import { BaseItem, LibraryFormData, LibraryItem } from "../types";

const API_URL = import.meta.env.VITE_API_URL + "/api/items";

export function getItems() {
  return axios.get<BaseItem[]>(API_URL);
}

export function getItem(id: string) {
  return axios.get<BaseItem>(`${API_URL}/${id}`);
}

export function saveItem(form: LibraryFormData) {
  if (form.id) {
    return axios.put<BaseItem>(`${API_URL}/${form.id}`, form);
  } else {
    return axios.post<BaseItem[]>(API_URL, form);
  }
}

export function deleteItem(id: string) {
  return axios.delete<LibraryItem[]>(`${API_URL}/${id}`);
}

export function canBorrow(item: LibraryItem): boolean {
  if (item.type === "ReferenceBook") return false;
  return item.isBorrowable === true && !item.borrower;
}

export function checkoutItem(itemId: string, borrower: string) {
  return axios.post<BaseItem>(`${API_URL}/${itemId}/checkout`, { borrower });
}

export function returnItem(itemId: string) {
  return axios.post<BaseItem>(`${API_URL}/${itemId}/return`);
}
