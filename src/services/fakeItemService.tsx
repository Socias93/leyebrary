// fakeLibraryService.ts
import axios from "axios";
import { BaseItem, LibraryFormData, LibraryItem } from "./utils";

const API_URL = "http://localhost:5313/api/items";

/**
 * In-memory items (example data)
 * NOTE: category objects here should match categories returned by getCategories()
 */

export function getItems() {
  return axios.get<BaseItem[]>(API_URL);
}

export function getItem(id: string) {
  return axios.get<BaseItem>(`${API_URL}/${id}`);
}

/**
 * saveItem : create or update
 * - validates required fields per type
 * - ensures category exists
 * - enforces: Referencebook -> isBorrowable = false
 */
export function saveItem(form: LibraryFormData) {
  if (form.id) {
    // Update existing item
    return axios.put(`${API_URL}/${form.id}`, form);
  } else {
    // Create new item
    return axios.post(API_URL, form);
  }
}

/**
 * deleteItem : remove by id
 */
export function deleteItem(id: string) {
  return axios.delete<LibraryItem>(`${API_URL}/${id}`);
}

/**
 * Extra helpers you may find useful (not required but handy)
 */
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
