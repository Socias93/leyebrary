import { JSX } from "react";
import { BaseItem } from "../services/Utils";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

export interface LibraryFormData {
  id?: string;
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
