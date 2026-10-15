import { useCallback, useEffect, useState } from "react";
import type { FinalAnswerConfig } from "../types";

interface Persisted {
  answers: Record<string, string>;
  solved: boolean;
}

function storageKey(slug: string) {
  return `pista-secreta:investigacao:${slug}:resposta`;
}

function read(slug: string): Persisted {
  const empty: Persisted = { answers: {}, solved: false };
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
      solved: parsed.solved === true,
    };
  } catch {
    return empty;
  }
}

/**
 * Estado da resposta final de um caso. Guardado separadamente do estado do
 * dispositivo (evidências/desbloqueios) para não alterar o contrato existente.
 */
export function useFinalAnswer(slug: string) {
  const [state, setState] = useState<Persisted>({ answers: {}, solved: false });

  useEffect(() => {
    setState(read(slug));
  }, [slug]);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(slug), JSON.stringify(state));
    } catch {
      /* storage indisponível — o app continua funcionando */
    }
  }, [slug, state]);

  const setAnswer = useCallback((questionId: string, optionId: string) => {
    setState((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: optionId } }));
  }, []);

  const submit = useCallback(
    (config: FinalAnswerConfig) => {
      const allCorrect = config.questions.every((q) => state.answers[q.id] === q.correctOptionId);
      if (allCorrect) setState((prev) => ({ ...prev, solved: true }));
      return allCorrect;
    },
    [state.answers],
  );

  return { answers: state.answers, solved: state.solved, setAnswer, submit };
}
