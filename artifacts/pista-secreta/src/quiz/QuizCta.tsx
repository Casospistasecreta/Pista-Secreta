import { Search } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function QuizCta({ onOpen }: { onOpen: () => void }) {
  const t = useT();

  return (
    <section
      aria-labelledby="quiz-cta-title"
      data-testid="quiz-cta"
      className="quiz-polish-cta relative mb-12 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-secondary/25 via-white/5 to-transparent p-6 text-center shadow-[0_16px_40px_-14px_rgba(0,0,0,0.6)] md:p-8"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary/20 blur-[80px]"
        aria-hidden="true"
      />
      <span className="mb-3 inline-flex h-9 w-9 -rotate-3 items-center justify-center rounded border border-primary/30 bg-white/5 text-primary/80">
        <Search className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        {t("quiz.cta.eyebrow")}
      </div>
      <h2 id="quiz-cta-title" className="mb-3 font-serif text-2xl font-bold uppercase tracking-wide md:text-3xl">
        {t("quiz.cta.title")}
      </h2>
      <p className="mx-auto mb-5 max-w-md text-base leading-relaxed text-primary/80">
        {t("quiz.cta.description")}
      </p>
      <button
        type="button"
        data-testid="button-open-quiz"
        onClick={onOpen}
        className="min-h-11 rounded bg-primary/90 px-8 py-4 font-serif text-base font-bold uppercase tracking-wide text-background shadow-[0_0_24px_rgba(255,250,205,0.2)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-primary hover:shadow-[0_0_42px_rgba(255,250,205,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:text-lg"
      >
        {t("quiz.cta.button")}
      </button>
    </section>
  );
}
