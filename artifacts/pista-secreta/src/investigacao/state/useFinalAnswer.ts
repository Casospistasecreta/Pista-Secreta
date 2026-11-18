import { useCallback, useEffect, useState } from "react";
import type { FinalAnswerConfig } from "../types";
import type { ResolvedLocalized } from "@/i18n/types";
import { encodeAnswer, isCorrect, parseAnswer } from "./evaluateAnswers";

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
 *
 * Sem `config.scoring` (casos anteriores): `submit` só libera o relatório se tudo estiver certo.
 * Com `config.scoring`: `submit` sempre gera o resultado e `retry` permite refazer.
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

  /** Marca/desmarca uma alternativa de pergunta de seleção múltipla. */
  const toggleAnswer = useCallback((questionId: string, optionId: string) => {
    setState((prev) => {
      const current = parseAnswer(prev.answers[questionId]);
      const next = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
      return { ...prev, answers: { ...prev.answers, [questionId]: encodeAnswer(next) } };
    });
  }, []);

  const submit = useCallback(
    (config: ResolvedLocalized<FinalAnswerConfig>) => {
      if (config.scoring) {
        setState((prev) => ({ ...prev, solved: true }));
        return true;
      }
      const allCorrect = config.questions.every((q) => isCorrect(q, state.answers[q.id]));
      if (allCorrect) setState((prev) => ({ ...prev, solved: true }));
      return allCorrect;
    },
    [state.answers],
  );

  /** Volta ao formulário mantendo as respostas já marcadas (modo com pontuação). */
  const retry = useCallback(() => {
    setState((prev) => ({ ...prev, solved: false }));
  }, []);

  return { answers: state.answers, solved: state.solved, setAnswer, toggleAnswer, submit, retry };
}
