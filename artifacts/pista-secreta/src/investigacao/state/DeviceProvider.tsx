import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { trackEvent } from "@/lib/analytics";
import { resolveLocalized, type ResolvedLocalized } from "@/i18n/types";
import type { AppId, CaseData, EvidenceItem, Screen } from "../types";

interface PersistedState {
  evidence: EvidenceItem[];
  unlocked: string[];
}

interface DeviceContextValue {
  caseData: ResolvedLocalized<CaseData>;
  deviceUnlocked: boolean;
  unlockDevice: (code: string) => boolean;
  lockDevice: () => void;
  stack: Screen[];
  current: Screen | null;
  open: (screen: Screen) => void;
  back: () => void;
  goHome: () => void;
  replace: (screen: Screen) => void;
  isUnlocked: (key: string) => boolean;
  /** Libera um conteúdo trancado sem senha (usado pelos desafios do TabuLive). */
  grantUnlock: (key: string) => void;
  /** Nome do aplicativo neste caso (permite renomear, ex.: PicLike -> PIKLIKE). */
  labelFor: (id: AppId, fallback: string) => string;
  tryUnlock: (key: string, code: string, expected: string) => boolean;
  evidence: EvidenceItem[];
  isEvidence: (id: string) => boolean;
  toggleEvidence: (item: EvidenceItem) => void;
  removeEvidence: (id: string) => void;
  clearEvidence: () => void;
}

const DeviceContext = createContext<DeviceContextValue | null>(null);

function storageKey(slug: string) {
  return `pista-secreta:investigacao:${slug}`;
}

function readPersisted(slug: string): PersistedState {
  const empty: PersistedState = { evidence: [], unlocked: [] };
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      evidence: Array.isArray(parsed.evidence) ? parsed.evidence : [],
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
    };
  } catch {
    return empty;
  }
}

export function DeviceProvider({
  caseData,
  children,
}: {
  caseData: CaseData;
  children: ReactNode;
}) {
  const { lang } = useLanguage();
  const localizedCaseData = useMemo(() => resolveLocalized(caseData, lang), [caseData, lang]);
  const [deviceUnlocked, setDeviceUnlocked] = useState(false);
  const [stack, setStack] = useState<Screen[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const persisted = readPersisted(localizedCaseData.slug);
    setEvidence(persisted.evidence);
    setUnlocked(persisted.unlocked);
  }, [localizedCaseData.slug]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        storageKey(localizedCaseData.slug),
        JSON.stringify({ evidence, unlocked } satisfies PersistedState),
      );
    } catch {
      /* modo privado / storage indisponível — o app continua funcionando */
    }
  }, [localizedCaseData.slug, evidence, unlocked]);

  const open = useCallback((screen: Screen) => {
    trackEvent("investigation_navigation", {
      case_id: localizedCaseData.slug,
      app_id: screen.app,
      action: screen.view ? "open_view" : "open_app",
      view_type: screen.view ?? "home",
    });
    setStack((prev) => [...prev, screen]);
  }, [localizedCaseData.slug]);
  const back = useCallback(() => {
    const screen = stack[stack.length - 1];
    if (screen) {
      trackEvent("investigation_navigation", {
        case_id: localizedCaseData.slug,
        app_id: screen.app,
        action: "back",
        view_type: screen.view ?? "home",
      });
    }
    setStack((prev) => prev.slice(0, -1));
  }, [localizedCaseData.slug, stack]);
  const goHome = useCallback(() => {
    const screen = stack[stack.length - 1];
    if (screen) {
      trackEvent("investigation_navigation", {
        case_id: localizedCaseData.slug,
        app_id: screen.app,
        action: "go_home",
        view_type: screen.view ?? "home",
      });
    }
    setStack([]);
  }, [localizedCaseData.slug, stack]);
  const replace = useCallback(
    (screen: Screen) => {
      trackEvent("investigation_navigation", {
        case_id: localizedCaseData.slug,
        app_id: screen.app,
        action: "replace_view",
        view_type: screen.view ?? "home",
      });
      setStack((prev) => (prev.length === 0 ? [screen] : [...prev.slice(0, -1), screen]));
    },
    [localizedCaseData.slug],
  );
  const unlockDevice = useCallback(
    (code: string) => {
      if (code === localizedCaseData.device.passcode) {
        setDeviceUnlocked(true);
        let alreadyStarted = false;
        try {
          alreadyStarted = window.sessionStorage.getItem(`pista-secreta:analytics:started:${localizedCaseData.slug}`) === "1";
          if (!alreadyStarted) {
            window.sessionStorage.setItem(`pista-secreta:analytics:started:${localizedCaseData.slug}`, "1");
          }
        } catch {
          // The event remains useful when browser storage is unavailable.
        }
        if (!alreadyStarted) trackEvent("investigation_start", { case_id: localizedCaseData.slug });
        return true;
      }
      return false;
    },
    [localizedCaseData.device.passcode, localizedCaseData.slug],
  );
  const lockDevice = useCallback(() => {
    setDeviceUnlocked(false);
    setStack([]);
  }, []);
  const isUnlocked = useCallback((key: string) => unlocked.includes(key), [unlocked]);
  const tryUnlock = useCallback((key: string, code: string, expected: string) => {
    if (code.trim() !== expected) return false;
    if (!unlocked.includes(key)) {
      trackEvent("investigation_clue_unlocked", {
        case_id: localizedCaseData.slug,
        app_id: key.split(":")[0] ?? "unknown",
      });
    }
    setUnlocked((prev) => (prev.includes(key) ? prev : [...prev, key]));
    return true;
  }, [localizedCaseData.slug, unlocked]);
  const grantUnlock = useCallback((key: string) => {
    if (!unlocked.includes(key)) {
      trackEvent("investigation_clue_unlocked", {
        case_id: localizedCaseData.slug,
        app_id: key.split(":")[0] ?? "unknown",
      });
    }
    setUnlocked((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, [localizedCaseData.slug, unlocked]);
  const labelFor = useCallback((id: AppId, fallback: string) => localizedCaseData.appLabels?.[id] ?? fallback, [localizedCaseData.appLabels]);
  const isEvidence = useCallback((id: string) => evidence.some((item) => item.id === id), [evidence]);
  const toggleEvidence = useCallback((item: EvidenceItem) => {
    const removing = evidence.some((existing) => existing.id === item.id);
    trackEvent("investigation_evidence_toggle", {
      case_id: localizedCaseData.slug,
      app_id: item.appId,
      action: removing ? "remove" : "save",
    });
    setEvidence((prev) =>
      prev.some((existing) => existing.id === item.id)
        ? prev.filter((existing) => existing.id !== item.id)
        : [...prev, item],
    );
  }, [evidence, localizedCaseData.slug]);
  const removeEvidence = useCallback((id: string) => setEvidence((prev) => prev.filter((item) => item.id !== id)), []);
  const clearEvidence = useCallback(() => setEvidence([]), []);

  const value = useMemo<DeviceContextValue>(
    () => ({
      caseData: localizedCaseData,
      deviceUnlocked,
      unlockDevice,
      lockDevice,
      stack,
      current: stack.length > 0 ? stack[stack.length - 1] : null,
      open,
      back,
      goHome,
      replace,
      isUnlocked,
      grantUnlock,
      labelFor,
      tryUnlock,
      evidence,
      isEvidence,
      toggleEvidence,
      removeEvidence,
      clearEvidence,
    }),
    [
      localizedCaseData, deviceUnlocked, unlockDevice, lockDevice, stack, open, back, goHome, replace,
      isUnlocked, grantUnlock, labelFor, tryUnlock, evidence, isEvidence, toggleEvidence, removeEvidence, clearEvidence,
    ],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceContextValue {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevice precisa estar dentro de <DeviceProvider>.");
  return ctx;
}