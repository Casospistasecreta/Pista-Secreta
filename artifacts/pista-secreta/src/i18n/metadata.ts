import type { Lang } from "./types";

function updateMeta(attribute: "name" | "property", key: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.append(meta);
  }
  meta.content = content;
}

export function updateMetaDescription(description: string) {
  updateMeta("name", "description", description);
  updateMeta("property", "og:description", description);
  updateMeta("name", "twitter:description", description);
}

export function updatePageMetadata(title: string, description: string, lang: Lang) {
  document.title = title;
  updateMetaDescription(description);
  updateMeta("property", "og:title", title);
  updateMeta("name", "twitter:title", title);
  updateMeta("property", "og:locale", { "pt-BR": "pt_BR", en: "en_US", es: "es_ES" }[lang]);
}
