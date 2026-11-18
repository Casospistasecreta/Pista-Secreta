export type Lang = "pt-BR" | "en" | "es";

export type Localized<T> = {
  "pt-BR": T;
  en?: T;
  es?: T;
};

export type LocalizedText = string | Localized<string>;

export type ResolvedLocalized<T> = T extends Localized<infer Value>
  ? ResolvedLocalized<Value>
  : T extends readonly (infer Item)[]
    ? ResolvedLocalized<Item>[]
    : T extends object
      ? { [Key in keyof T]: ResolvedLocalized<T[Key]> }
      : T;

export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang] ?? value["pt-BR"];
}

function isLocalizedValue(value: unknown): value is Localized<unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || !("pt-BR" in value)) return false;
  return Object.keys(value).every((key) => key === "pt-BR" || key === "en" || key === "es");
}

export function resolveLocalized<T>(value: T, lang: Lang): ResolvedLocalized<T> {
  if (isLocalizedValue(value)) {
    return resolveLocalized(pick(value, lang), lang) as ResolvedLocalized<T>;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalized(item, lang)) as ResolvedLocalized<T>;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveLocalized(item, lang)]),
    ) as ResolvedLocalized<T>;
  }
  return value as ResolvedLocalized<T>;
}
