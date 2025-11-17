// library.ts
export interface Category {
  _id: string;
  name: string;
}

/**
 * Kategorierna som ska finnas (unika _id)
 */
export const categories: Category[] = [
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000001", name: "Bok" },
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000002", name: "DVD" },
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000003", name: "Ljudbok" },
  { _id: "c1b3f9a0-1a2b-4c3d-8e9f-000000000004", name: "Uppslagsbok" },
];

export function getCategories(): Category[] {
  return categories;
}

/**
 * Common fields for all library items
 */
export interface BaseItem {
  _id: string;
  title: string;
  type: "Bok" | "DVD" | "Ljudbok" | "Uppslagsbok";
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
  type: "Bok";
  author: string;
  nbrPages: number;
  // isBorrowable true => kan lånas; uppslagsbok kommer ha isBorrowable=false
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
  // enligt regeln: uppslagsbok kan INTE lånas => isBorrowable should be false
}

/**
 * Unionstyp för alla items
 */
export type LibraryItem = Book | DVD | Audiobook | ReferenceBook;

/**
 * Hjälpfunktion: kolla om en item kan lånas (enligt regler)
 * - En bok/DVD/ljudbok kan lånas endast om isBorrowable === true
 * - En uppslagsbok (type === "Uppslagsbok") kan aldrig lånas (returnerar false)
 */
export function canBorrow(item: LibraryItem): boolean {
  if (item.type === "Uppslagsbok") return false;
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
    type: "Bok",
    isBorrowable: true,
    categoryId: categories.find((c) => c.name === "Bok")!._id,
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
    title: "Storytelling - Ljudbok",
    runTimeMinutes: 400,
    type: "Ljudbok",
    isBorrowable: true,
    categoryId: categories.find((c) => c.name === "Ljudbok")!._id,
  },
  {
    _id: "item-0004",
    title: "Nationalencyklopedin Volym 1",
    author: "NE",
    nbrPages: 1200,
    type: "Uppslagsbok",
    isBorrowable: false, // får inte lånas
    categoryId: categories.find((c) => c.name === "Uppslagsbok")!._id,
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
