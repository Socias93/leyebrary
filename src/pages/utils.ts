import { ReactNode } from "react";
import { BaseItem } from "../types";
import z from "zod";
import { itemSchema } from "./items/schemas/DynamicSchema";

export interface TextColumn {
  path: string;
  label: string;
}

export type ItemForm = z.infer<typeof itemSchema>;

export interface ContentColumn {
  key: string;
  content: (item: BaseItem) => ReactNode;
}

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
