import type { CaseData } from "../types";
import { casoDemo } from "./caso-demo";

/**
 * Registro de casos.
 *
 * Para adicionar /investigacao/caso-01:
 *   1. crie `caso-01.ts` exportando um `CaseData` com slug "caso-01";
 *   2. importe aqui e adicione ao objeto abaixo.
 * Nenhum componente precisa ser alterado.
 */
export const CASES: Record<string, CaseData> = {
  [casoDemo.slug]: casoDemo,
};

export const DEFAULT_CASE_SLUG = casoDemo.slug;

export function getCase(slug?: string): CaseData | null {
  const key = slug && slug.length > 0 ? slug : DEFAULT_CASE_SLUG;
  return CASES[key] ?? null;
}

export function listCases(): CaseData[] {
  return Object.values(CASES);
}
