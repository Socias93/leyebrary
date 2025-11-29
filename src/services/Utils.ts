import { BaseItem, ItemType } from "../types";

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
