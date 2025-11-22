import { JSX } from "react";
import { BaseItem } from "../services/fakeItemService";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

export interface BookishFormData {
  _id?: string;
  title: string;
  categoryId: string;
  author: string;
  nbrPages: number;
  isBorrowable?: boolean;
}

export interface TimeBasedFormData {
  _id?: string;
  title: string;
  categoryId: string;
  runTimeMinutes: number;
  isBorrowable?: boolean;
}

export interface LibraryFormData {
  _id?: string;
  title: string;
  categoryId: string;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
  isBorrowable?: boolean;
}

export interface TextColumn {
  path: string;
  label: string;
}

export interface ContentColumn {
  key: string;
  content: (item: BaseItem) => JSX.Element;
}

export type Columns = TextColumn | ContentColumn;

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}
