type QuizSource = "popup" | "cta";

export const quizTrack = {
  popupImpression: () => undefined,
  openCta: () => undefined,
  start: (_source: QuizSource) => undefined,
  questionAnswered: (_questionNumber: number, _selected: string) => undefined,
  complete: (_source: QuizSource, _primary: string, _secondary: string) => undefined,
  resultView: (_primary: string, _secondary: string) => undefined,
  primaryClick: (_primary: string, _secondary: string) => undefined,
  secondaryClick: (_primary: string, _secondary: string) => undefined,
  restart: () => undefined,
};

export type { QuizSource };
