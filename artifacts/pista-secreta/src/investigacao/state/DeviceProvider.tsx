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

  const open = useCallback((screen: Screen) => setStack((prev) => [...prev, screen]), []);
  const back = useCallback(() => setStack((prev) => prev.slice(0, -1)), []);
  const goHome = useCallback(() => setStack([]), []);
  const replace = useCallback(
    (screen: Screen) => setStack((prev) => (prev.length === 0 ? [screen] : [...prev.slice(0, -1), screen])),
    [],
  );
  const unlockDevice = useCallback(
    (code: string) => {
      if (code === localizedCaseData.device.passcode) {
        setDeviceUnlocked(true);
        return true;
      }
      return false;
    },
    [localizedCaseData.device.passcode],
  );
  const lockDevice = useCallback(() => {
    setDeviceUnlocked(false);
    setStack([]);
  }, []);
  const isUnlocked = useCallback((key: string) => unlocked.includes(key), [unlocked]);
  const tryUnlock = useCallback((key: string, code: string, expected: string) => {
    if (code.trim() !== expected) return false;
    setUnlocked((prev) => (prev.includes(key) ? prev : [...prev, key]));
    return true;
  }, []);
  const grantUnlock = useCallback((key: string) => {
    setUnlocked((prev) => (prev.includes(key) ? prev : [...prev, key]));
  }, []);
  const labelFor = useCallback((id: AppId, fallback: string) => localizedCaseData.appLabels?.[id] ?? fallback, [localizedCaseData.appLabels]);
  const isEvidence = useCallback((id: string) => evidence.some((item) => item.id === id), [evidence]);
  const toggleEvidence = useCallback((item: EvidenceItem) => {
    setEvidence((prev) =>
      prev.some((existing) => existing.id === item.id)
        ? prev.filter((existing) => existing.id !== item.id)
        : [...prev, item],
    );
  }, []);
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