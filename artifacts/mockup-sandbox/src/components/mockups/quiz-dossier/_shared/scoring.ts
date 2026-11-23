import { CASES, QUESTIONS, TIEBREAK_QUESTION_INDEXES, type QuizCase, type QuizTranslationKey } from "./quizConfig";

/** answers[i] is the selected option ID for question i. */
export type QuizAnswers = Array<string | undefined>;

export interface RankedCase {
  quizCase: QuizCase;
  /** Weighted compatibility score; used only for sorting and never shown as a percentage. */
  total: number;
  perQuestion: number[];
  reasons: QuizTranslationKey[];
  catalogIndex: number;
}

export interface QuizResult {
  ranking: RankedCase[];
  primary: RankedCase;
  secondary: RankedCase;
}

const round = (value: number) => Math.round(value * 1e6) / 1e6;

export function computeResult(answers: QuizAnswers): QuizResult {
  const ranking: RankedCase[] = CASES.map((quizCase, catalogIndex) => {
    const perQuestion = QUESTIONS.map((question, index) => {
      const option = question.options.find((candidate) => candidate.id === answers[index]);
      return round(question.weight * (option?.scores[quizCase.id] ?? 0));
    });

    const reasons = QUESTIONS.map((question, index) => ({
      index,
      contribution: perQuestion[index],
      shortKey: question.options.find((candidate) => candidate.id === answers[index])?.shortKey,
    }))
      .filter((reason): reason is typeof reason & { shortKey: QuizTranslationKey } => reason.contribution > 0 && !!reason.shortKey)
      .sort((left, right) => right.contribution - left.contribution || left.index - right.index)
      .slice(0, 3)
      .map((reason) => reason.shortKey);

    return {
      quizCase,
      perQuestion,
      reasons,
      catalogIndex,
      total: round(perQuestion.reduce((sum, value) => sum + value, 0)),
    };
  });

  ranking.sort((left, right) => {
    if (left.total !== right.total) return right.total - left.total;
    for (const questionIndex of TIEBREAK_QUESTION_INDEXES) {
      if (left.perQuestion[questionIndex] !== right.perQuestion[questionIndex]) {
        return right.perQuestion[questionIndex] - left.perQuestion[questionIndex];
      }
    }
    return left.catalogIndex - right.catalogIndex;
  });

  return { ranking, primary: ranking[0], secondary: ranking[1] };
}
