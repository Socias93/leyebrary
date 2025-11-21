import { JSX } from "react";
import { BaseItem } from "../services/fakeItemService";
import { BookishFormData } from "./items/schemas/BookisSchema";
import { TimeBasedFormData } from "./items/schemas/TimeBasedSchema";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

export type LibraryFormData = BookishFormData | TimeBasedFormData;

export interface TextColumn {
  path: string;
  label: string;
}

export interface ContentColumn {
  key: string;
  content: (item: BaseItem) => JSX.Element;
}

export type Columns = TextColumn | ContentColumn;
