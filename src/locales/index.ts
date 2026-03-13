import es from "./es";
import en from "./en";
import type { Dict } from "./types";
import type { Locale } from "@/lib/i18n";

export type { Dict };

export const dictionaries: Record<Locale, Dict> = { es, en };
