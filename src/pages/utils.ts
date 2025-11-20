import { BookishFormData } from "./items/schemas/BookisSchema";
import { TimeBasedFormData } from "./items/schemas/TimeBasedSchema";

export type ItemType = "Book" | "Referencebook" | "DVD" | "Audiobook";

export type LibraryFormData = BookishFormData | TimeBasedFormData;
