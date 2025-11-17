// fakeLibraryService.ts
import { Category, getCategories } from "./fakeCategoryService";

type ItemType = "Bok" | "DVD" | "Ljudbok" | "Uppslagsbok";

interface BaseItem {
  _id: string;
  title: string;
  type: ItemType;
  isBorrowable: boolean;
  category: Category;
  // if checked out:
  borrower?: string;
  borrowDate?: string; // ISO string
}

export interface Book extends BaseItem {
  type: "Bok";
  author: string;
  nbrPages: number;
}

export interface DVD extends BaseItem {
  type: "DVD";
  runTimeMinutes: number;
}

export interface Audiobook extends BaseItem {
  type: "Ljudbok";
  runTimeMinutes: number;
}

export interface ReferenceBook extends BaseItem {
  type: "Uppslagsbok";
  author: string;
  nbrPages: number;
}

export type LibraryItem = Book | DVD | Audiobook | ReferenceBook;

/**
 * Data shape expected from forms / client when creating/updating
 */
export interface LibraryFormData {
  _id?: string;
  title: string;
  type: ItemType;
  isBorrowable: boolean;
  categoryId: string;

  // depending on type:
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
}

/**
 * In-memory items (example data)
 * NOTE: category objects here should match categories returned by getCategories()
 */
const items: LibraryItem[] = [
  {
    _id: "lib-0001",
    title: "Svenska sagor",
    author: "A. Författare",
    nbrPages: 320,
    type: "Bok",
    isBorrowable: true,
    category: getCategories().find((c) => c.name === "Bok") || {
      _id: "unknown",
      name: "Bok",
    },
  } as Book,
  {
    _id: "lib-0002",
    title: "Action Movie I",
    runTimeMinutes: 125,
    type: "DVD",
    isBorrowable: true,
    category: getCategories().find((c) => c.name === "DVD") || {
      _id: "unknown",
      name: "DVD",
    },
  } as DVD,
  {
    _id: "lib-0003",
    title: "Storytelling - Ljudbok",
    runTimeMinutes: 400,
    type: "Ljudbok",
    isBorrowable: true,
    category: getCategories().find((c) => c.name === "Ljudbok") || {
      _id: "unknown",
      name: "Ljudbok",
    },
  } as Audiobook,
  {
    _id: "lib-0004",
    title: "Nationalencyklopedin Volym 1",
    author: "NE",
    nbrPages: 1200,
    type: "Uppslagsbok",
    isBorrowable: false,
    category: getCategories().find((c) => c.name === "Uppslagsbok") || {
      _id: "unknown",
      name: "Uppslagsbok",
    },
  } as ReferenceBook,
];

export function getItems() {
  return items;
}

export function getItem(id: string) {
  return items.find((it) => it._id === id);
}

/**
 * saveItem : create or update
 * - validates required fields per type
 * - ensures category exists
 * - enforces: Uppslagsbok -> isBorrowable = false
 */
export function saveItem(form: LibraryFormData) {
  const categoryInDb = getCategories().find((c) => c._id === form.categoryId);
  if (!categoryInDb) throw new Error("Category was not found");

  // Validate fields depending on type
  const type = form.type;
  if (!form.title) throw new Error("Title is required");
  if (type === "Bok") {
    if (!form.author) throw new Error("author is required for Bok");
    if (form.nbrPages == null) throw new Error("nbrPages is required for Bok");
  } else if (type === "Uppslagsbok") {
    if (!form.author) throw new Error("author is required for Uppslagsbok");
    if (form.nbrPages == null)
      throw new Error("nbrPages is required for Uppslagsbok");
  } else if (type === "DVD" || type === "Ljudbok") {
    if (form.runTimeMinutes == null)
      throw new Error("runTimeMinutes is required for DVD/Ljudbok");
  }

  // If updating existing item
  const itemInDb = items.find((i) => i._id === form._id) || ({} as LibraryItem);

  // common assignments
  (itemInDb as any).title = form.title;
  (itemInDb as any).type = form.type;
  // Uppslagsbok can never be borrowable
  (itemInDb as any).isBorrowable =
    form.type === "Uppslagsbok" ? false : form.isBorrowable;
  (itemInDb as any).category = categoryInDb;

  // type-specific assignments
  if (form.type === "Bok") {
    (itemInDb as any).author = form.author!;
    (itemInDb as any).nbrPages = form.nbrPages!;
  } else if (form.type === "Uppslagsbok") {
    (itemInDb as any).author = form.author!;
    (itemInDb as any).nbrPages = form.nbrPages!;
    // make sure it's not borrowable
    (itemInDb as any).isBorrowable = false;
    // remove borrower fields if accidentally set
    delete (itemInDb as any).borrower;
    delete (itemInDb as any).borrowDate;
  } else if (form.type === "DVD") {
    (itemInDb as any).runTimeMinutes = form.runTimeMinutes!;
  } else if (form.type === "Ljudbok") {
    (itemInDb as any).runTimeMinutes = form.runTimeMinutes!;
  }

  // if new -> assign id and push
  if (!(itemInDb as any)._id) {
    (itemInDb as any)._id = Date.now().toString();
    items.push(itemInDb);
  }

  return itemInDb;
}

/**
 * deleteItem : remove by id
 */
export function deleteItem(id: string) {
  const index = items.findIndex((i) => i._id === id);
  if (index === -1) return undefined;
  const removed = items.splice(index, 1)[0];
  return removed;
}

/**
 * Extra helpers you may find useful (not required but handy)
 */
export function canBorrow(item: LibraryItem): boolean {
  if (item.type === "Uppslagsbok") return false;
  return item.isBorrowable === true && !item.borrower;
}

export function checkoutItem(
  itemId: string,
  borrower: string,
  date = new Date()
): LibraryItem {
  const item = getItem(itemId);
  if (!item) throw new Error("Item not found");
  if (!canBorrow(item)) throw new Error("Item cannot be borrowed");
  item.borrower = borrower;
  item.borrowDate = date.toISOString();
  return item;
}

export function returnItem(itemId: string): LibraryItem {
  const item = getItem(itemId);
  if (!item) throw new Error("Item not found");
  if (!item.borrower) throw new Error("Item is not borrowed");
  delete item.borrower;
  delete item.borrowDate;
  return item;
}
