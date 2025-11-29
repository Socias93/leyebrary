import { ReactNode } from "react";
import { BaseItem } from "../services/utils";
import { categorySchema } from "../pages/index";
import z from "zod";

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

export type CategoryFormData = z.infer<typeof categorySchema>;

export interface ContentColumn {
  key: string;
  content: (item: BaseItem) => ReactNode;
}

export type Columns = TextColumn | ContentColumn;

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

export function getAbbreviation(title: string) {
  return title
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase());
}
