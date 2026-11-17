import { useLanguage } from "./LanguageProvider";
import type { Lang } from "./types";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <label className={`inline-flex items-center gap-2 ${className}`}>
      <span className="sr-only">{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        data-testid="select-language"
        value={lang}
        onChange={(event) => setLang(event.target.value as Lang)}
        className="rounded border border-primary/25 bg-background/90 px-2.5 py-2 text-xs text-foreground shadow-sm outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-secondary/70"
      >
        <option value="pt-BR" aria-label="Português">🇧🇷 Português</option>
        <option value="en" aria-label="English">🇺🇸 English</option>
        <option value="es" aria-label="Español">🇪🇸 Español</option>
      </select>
    </label>
  );
}
