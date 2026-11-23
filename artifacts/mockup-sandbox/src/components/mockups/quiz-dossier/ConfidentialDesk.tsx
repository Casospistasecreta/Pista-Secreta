import { useState } from "react";
import { QuizModal } from "./_shared/QuizModalCore";
import { CASES } from "./_shared/quizConfig";
import "./_shared/_group.css";

export function ConfidentialDesk() {
  const [open, setOpen] = useState(true);

  return (
    <main className="quiz-preview">
      <div className="quiz-preview__backdrop">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">Pista Secreta</p>
        <h1 className="quiz-preview__title">Investigações que começam com uma pista.</h1>
        <p className="quiz-preview__copy">Prévia isolada do quiz refinado. As compras e os eventos estão desativados aqui.</p>
        <button
          type="button"
          className="mt-6 min-h-11 rounded border border-primary/40 px-5 py-3 font-mono text-xs uppercase tracking-widest"
          onClick={() => setOpen(true)}
        >
          Abrir demonstração
        </button>
      </div>
      <div className="hidden" aria-hidden="true">
        {CASES.map((quizCase) => <div id={quizCase.cardId} key={quizCase.id} />)}
      </div>
      <QuizModal open={open} source="cta" onOpenChange={setOpen} variant="polished" />
    </main>
  );
}
