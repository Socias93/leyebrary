// library.ts
export interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
}

export interface NewCategoryData {
  name: string;
}

/**
 * Kategorierna som ska finnas (unika _id)
 */
export const categories: Category[] = [
  {
    _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000001",
    name: "Book",
    imageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000002",
    name: "DVD",
    imageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000003",
    name: "Audiobook",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7EkNtgAcu-9Z8KSX0YNQXhF63VCZWD4SnA&s",
  },
  {
    _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000004",
    name: "Referencebook",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6x-19DqjOcJGNqdH2srAn-DnSK_qeywDC4g&s",
  },
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
