import type { CaseData } from "../types";
import { casoDemo } from "./caso-demo";
import { caso02 } from "./caso-02";
export const CASES: Record<string, CaseData> = { [casoDemo.slug]: casoDemo, [caso02.slug]: caso02 };
export const DEFAULT_CASE_SLUG = casoDemo.slug;
export function getCase(slug?: string) { return CASES[slug && slug.length > 0 ? slug : DEFAULT_CASE_SLUG] ?? null; }
export function listCases() { return Object.values(CASES); }