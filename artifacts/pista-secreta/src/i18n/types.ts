export type Lang = "pt-BR" | "en" | "es";

export type Localized<T> = {
  "pt-BR": T;
  en?: T;
  es?: T;
};

export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang] ?? value["pt-BR"];
}
