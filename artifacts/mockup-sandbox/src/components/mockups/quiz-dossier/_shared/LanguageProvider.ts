import quizPtBR from "./quizPtBR";

export type TranslationKey = keyof typeof quizPtBR | "shared.close";

export function useT() {
  return (key: TranslationKey, values?: Record<string, string | number>) =>
    String(key === "shared.close" ? "Fechar" : quizPtBR[key] ?? key).replace(/\{(\w+)\}/g, (match, name: string) =>
      values && name in values ? String(values[name]) : match,
    );
}
