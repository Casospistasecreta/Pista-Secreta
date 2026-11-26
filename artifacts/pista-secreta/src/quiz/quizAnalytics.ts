import { trackEvent } from "@/lib/analytics";

type Params = Record<string, string | number | boolean | undefined>;

function deviceType() {
  if (typeof window === "undefined") return "desktop";
  return typeof window.matchMedia === "function" && window.matchMedia("(max-width: 767px)").matches
    ? "mobile"
    : "desktop";
}

let startedAt: number | null = null;

function send(name: string, params: Params = {}) {
  const payload: Record<string, string | number | boolean> = { device_type: deviceType() };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }
  trackEvent(name, payload);
}

export type QuizSource = "popup" | "cta";

export const quizTrack = {
  view: () => send("quiz_view"),
  popupImpression: () => send("quiz_popup_impression", { source: "popup" }),
  openCta: () => send("quiz_open_cta", { source: "cta" }),
  start: (source: QuizSource) => {
    startedAt = Date.now();
    send("quiz_start", { source });
  },
  questionView: (questionNumber: number) => send("quiz_question_view", { question_number: questionNumber }),
  questionAnswered: (questionNumber: number, optionId: string) => {
    send("quiz_question_answered", {
      question_number: questionNumber,
      selected_option: `${questionNumber}${optionId}`,
      option_id: optionId,
    });
    send("quiz_step_complete", { question_number: questionNumber });
  },
  complete: (source: QuizSource, primary: string, secondary: string) => {
    send("quiz_complete", {
      source,
      primary_case_id: primary,
      secondary_case_id: secondary,
      duration_seconds: startedAt === null ? 0 : Math.round((Date.now() - startedAt) / 1000),
    });
    startedAt = null;
  },
  resultView: (primary: string, secondary: string) =>
    send("quiz_result_view", { primary_case_id: primary, secondary_case_id: secondary }),
  primaryClick: (primary: string, secondary: string) => {
    send("quiz_primary_case_click", { case_id: primary, primary_case_id: primary, secondary_case_id: secondary });
    send("quiz_result_click", { result_position: "primary", case_id: primary });
  },
  secondaryClick: (primary: string, secondary: string) => {
    send("quiz_secondary_case_click", { case_id: secondary, primary_case_id: primary, secondary_case_id: secondary });
    send("quiz_result_click", { result_position: "secondary", case_id: secondary });
  },
  abandon: (questionNumber: number) => {
    if (startedAt === null) return;
    send("quiz_abandon", {
      question_number: questionNumber,
      duration_seconds: startedAt === null ? 0 : Math.round((Date.now() - startedAt) / 1000),
    });
    startedAt = null;
  },
  restart: () => {
    startedAt = Date.now();
    send("quiz_restart");
  },
};
