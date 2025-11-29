import z from "zod";
import { categorySchema } from "./pages/categories/categoryschema/CreateCategorySchema";
import { ContentColumn, TextColumn } from "./pages/utils";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

export type LibraryItem = Book | DVD | Audiobook | ReferenceBook;

export type CategoryFormData = z.infer<typeof categorySchema>;

export type Columns = TextColumn | ContentColumn;

export interface Category {
  id: string;
  name: ItemType | string;
  imageUrl?: FileList;
  fields?: ("author" | "nbrPages" | "runTimeMinutes")[];
}
export interface BaseItem {
  id: string;
  title: string;
  isBorrowable?: boolean;
  category: Category;
  attributes?: Record<string, any>;
  borrower?: string;
  borrowDate?: string;
}

export interface LibraryFormData {
  id?: string;
  title: string;
  isBorrowable?: boolean;
  categoryId: string;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
}

export interface NewCategoryData {
  name: ItemType | string;
  imageUrl: string;
  fields?: ("author" | "nbrPages" | "runTimeMinutes")[];
}

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
