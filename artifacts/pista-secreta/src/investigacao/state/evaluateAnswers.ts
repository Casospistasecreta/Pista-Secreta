import type { FinalAnswerConfig, FinalQuestion, FinalReport } from "../types";
import type { ResolvedLocalized } from "@/i18n/types";

/** Respostas de seleção múltipla são guardadas como ids ordenados e separados por vírgula. */
export const parseAnswer = (value?: string): string[] => (value ? value.split(",").filter(Boolean) : []);
export const encodeAnswer = (ids: string[]): string => [...ids].sort().join(",");

export function isCorrect(question: FinalQuestion, value?: string): boolean {
  if (question.type === "multiple") {
    const given = parseAnswer(value).sort();
    const wanted = [...(question.correctOptionIds ?? [])].sort();
    return given.length === wanted.length && given.every((id, i) => id === wanted[i]);
  }
  return value !== undefined && value === question.correctOptionId;
}

export interface QuestionResult {
  question: ResolvedLocalized<FinalQuestion>;
  answered: boolean;
  correct: boolean;
  points: number;
  feedback?: string;
}

export interface Evaluation {
  total: number;
  max: number;
  results: QuestionResult[];
  tier?: { id: string; label: string; minPoints: number; report: ResolvedLocalized<FinalReport> };
}

/** Avaliação do modo com pontuação (`config.scoring`). Função pura, sem efeitos colaterais. */
export function evaluate(config: ResolvedLocalized<FinalAnswerConfig>, answers: Record<string, string>): Evaluation {
  const results: QuestionResult[] = config.questions.map((question) => {
    const value = answers[question.id];
    const answered = question.type === "multiple" ? parseAnswer(value).length > 0 : Boolean(value);
    const correct = answered && isCorrect(question, value);
    const fb = question.feedback;
    const feedback = correct ? fb?.correct : answered ? (question.type === "multiple" ? fb?.wrong : (fb?.wrongByOption?.[value] ?? fb?.wrong)) : undefined;
    return { question, answered, correct, points: correct ? (question.points ?? 0) : 0, feedback };
  });
  const total = results.reduce((sum, r) => sum + r.points, 0);
  const max = config.questions.reduce((sum, q) => sum + (q.points ?? 0), 0);
  const tier = [...(config.scoring?.tiers ?? [])].sort((a, b) => b.minPoints - a.minPoints).find((t) => total >= t.minPoints);
  return { total, max, results, tier };
}
