import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CaseData, EvidenceItem, Screen } from "../types";

interface PersistedState {
  evidence: EvidenceItem[];
  unlocked: string[];
}

interface DeviceContextValue {
  caseData: CaseData;

  /* Bloqueio do aparelho */
  deviceUnlocked: boolean;
  unlockDevice: (code: string) => boolean;
  lockDevice: () => void;

  /* Navegação interna (pilha) */
  stack: Screen[];
  current: Screen | null;
  open: (screen: Screen) => void;
  back: () => void;
  goHome: () => void;
  /** Substitui a tela atual (navegação lateral dentro do mesmo app). */
  replace: (screen: Screen) => void;

  /* Conteúdo protegido */
  isUnlocked: (key: string) => boolean;
  tryUnlock: (key: string, code: string, expected: string) => boolean;

  /* Evidências */
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
  const [deviceUnlocked, setDeviceUnlocked] = useState(false);
  const [stack, setStack] = useState<Screen[]>([]);
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  /* Progresso é conveniência local; nunca é obrigatório para jogar. */
  useEffect(() => {
    const persisted = readPersisted(caseData.slug);
    setEvidence(persisted.evidence);
    setUnlocked(persisted.unlocked);
  }, [caseData.slug]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        storageKey(caseData.slug),
        JSON.stringify({ evidence, unlocked } satisfies PersistedState),
      );
    } catch {
      /* modo privado / storage indisponível — o app continua funcionando */
    }
  }, [caseData.slug, evidence, unlocked]);

  const open = useCallback((screen: Screen) => {
    setStack((prev) => [...prev, screen]);
  }, []);

  const back = useCallback(() => {
    setStack((prev) => prev.slice(0, -1));
  }, []);

  const goHome = useCallback(() => setStack([]), []);

  const replace = useCallback((screen: Screen) => {
    setStack((prev) => (prev.length === 0 ? [screen] : [...prev.slice(0, -1), screen]));
  }, []);

  const unlockDevice = useCallback(
    (code: string) => {
      if (code === caseData.device.passcode) {
        setDeviceUnlocked(true);
        return true;
      }
      return false;
    },
    [caseData.device.passcode],
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

  const isEvidence = useCallback(
    (id: string) => evidence.some((item) => item.id === id),
    [evidence],
  );

  const toggleEvidence = useCallback((item: EvidenceItem) => {
    setEvidence((prev) =>
      prev.some((existing) => existing.id === item.id)
        ? prev.filter((existing) => existing.id !== item.id)
        : [...prev, item],
    );
  }, []);

  const removeEvidence = useCallback((id: string) => {
    setEvidence((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearEvidence = useCallback(() => setEvidence([]), []);

  const value = useMemo<DeviceContextValue>(
    () => ({
      caseData,
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
      tryUnlock,
      evidence,
      isEvidence,
      toggleEvidence,
      removeEvidence,
      clearEvidence,
    }),
    [
      caseData,
      deviceUnlocked,
      unlockDevice,
      lockDevice,
      stack,
      open,
      back,
      goHome,
      replace,
      isUnlocked,
      tryUnlock,
      evidence,
      isEvidence,
      toggleEvidence,
      removeEvidence,
      clearEvidence,
    ],
  );

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceContextValue {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    throw new Error("useDevice precisa estar dentro de <DeviceProvider>.");
  }
  return ctx;
}
