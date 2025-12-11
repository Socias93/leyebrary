import z from "zod";
import { categorySchema } from "./pages/categories/categoryschema/CreateCategorySchema";
import { ContentColumn, TextColumn } from "./pages/utils";

export type ItemType = "Book" | "ReferenceBook" | "DVD" | "AudioBook";

export type LibraryItem = Book | DVD | AudioBook | ReferenceBook;

export type CategoryFormData = z.infer<typeof categorySchema>;

export type Columns = TextColumn | ContentColumn;

export interface Category {
  id: string;
  name: ItemType | string;
  image?: FileList;
  fields?: ("author" | "nbrPages" | "runTimeMinutes")[];
}
export interface BaseItem {
  id: string;
  title: string;
  isBorrowable?: boolean;
  category: Category;
  attributes?: Record<string, any>;
  image: FileList;
  borrower?: string;
  borrowDate?: string;
  type?: ItemType;
}

export interface LibraryFormData {
  id?: string;
  title: string;
  isBorrowable?: boolean;
  categoryId: string;
  author?: string;
  image: FileList;
  nbrPages?: number;
  runTimeMinutes?: number;
}

export interface NewCategoryData {
  id?: string;
  name: ItemType | string;
  image: string;
  fields?: ("author" | "nbrPages" | "runTimeMinutes")[];
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

export interface AudioBook extends BaseItem {
  type: "AudioBook";

  runTimeMinutes: number;
}

export interface ReferenceBook extends BaseItem {
  type: "ReferenceBook";

  author: string;
  nbrPages: number;
}
