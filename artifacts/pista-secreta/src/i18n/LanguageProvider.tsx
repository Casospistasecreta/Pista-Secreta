import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { pick, type Lang, type Localized } from "./types";
import uiPtBR from "./ui/pt-BR";
import sitePtBR from "./site/pt-BR";
import quizPtBR from "./quiz/pt-BR";

const ptBR = { ...uiPtBR, ...sitePtBR, ...quizPtBR };
export type TranslationKey = keyof typeof ptBR;
type Dictionary = Partial<Record<TranslationKey, string>>;
type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
};

const STORAGE_KEY = "pista-secreta:language";
const LanguageContext = createContext<LanguageContextValue | null>(null);

function readSavedLanguage(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "es" || saved === "pt-BR" ? saved : "pt-BR";
  } catch {
    return "pt-BR";
  }
}

async function loadDictionary(lang: Lang): Promise<Dictionary> {
  if (lang === "pt-BR") return ptBR;
  if (lang === "en") {
    const [ui, site, quiz] = await Promise.all([import("./ui/en"), import("./site/en"), import("./quiz/en")]);
    return { ...ui.default, ...site.default, ...quiz.default };
  }
  const [ui, site, quiz] = await Promise.all([import("./ui/es"), import("./site/es"), import("./quiz/es")]);
  return { ...ui.default, ...site.default, ...quiz.default };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readSavedLanguage);
  const [dictionary, setDictionary] = useState<Dictionary>(ptBR);
  const [loadedLang, setLoadedLang] = useState<Lang>("pt-BR");

  useEffect(() => {
    let active = true;
    loadDictionary(lang).then((loaded) => {
      if (!active) return;
      setDictionary(loaded);
      setLoadedLang(lang);
    }).catch((error: unknown) => {
      if (!active) return;
      console.error(`[i18n] Could not load ${lang}; reverting to pt-BR.`, error);
      try {
        window.localStorage.setItem(STORAGE_KEY, "pt-BR");
      } catch {
        // The interface still falls back to Portuguese without storage.
      }
      setDictionary(ptBR);
      setLangState("pt-BR");
      setLoadedLang("pt-BR");
    });
    return () => {
      active = false;
    };
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Language selection remains available when browser storage is disabled.
    }
    setLangState(next);
  }, []);

  const t = useCallback(
    (key: TranslationKey, values?: Record<string, string | number>) => {
      const activeDictionary = loadedLang === lang ? dictionary : ptBR;
      const localized: Localized<string> = {
        "pt-BR": ptBR[key],
        en: lang === "en" ? activeDictionary[key] : undefined,
        es: lang === "es" ? activeDictionary[key] : undefined,
      };
      const template = pick(localized, lang);
      if (import.meta.env.DEV && loadedLang === lang && !dictionary[key] && lang !== "pt-BR") {
        console.warn(`[i18n] Missing "${key}" for ${lang}; using pt-BR fallback.`);
      }
      return template.replace(/\{(\w+)\}/g, (match, name: string) =>
        values && name in values ? String(values[name]) : match,
      );
    },
    [dictionary, lang, loadedLang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage precisa estar dentro de <LanguageProvider>.");
  return context;
}

export function useT() {
  return useLanguage().t;
}
