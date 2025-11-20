// library.ts
export interface Category {
  _id: string;
  name: string;
}

export interface NewCategoryData {
  name: string;
}

/**
 * Kategorierna som ska finnas (unika _id)
 */
export const categories: Category[] = [
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000001", name: "Book" },
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000002", name: "DVD" },
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000003", name: "Audiobook" },
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000004", name: "Referencebook" },
];

export function getCategories(): Category[] {
  return categories;
}

export function saveCategory(newCategory: NewCategoryData): Category | null {
  // Kontrollera om category redan finns
  const exists = categories.find(
    (c) => c.name.toLowerCase() === newCategory.name.toLowerCase()
  );
  if (exists) {
    return null; // returnera null om den redan finns
  }

  // Skapa nytt Category-objekt
  const category: Category = {
    _id: crypto.randomUUID(), // eller valfri metod för unik _id
    name: newCategory.name,
  };

  // Lägg till i categories-arrayen
  categories.push(category);

  return category;
}

/**
 * Common fields for all library items
 */
export interface BaseItem {
  _id: string;
  title: string;
  type: "Book" | "DVD" | "Audiobook" | "Referencebook";
  isBorrowable: boolean;
  categoryId: string; // ska peka på en Category._id
  // fält som sätts när utlånad:
  borrower?: string;
  borrowDate?: string; // ISO date string
}

/**
 * Specifika obligatoriska fält per typ
 */
export interface Book extends BaseItem {
  type: "Book";
  author: string;
  nbrPages: number;
  // isBorrowable true => kan lånas; Referencebook kommer ha isBorrowable=false
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
  // enligt regeln: Referencebook kan INTE lånas => isBorrowable should be false
}

/**
 * Unionstyp för alla items
 */
export type LibraryItem = Book | DVD | Audiobook | ReferenceBook;

/**
 * Hjälpfunktion: kolla om en item kan lånas (enligt regler)
 * - En Book/DVD/Audiobook kan lånas endast om isBorrowable === true
 * - En Referencebook (type === "Referencebook") kan aldrig lånas (returnerar false)
 */
export function canBorrow(item: LibraryItem): boolean {
  if (item.type === "Referencebook") return false;
  return item.isBorrowable === true && !item.borrower;
}

/**
 * Låna ett objekt:
 * - returnerar nytt objekt med borrower och borrowDate satt om det var möjligt
 * - annars kastar ett Error
 */
export function checkoutItem(
  item: LibraryItem,
  borrower: string,
  date = new Date()
): LibraryItem {
  if (!canBorrow(item)) {
    throw new Error(
      `Item "${item.title}" (id=${item._id}, type=${item.type}) kan ej lånas.`
    );
  }

  // skapa en kopia med utlåningsfält fyllda
  const isoDate = date.toISOString();
  return { ...item, borrower, borrowDate: isoDate } as LibraryItem;
}

/**
 * Återlämna ett objekt:
 * - tar bort borrower och borrowDate
 * - om objektet inte var utlånat så kastar den Error
 */
export function returnItem(item: LibraryItem): LibraryItem {
  if (!item.borrower) {
    throw new Error(`Item "${item.title}" är inte utlånad.`);
  }
  const copy = { ...item } as any;
  delete copy.borrower;
  delete copy.borrowDate;
  return copy as LibraryItem;
}

/**
 * Exempel: några items (OBS: använd i produktion ett riktigt DB)
 */
export const sampleItems: LibraryItem[] = [
  {
    _id: "item-0001",
    title: "Svenska sagor",
    author: "A. Författare",
    nbrPages: 320,
    type: "Book",
    isBorrowable: true,
    categoryId: categories.find((c) => c.name === "Book")!._id,
  },
  {
    _id: "item-0002",
    title: "Action Movie I",
    runTimeMinutes: 125,
    type: "DVD",
    isBorrowable: true,
    categoryId: categories.find((c) => c.name === "DVD")!._id,
  },
  {
    _id: "item-0003",
    title: "Storytelling - Audiobook",
    runTimeMinutes: 400,
    type: "Audiobook",
    isBorrowable: true,
    categoryId: categories.find((c) => c.name === "Audiobook")!._id,
  },
  {
    _id: "item-0004",
    title: "Nationalencyklopedin Volym 1",
    author: "NE",
    nbrPages: 1200,
    type: "Referencebook",
    isBorrowable: false, // får inte lånas
    categoryId: categories.find((c) => c.name === "Referencebook")!._id,
  },
];

/*
  Exempel på användning:

  import { sampleItems, checkoutItem, returnItem } from './library';

  const book = sampleItems[0];
  if (canBorrow(book)) {
    const lent = checkoutItem(book, 'Anna Andersson');
    // lent.borrower och lent.borrowDate är nu satta
  }

  // återlämna
  const returned = returnItem(lent);
*/

export default {
  categories,
  getCategories,
  sampleItems,
  canBorrow,
  checkoutItem,
  returnItem,
};
