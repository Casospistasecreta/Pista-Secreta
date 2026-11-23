import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Clock, Gauge, RotateCcw, Smartphone, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useT } from "@/i18n/LanguageProvider";
import { CASES, QUESTIONS, type QuizCase } from "./quizConfig";
import { QUIZ_CASE_IMAGES } from "./quizImages";
import { computeResult, type QuizAnswers, type QuizResult } from "./scoring";
import { quizTrack, type QuizSource } from "./quizAnalytics";
import "./quiz.css";

type Step = "intro" | "result" | number;

interface Props {
  open: boolean;
  source: QuizSource;
  onOpenChange: (open: boolean) => void;
}

const primaryButton =
  "block min-h-11 w-full rounded bg-primary/90 px-4 py-4 text-center font-serif text-base font-bold uppercase tracking-wide text-background shadow-[0_0_24px_rgba(255,250,205,0.22)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-primary hover:shadow-[0_0_38px_rgba(255,250,205,0.36)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg";
const ghostButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded px-3 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70";

function goToCase(quizCase: QuizCase) {
  const card = document.getElementById(quizCase.cardId);
  if (!card) {
    window.open(quizCase.checkoutUrl, "_blank", "noopener,noreferrer");
    return;
  }

  window.setTimeout(() => {
    const target = document.getElementById(quizCase.cardId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("quiz-highlight");
    window.setTimeout(() => target.classList.remove("quiz-highlight"), 3000);
  }, 320);
}

function scrollToCases() {
  window.setTimeout(() => {
    document.getElementById(CASES[0].cardId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 320);
}

function Cover({ quizCase, className, alt }: { quizCase: QuizCase; className: string; alt: string }) {
  const image = QUIZ_CASE_IMAGES[quizCase.id];
  return image ? (
    <img src={image} alt={alt} loading="lazy" className={`${className} object-cover`} />
  ) : (
    <div className={`${className} bg-white/5`} aria-hidden="true" />
  );
}

function Meta({ quizCase, t }: { quizCase: QuizCase; t: ReturnType<typeof useT> }) {
  const items = [
    { Icon: Clock, label: t("quiz.meta.duration"), value: t(quizCase.durationKey) },
    { Icon: Users, label: t("quiz.meta.players"), value: t(quizCase.playersKey) },
    { Icon: Smartphone, label: t("quiz.meta.format"), value: t(quizCase.formatKey) },
    { Icon: Gauge, label: t("quiz.meta.difficulty"), value: t(quizCase.difficultyKey) },
  ];

  return (
    <dl className="grid grid-cols-2 gap-2">
      {items.map(({ Icon, label, value }) => (
        <div
          key={label}
          className="flex min-w-0 items-center gap-2 rounded border border-primary/10 bg-white/5 px-2.5 py-2"
        >
          <Icon className="h-3.5 w-3.5 shrink-0 text-primary/70" strokeWidth={1.75} aria-hidden="true" />
          <div className="min-w-0">
            <dt className="font-mono text-[8px] uppercase tracking-widest text-muted/70">{label}</dt>
            <dd className="break-words text-xs font-medium leading-tight text-primary/90">{value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export function QuizModal({ open, source, onOpenChange }: Props) {
  const t = useT();
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<QuizAnswers>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const lockRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (open) {
      setStep("intro");
      setAnswers([]);
      setResult(null);
      lockRef.current = false;
    }
    return () => window.clearTimeout(advanceTimer.current);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  const total = QUESTIONS.length;
  const answeredCount = answers.filter(Boolean).length;
  const progress =
    step === "result"
      ? 100
      : step === "intro"
        ? 0
        : ((step as number) / total) * 100 + (answers[step as number] ? 100 / total : 0);

  const start = () => {
    quizTrack.start(source);
    setStep(0);
  };

  const choose = (questionIndex: number, optionId: string) => {
    if (lockRef.current) return;
    lockRef.current = true;
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = optionId;
    setAnswers(nextAnswers);
    quizTrack.questionAnswered(questionIndex + 1, `${questionIndex + 1}${optionId}`);

    advanceTimer.current = window.setTimeout(() => {
      if (questionIndex < total - 1) {
        setStep(questionIndex + 1);
      } else {
        const nextResult = computeResult(nextAnswers);
        setResult(nextResult);
        setStep("result");
        quizTrack.complete(source, nextResult.primary.quizCase.id, nextResult.secondary.quizCase.id);
        quizTrack.resultView(nextResult.primary.quizCase.id, nextResult.secondary.quizCase.id);
      }
      lockRef.current = false;
    }, 260);
  };

  const back = () => {
    if (lockRef.current) return;
    setStep(step === 0 ? "intro" : (step as number) - 1);
  };

  const restart = () => {
    quizTrack.restart();
    setAnswers([]);
    setResult(null);
    setStep(0);
  };

  const openCase = (kind: "primary" | "secondary") => {
    if (!result) return;
    const primaryId = result.primary.quizCase.id;
    const secondaryId = result.secondary.quizCase.id;
    if (kind === "primary") quizTrack.primaryClick(primaryId, secondaryId);
    else quizTrack.secondaryClick(primaryId, secondaryId);
    onOpenChange(false);
    goToCase(kind === "primary" ? result.primary.quizCase : result.secondary.quizCase);
  };

  const inQuestion = typeof step === "number";
  const question = inQuestion ? QUESTIONS[step as number] : null;
  const primary = result?.primary.quizCase;
  const secondary = result?.secondary.quizCase;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="quiz-dialog max-w-lg gap-0 overflow-hidden border-primary/25 p-0 sm:rounded-xl"
        data-testid="dialog-case-quiz"
      >
        <div
          ref={scrollRef}
          className="quiz-scan max-h-[calc(100dvh-2rem)] overflow-y-auto px-5 pb-6 pt-16 sm:px-7 sm:pt-7"
          data-testid="quiz-content"
        >
          <DialogTitle className="sr-only">{t("quiz.dialog.title")}</DialogTitle>
          <DialogDescription className="sr-only">{t("quiz.dialog.description")}</DialogDescription>

          <div className="mb-5 pr-12 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            {t("quiz.brand")}
          </div>

          {step !== "intro" && (
            <div className="mb-6" aria-hidden="true">
              <div className="h-1.5 overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_12px_hsl(var(--secondary)/0.8)] transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {step === "intro" && (
            <div key="intro" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <span className="mb-4 inline-block -rotate-2 rounded border border-primary/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary/60">
                {t("quiz.intro.badge")}
              </span>
              <h2 className="mb-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                {t("quiz.intro.title")}
              </h2>
              <p className="mb-5 text-base leading-relaxed text-primary/80">{t("quiz.intro.description")}</p>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-muted">
                {t("quiz.intro.time", { count: total })}
              </p>
              <button
                type="button"
                data-testid="button-start-quiz"
                onClick={start}
                className={primaryButton}
              >
                {t("quiz.action.start")}
              </button>
            </div>
          )}

          {question && (
            <div key={`question-${step}`} className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60" aria-live="polite">
                {t("quiz.progress.question", { current: (step as number) + 1, total })}
              </div>
              <h2 className="mb-1.5 font-serif text-2xl font-bold leading-snug sm:text-[1.7rem]">
                {t(question.titleKey)}
              </h2>
              <p className="mb-5 text-sm text-muted">{t(question.helperKey)}</p>

              <div role="group" aria-label={t(question.titleKey)} className="flex flex-col gap-2.5">
                {question.options.map((option) => {
                  const selected = answers[step as number] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      data-testid={`quiz-option-${question.key}-${option.id}`}
                      aria-pressed={selected}
                      onClick={() => choose(step as number, option.id)}
                      className={`group flex min-h-14 w-full items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 active:scale-[0.985] ${
                        selected
                          ? "border-primary/80 bg-secondary/30 shadow-[0_0_20px_hsl(var(--secondary)/0.55)]"
                          : "border-primary/15 bg-white/5 hover:border-primary/40 hover:bg-white/[0.09]"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 -rotate-2 items-center justify-center rounded border font-mono text-xs font-bold transition-colors ${
                          selected ? "border-primary bg-primary text-background" : "border-primary/30 text-primary/70"
                        }`}
                        aria-hidden="true"
                      >
                        {option.id}
                      </span>
                      <span className="text-[15px] leading-snug text-primary/95">{t(option.labelKey)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  data-testid="button-quiz-back"
                  onClick={back}
                  className={ghostButton}
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("quiz.action.back")}
                </button>
                <span className="font-mono text-[10px] tracking-widest text-muted/70">
                  {t("quiz.progress.answered", { answered: answeredCount, total })}
                </span>
              </div>
            </div>
          )}

          {step === "result" && result && primary && secondary && (
            <div key="result" className="animate-in fade-in zoom-in-95 duration-500" data-testid="quiz-result">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/60">
                {t("quiz.result.eyebrow")}
              </div>
              <h2 className="mb-1 font-serif text-3xl font-bold leading-tight">{t("quiz.result.title")}</h2>
              <p className="mb-5 text-sm text-muted">{t("quiz.result.description")}</p>

              <article className="relative mb-5 overflow-hidden rounded-xl border border-primary/30 bg-white/[0.06] shadow-[0_0_34px_hsl(var(--secondary)/0.35)]">
                <div className="absolute left-0 right-0 top-0 z-10 h-[2px] card-gradient-top" />
                <div className="relative">
                  <Cover
                    quizCase={primary}
                    alt={t("quiz.coverAlt", { name: t(primary.nameKey) })}
                    className="h-44 w-full sm:h-52"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <span className="absolute left-3 top-3 -rotate-2 rounded border border-primary/50 bg-background/80 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
                    {t("quiz.result.primary")}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="mb-2 font-serif text-2xl font-bold">{t(primary.nameKey)}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-primary/80">{t(primary.descriptionKey)}</p>
                  <p className="mb-3 border-l-2 border-secondary pl-3 text-sm italic leading-relaxed text-primary/90">
                    {t(primary.pitchKey)}
                  </p>
                  {result.primary.reasons.length > 0 && (
                    <div className="mb-4">
                      <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-muted/80">
                        {t("quiz.result.reasons")}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {result.primary.reasons.map((reason, index) => (
                          <span
                            key={`${reason}-${index}`}
                            className="rounded-full border border-primary/20 bg-white/5 px-2.5 py-1 text-[11px] text-primary/85"
                          >
                            {t(reason)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mb-4">
                    <Meta quizCase={primary} t={t} />
                  </div>
                  <button
                    type="button"
                    data-testid="button-quiz-primary-case"
                    onClick={() => openCase("primary")}
                    className={primaryButton}
                  >
                    {t("quiz.action.primary")}
                  </button>
                </div>
              </article>

              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {t("quiz.result.secondary")}
              </div>
              <article className="mb-5 mt-2 flex min-w-0 gap-3 rounded-lg border border-primary/15 bg-white/5 p-3">
                <Cover
                  quizCase={secondary}
                  alt={t("quiz.coverAlt", { name: t(secondary.nameKey) })}
                  className="h-24 w-20 shrink-0 rounded border border-primary/10 sm:h-28 sm:w-24"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-lg font-bold leading-tight">{t(secondary.nameKey)}</h4>
                  <p className="mb-1.5 mt-1 line-clamp-3 text-xs leading-snug text-muted">
                    {t(secondary.descriptionKey)}
                  </p>
                  <p className="mb-2 break-words font-mono text-[9px] uppercase leading-relaxed tracking-wider text-primary/60">
                    {t(secondary.durationKey)} · {t(secondary.playersKey)} · {t(secondary.formatKey)} ·{" "}
                    {t(secondary.difficultyKey)}
                  </p>
                  <button
                    type="button"
                    data-testid="button-quiz-secondary-case"
                    onClick={() => openCase("secondary")}
                    className="min-h-11 rounded border border-primary/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
                  >
                    {t("quiz.action.secondary")}
                  </button>
                </div>
              </article>

              <div className="flex flex-wrap items-center justify-between gap-1 border-t border-primary/10 pt-3">
                <button
                  type="button"
                  data-testid="button-quiz-restart"
                  onClick={restart}
                  className={ghostButton}
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("quiz.action.restart")}
                </button>
                <button
                  type="button"
                  data-testid="button-quiz-all-cases"
                  onClick={() => {
                    onOpenChange(false);
                    scrollToCases();
                  }}
                  className={ghostButton}
                >
                  {t("quiz.action.allCases")}
                </button>
                <button
                  type="button"
                  data-testid="button-quiz-back-to-site"
                  onClick={() => onOpenChange(false)}
                  className={ghostButton}
                >
                  {t("quiz.action.backToSite")}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
