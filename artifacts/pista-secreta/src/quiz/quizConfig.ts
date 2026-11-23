import type { TranslationKey } from "@/i18n/LanguageProvider";

export type QuizTranslationKey = Extract<TranslationKey, `quiz.${string}`>;

export interface QuizCase {
  /** Stable IDs shared with scoring and quiz analytics. */
  id: string;
  nameKey: QuizTranslationKey;
  descriptionKey: QuizTranslationKey;
  pitchKey: QuizTranslationKey;
  durationKey: QuizTranslationKey;
  playersKey: QuizTranslationKey;
  formatKey: QuizTranslationKey;
  difficultyKey: QuizTranslationKey;
  /** Landing card anchor. */
  cardId: string;
  /** Used only if the landing card is unavailable on the current page. */
  checkoutUrl: string;
}

export const CASES = [
  {
    id: "wendel-jr",
    nameKey: "quiz.case.wendel.name",
    descriptionKey: "quiz.case.wendel.description",
    pitchKey: "quiz.case.wendel.pitch",
    durationKey: "quiz.case.wendel.duration",
    playersKey: "quiz.case.wendel.players",
    formatKey: "quiz.case.wendel.format",
    difficultyKey: "quiz.case.wendel.difficulty",
    cardId: "caso-wendel-jr",
    checkoutUrl: "https://pay.kiwify.com.br/LfosEmV",
  },
  {
    id: "universitario",
    nameKey: "quiz.case.universitario.name",
    descriptionKey: "quiz.case.universitario.description",
    pitchKey: "quiz.case.universitario.pitch",
    durationKey: "quiz.case.universitario.duration",
    playersKey: "quiz.case.universitario.players",
    formatKey: "quiz.case.universitario.format",
    difficultyKey: "quiz.case.universitario.difficulty",
    cardId: "caso-universitario",
    checkoutUrl: "https://pay.kiwify.com.br/ZG3gabG",
  },
  {
    id: "dona-odete",
    nameKey: "quiz.case.odete.name",
    descriptionKey: "quiz.case.odete.description",
    pitchKey: "quiz.case.odete.pitch",
    durationKey: "quiz.case.odete.duration",
    playersKey: "quiz.case.odete.players",
    formatKey: "quiz.case.odete.format",
    difficultyKey: "quiz.case.odete.difficulty",
    cardId: "caso-dona-odete",
    checkoutUrl: "https://pay.kiwify.com.br/Pyk6u44",
  },
  {
    id: "rasputin",
    nameKey: "quiz.case.rasputin.name",
    descriptionKey: "quiz.case.rasputin.description",
    pitchKey: "quiz.case.rasputin.pitch",
    durationKey: "quiz.case.rasputin.duration",
    playersKey: "quiz.case.rasputin.players",
    formatKey: "quiz.case.rasputin.format",
    difficultyKey: "quiz.case.rasputin.difficulty",
    cardId: "caso-rasputin",
    checkoutUrl: "https://pay.kiwify.com.br/77piF2p",
  },
  {
    id: "peao-envenenado",
    nameKey: "quiz.case.peao.name",
    descriptionKey: "quiz.case.peao.description",
    pitchKey: "quiz.case.peao.pitch",
    durationKey: "quiz.case.peao.duration",
    playersKey: "quiz.case.peao.players",
    formatKey: "quiz.case.peao.format",
    difficultyKey: "quiz.case.peao.difficulty",
    cardId: "caso-peao-envenenado",
    checkoutUrl: "https://pay.kiwify.com.br/AyH97og",
  },
  {
    id: "justin-nobaind",
    nameKey: "quiz.case.justin.name",
    descriptionKey: "quiz.case.justin.description",
    pitchKey: "quiz.case.justin.pitch",
    durationKey: "quiz.case.justin.duration",
    playersKey: "quiz.case.justin.players",
    formatKey: "quiz.case.justin.format",
    difficultyKey: "quiz.case.justin.difficulty",
    cardId: "caso-justin-nobaind",
    checkoutUrl: "https://pay.kiwify.com.br/hOaX7ly",
  },
] as const satisfies readonly QuizCase[];

export type QuizCaseId = (typeof CASES)[number]["id"];

export interface QuizOption {
  id: string;
  labelKey: QuizTranslationKey;
  shortKey: QuizTranslationKey;
  scores: Partial<Record<QuizCaseId, number>>;
}

export interface QuizQuestion {
  key: string;
  weight: number;
  titleKey: QuizTranslationKey;
  helperKey: QuizTranslationKey;
  options: readonly QuizOption[];
}

const W = "wendel-jr";
const U = "universitario";
const D = "dona-odete";
const R = "rasputin";
const P = "peao-envenenado";
const J = "justin-nobaind";

export const QUESTIONS: readonly QuizQuestion[] = [
  {
    key: "mystery",
    weight: 0.3,
    titleKey: "quiz.question.mystery.title",
    helperKey: "quiz.question.mystery.helper",
    options: [
      { id: "A", labelKey: "quiz.answer.mystery.A", shortKey: "quiz.short.mystery.A", scores: { [W]: 1, [J]: 0.75, [U]: 0.25 } },
      { id: "B", labelKey: "quiz.answer.mystery.B", shortKey: "quiz.short.mystery.B", scores: { [U]: 1, [W]: 0.5, [J]: 0.25, [P]: 0.25, [R]: 0.25 } },
      { id: "C", labelKey: "quiz.answer.mystery.C", shortKey: "quiz.short.mystery.C", scores: { [D]: 1, [J]: 0.5, [R]: 0.25 } },
      { id: "D", labelKey: "quiz.answer.mystery.D", shortKey: "quiz.short.mystery.D", scores: { [R]: 1 } },
      { id: "E", labelKey: "quiz.answer.mystery.E", shortKey: "quiz.short.mystery.E", scores: { [P]: 1 } },
      { id: "F", labelKey: "quiz.answer.mystery.F", shortKey: "quiz.short.mystery.F", scores: { [J]: 1, [W]: 0.5 } },
    ],
  },
  {
    key: "atmosphere",
    weight: 0.2,
    titleKey: "quiz.question.atmosphere.title",
    helperKey: "quiz.question.atmosphere.helper",
    options: [
      { id: "A", labelKey: "quiz.answer.atmosphere.A", shortKey: "quiz.short.atmosphere.A", scores: { [W]: 1, [J]: 0.75, [U]: 0.25 } },
      { id: "B", labelKey: "quiz.answer.atmosphere.B", shortKey: "quiz.short.atmosphere.B", scores: { [U]: 1, [W]: 0.25 } },
      { id: "C", labelKey: "quiz.answer.atmosphere.C", shortKey: "quiz.short.atmosphere.C", scores: { [D]: 1 } },
      { id: "D", labelKey: "quiz.answer.atmosphere.D", shortKey: "quiz.short.atmosphere.D", scores: { [R]: 1 } },
      { id: "E", labelKey: "quiz.answer.atmosphere.E", shortKey: "quiz.short.atmosphere.E", scores: { [P]: 1 } },
      { id: "F", labelKey: "quiz.answer.atmosphere.F", shortKey: "quiz.short.atmosphere.F", scores: { [J]: 1, [W]: 0.25 } },
    ],
  },
  {
    key: "clues",
    weight: 0.15,
    titleKey: "quiz.question.clues.title",
    helperKey: "quiz.question.clues.helper",
    options: [
      { id: "A", labelKey: "quiz.answer.clues.A", shortKey: "quiz.short.clues.A", scores: { [W]: 0.75, [U]: 0.75 } },
      { id: "B", labelKey: "quiz.answer.clues.B", shortKey: "quiz.short.clues.B", scores: { [D]: 0.75, [R]: 0.75, [P]: 0.75, [J]: 0.75 } },
      { id: "C", labelKey: "quiz.answer.clues.C", shortKey: "quiz.short.clues.C", scores: { [W]: 0.5, [U]: 0.5, [D]: 0.5, [R]: 0.75, [P]: 0.5, [J]: 0.5 } },
      { id: "D", labelKey: "quiz.answer.clues.D", shortKey: "quiz.short.clues.D", scores: {} },
    ],
  },
  {
    key: "experience",
    weight: 0.15,
    titleKey: "quiz.question.experience.title",
    helperKey: "quiz.question.experience.helper",
    options: [
      { id: "A", labelKey: "quiz.answer.experience.A", shortKey: "quiz.short.experience.A", scores: { [W]: 0.75, [U]: 0.75 } },
      { id: "B", labelKey: "quiz.answer.experience.B", shortKey: "quiz.short.experience.B", scores: { [D]: 0.75, [R]: 0.75, [P]: 0.75, [J]: 0.75 } },
      { id: "C", labelKey: "quiz.answer.experience.C", shortKey: "quiz.short.experience.C", scores: { [W]: 0.5, [U]: 0.5, [D]: 0.5, [R]: 0.75, [P]: 0.5, [J]: 0.5 } },
      { id: "D", labelKey: "quiz.answer.experience.D", shortKey: "quiz.short.experience.D", scores: { [U]: 1, [W]: 0.75, [D]: 0.75, [P]: 0.75, [J]: 0.75, [R]: 0.5 } },
    ],
  },
  {
    key: "motivation",
    weight: 0.15,
    titleKey: "quiz.question.motivation.title",
    helperKey: "quiz.question.motivation.helper",
    options: [
      { id: "A", labelKey: "quiz.answer.motivation.A", shortKey: "quiz.short.motivation.A", scores: { [W]: 0.75, [U]: 0.75, [D]: 0.75 } },
      { id: "B", labelKey: "quiz.answer.motivation.B", shortKey: "quiz.short.motivation.B", scores: { [U]: 1, [W]: 0.75, [D]: 0.5, [J]: 0.5 } },
      { id: "C", labelKey: "quiz.answer.motivation.C", shortKey: "quiz.short.motivation.C", scores: { [R]: 1 } },
      { id: "D", labelKey: "quiz.answer.motivation.D", shortKey: "quiz.short.motivation.D", scores: { [J]: 1, [D]: 0.75 } },
      { id: "E", labelKey: "quiz.answer.motivation.E", shortKey: "quiz.short.motivation.E", scores: { [P]: 1 } },
      { id: "F", labelKey: "quiz.answer.motivation.F", shortKey: "quiz.short.motivation.F", scores: { [W]: 1, [J]: 1 } },
    ],
  },
  {
    key: "difficulty",
    weight: 0.05,
    titleKey: "quiz.question.difficulty.title",
    helperKey: "quiz.question.difficulty.helper",
    options: [
      { id: "A", labelKey: "quiz.answer.difficulty.A", shortKey: "quiz.short.difficulty.A", scores: { [P]: 1, [W]: 0.5, [U]: 0.5, [D]: 0.5, [J]: 0.5, [R]: 0.25 } },
      { id: "B", labelKey: "quiz.answer.difficulty.B", shortKey: "quiz.short.difficulty.B", scores: { [W]: 1, [U]: 1, [D]: 1, [J]: 1, [P]: 0.5, [R]: 0.5 } },
      { id: "C", labelKey: "quiz.answer.difficulty.C", shortKey: "quiz.short.difficulty.C", scores: { [R]: 1, [W]: 0.5, [U]: 0.5, [D]: 0.5, [J]: 0.5, [P]: 0.25 } },
    ],
  },
];

/** Tie-break order: question 1, 2, 3, then 5; final tie uses CASES order. */
export const TIEBREAK_QUESTION_INDEXES = [0, 1, 2, 4] as const;

export const QUIZ_POPUP_DELAY_MS = 7000;
export const QUIZ_SEEN_KEY = "ps_quiz_seen";
