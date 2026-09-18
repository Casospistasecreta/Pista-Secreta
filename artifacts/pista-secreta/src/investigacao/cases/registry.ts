import type { CaseData } from "../types";
import { casoDemo } from "./caso-demo";
export const CASES: Record<string, CaseData> = { [casoDemo.slug]: casoDemo };
export const DEFAULT_CASE_SLUG = casoDemo.slug;
export function getCase(slug?: string) { return CASES[slug && slug.length > 0 ? slug : DEFAULT_CASE_SLUG] ?? null; }
export function listCases() { return Object.values(CASES); }