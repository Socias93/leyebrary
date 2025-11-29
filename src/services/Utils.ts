import { ItemType } from "@pages/utils";

// library.ts
export interface Category {
  id: string;
  name: ItemType | string;
  imageUrl?: FileList;
  fields?: ("author" | "nbrPages" | "runTimeMinutes")[];
}

export interface NewCategoryData {
  name: ItemType | string;
  imageUrl: string;
  fields?: ("author" | "nbrPages" | "runTimeMinutes")[];
}

export interface BaseItem {
  id: string;
  title: string;
  isBorrowable?: boolean;
  category: Category;
  attributes?: Record<string, any>;
  borrower?: string;
  borrowDate?: string; // ISO string
}

export type LibraryItem = Book | DVD | Audiobook | ReferenceBook;

export interface Book extends BaseItem {
  author: string;
  nbrPages: number;
}

export interface DVD extends BaseItem {
  runTimeMinutes: number;
}

export interface Audiobook extends BaseItem {
  runTimeMinutes: number;
}

export interface ReferenceBook extends BaseItem {
  author: string;
  nbrPages: number;
}

/**
 * Data shape expected from forms / client when creating/updating
 */
export interface LibraryFormData {
  id?: string;
  title: string;
  isBorrowable?: boolean;
  categoryId: string;

  // depending on type:
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
}
