// fakeLibraryService.ts
import axios from "axios";
import { BaseItem, LibraryFormData, LibraryItem } from "./utils";

const API_URL = "http://localhost:5313/api/items";

export function getItems() {
  return axios.get<BaseItem[]>(API_URL);
}

export function getItem(id: string) {
  return axios.get<BaseItem>(`${API_URL}/${id}`);
}

export function saveItem(form: LibraryFormData) {
  if (form.id) {
    return axios.put(`${API_URL}/${form.id}`, form);
  } else {
    return axios.post(API_URL, form);
  }
}

export function deleteItem(id: string) {
  return axios.delete<LibraryItem>(`${API_URL}/${id}`);
}

export function canBorrow(item: LibraryItem): boolean {
  if (item.category.name === "Referencebook") return false;
  return item.isBorrowable === true && !item.borrower;
}

export function checkoutItem(itemId: string, borrower: string) {
  return axios.post(`${API_URL}/${itemId}/checkout`, { borrower });
}

export function returnItem(itemId: string) {
  return axios.post(`${API_URL}/${itemId}/return`);
}
