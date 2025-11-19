// fakeLibraryService.ts
import { Category, getCategories } from "./fakeCategoryService";

interface BaseItem {
  _id: string;
  title: string;
  isBorrowable?: boolean;
  category: Category;
  // if checked out:
  borrower?: string;
  borrowDate?: string; // ISO string
}

export interface Book extends BaseItem {
  type: "Book";
  author: string;
  nbrPages: number;
}

export interface DVD extends BaseItem {
  type: "DVD";
  runTimeMinutes: number;
}

export interface Audiobook extends BaseItem {
  type: "Audiobook";
  runTimeMinutes: number;
}

export interface ReferenceBook extends BaseItem {
  type: "Referencebook";
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
  isBorrowable?: boolean;
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
    isBorrowable: true,
    category: getCategories().find((c) => c.name === "Book") || {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000001",
      name: "Book",
    },
  } as Book,
  {
    _id: "lib-0002",
    title: "Action Movie I",
    runTimeMinutes: 125,
    isBorrowable: true,
    category: getCategories().find((c) => c.name === "DVD") || {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000002",
      name: "DVD",
    },
  } as DVD,
  {
    _id: "lib-0003",
    title: "Storytelling - Audiobook",
    runTimeMinutes: 400,
    isBorrowable: true,
    category: getCategories().find((c) => c.name === "Audiobook") || {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000003",
      name: "Audiobook",
    },
  } as Audiobook,
  {
    _id: "lib-0004",
    title: "Nationalencyklopedin Volym 1",
    author: "NE",
    nbrPages: 1200,
    isBorrowable: false,
    category: getCategories().find((c) => c.name === "Referencebook") || {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000004",
      name: "Referencebook",
    },
  } as ReferenceBook,

  {
    _id: "lib-0005",
    title: "Svenska sagor - Volym 2",
    author: "A. Författare",
    nbrPages: 288,
    isBorrowable: true,
    category: { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000001", name: "Book" },
  } as Book,
  {
    _id: "lib-0006",
    title: "Moderna noveller",
    author: "B. Författare",
    nbrPages: 214,
    isBorrowable: true,
    category: { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000001", name: "Book" },
  } as Book,

  // Två extra DVD
  {
    _id: "lib-0007",
    title: "Action Movie II",
    runTimeMinutes: 132,
    isBorrowable: true,
    category: { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000002", name: "DVD" },
  } as DVD,
  {
    _id: "lib-0008",
    title: "Drama Anthology",
    runTimeMinutes: 98,
    isBorrowable: true,
    category: { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000002", name: "DVD" },
  } as DVD,

  // Två extra ljudböcker
  {
    _id: "lib-0009",
    title: "Storytelling - Audiobook Vol. 2",
    runTimeMinutes: 360,
    isBorrowable: true,
    category: {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000003",
      name: "Audiobook",
    },
  } as Audiobook,
  {
    _id: "lib-0010",
    title: "Berättelser för natten",
    runTimeMinutes: 240,
    isBorrowable: true,
    category: {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000003",
      name: "Audiobook",
    },
  } as Audiobook,

  // Två extra uppslagsböcker
  {
    _id: "lib-0011",
    title: "Nationalencyklopedin Volym 2",
    author: "NE",
    nbrPages: 1184,
    isBorrowable: false,
    category: {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000004",
      name: "Referencebook",
    },
  } as ReferenceBook,
  {
    _id: "lib-0012",
    title: "Nationalencyklopedin Volym 3",
    author: "NE",
    nbrPages: 1220,
    isBorrowable: false,
    category: {
      _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000004",
      name: "Referencebook",
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
 * - enforces: Referencebook -> isBorrowable = false
 */
export function saveItem(form: LibraryFormData) {
  const categoryInDb = getCategories().find((c) => c._id === form.categoryId);
  if (!categoryInDb) throw new Error("Category was not found");

  // Validate fields depending on type
  const type = form.categoryId;
  if (!form.title) throw new Error("Title is required");
  if (type === "Book") {
    if (!form.author) throw new Error("author is required for Book");
    if (form.nbrPages == null) throw new Error("nbrPages is required for Book");
  } else if (type === "Referencebook") {
    if (!form.author) throw new Error("author is required for Referencebook");
    if (form.nbrPages == null)
      throw new Error("nbrPages is required for Referencebook");
  } else if (type === "DVD" || type === "Audiobook") {
    if (form.runTimeMinutes == null)
      throw new Error("runTimeMinutes is required for DVD/Audiobook");
  }

  // If updating existing item
  const itemInDb = items.find((i) => i._id === form._id) || ({} as LibraryItem);

  // common assignments
  (itemInDb as any).title = form.title;
  (itemInDb as any).type = form.categoryId;
  // Referencebook can never be borrowable
  (itemInDb as any).isBorrowable =
    form.categoryId === "Referencebook" ? false : form.isBorrowable;
  (itemInDb as any).category = categoryInDb;

  // type-specific assignments
  if (form.categoryId === "Book") {
    (itemInDb as any).author = form.author!;
    (itemInDb as any).nbrPages = form.nbrPages!;
  } else if (form.categoryId === "Referencebook") {
    (itemInDb as any).author = form.author!;
    (itemInDb as any).nbrPages = form.nbrPages!;
    // make sure it's not borrowable
    (itemInDb as any).isBorrowable = false;
    // remove borrower fields if accidentally set
    delete (itemInDb as any).borrower;
    delete (itemInDb as any).borrowDate;
  } else if (form.categoryId === "DVD") {
    (itemInDb as any).runTimeMinutes = form.runTimeMinutes!;
  } else if (form.categoryId === "Audiobook") {
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
  if (item.type === "Referencebook") return false;
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
