import { ReactNode } from "react";
import { BaseItem } from "../types";

export interface TextColumn {
  path: string;
  label: string;
}

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
