type Params = Record<string, string | number | undefined>;
type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function deviceType() {
  if (typeof window === "undefined") return "desktop";
  return typeof window.matchMedia === "function" && window.matchMedia("(max-width: 767px)").matches
    ? "mobile"
    : "desktop";
}

function send(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const payload: Record<string, string | number> = { device_type: deviceType() };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }

  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.gtag?.("event", name, payload);
  analyticsWindow.fbq?.("trackCustom", name, payload);
}

export type QuizSource = "popup" | "cta";

export const quizTrack = {
  popupImpression: () => send("quiz_popup_impression", { source: "popup" }),
  openCta: () => send("quiz_open_cta", { source: "cta" }),
  start: (source: QuizSource) => send("quiz_start", { source }),
  questionAnswered: (questionNumber: number, selected: string) =>
    send("quiz_question_answered", { question_number: questionNumber, selected_option: selected }),
  complete: (source: QuizSource, primary: string, secondary: string) =>
    send("quiz_complete", { source, primary_case_id: primary, secondary_case_id: secondary }),
  resultView: (primary: string, secondary: string) =>
    send("quiz_result_view", { primary_case_id: primary, secondary_case_id: secondary }),
  primaryClick: (primary: string, secondary: string) =>
    send("quiz_primary_case_click", { case_id: primary, primary_case_id: primary, secondary_case_id: secondary }),
  secondaryClick: (primary: string, secondary: string) =>
    send("quiz_secondary_case_click", { case_id: secondary, primary_case_id: primary, secondary_case_id: secondary }),
  restart: () => send("quiz_restart"),
};
