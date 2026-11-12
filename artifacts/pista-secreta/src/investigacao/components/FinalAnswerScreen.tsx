import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Circle, CircleDot, Square, SquareCheck, XCircle } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { evaluate, parseAnswer } from "../state/evaluateAnswers";
import { useFinalAnswer } from "../state/useFinalAnswer";
import { AppShell } from "./AppShell";

const ACCENT = "#c7a2ff";

/** Resposta final do caso. Só é renderizada quando `caseData.finalAnswer` existe. */
export function FinalAnswerScreen() {
  const { caseData } = useDevice();
  const { answers, solved, setAnswer, toggleAnswer, submit, retry } = useFinalAnswer(caseData.slug);
  const [wrong, setWrong] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  // Ao liberar o relatório, volta ao topo da rolagem (o formulário era longo).
  useEffect(() => { topRef.current?.closest(".inv-scroll")?.scrollTo({ top: 0 }); }, [solved]);
  const config = caseData.finalAnswer;
  if (!config) return null;

  if (solved && config.scoring) {
    const evaluation = evaluate(config, answers);
    const report = evaluation.tier?.report ?? config.report;
    return (
      <AppShell accent={ACCENT} title={<span className="inv-display text-[19px]">{report.title}</span>} subtitle={caseData.title}>
        <div ref={topRef} className="inv-anim-fade pb-8">
          <div className="mt-2 rounded-xl border px-4 py-3" style={{ borderColor: ACCENT, background: `${ACCENT}14` }}>
            <p className="inv-mono text-[10px] uppercase tracking-[.2em]" style={{ color: ACCENT }}>Pontuação</p>
            <p className="inv-display pt-1 text-[26px] leading-none">{evaluation.total}<span className="text-[15px] text-[var(--inv-dim)]"> / {evaluation.max}</span></p>
            {evaluation.tier && <p className="pt-2 text-[13px]">{evaluation.tier.label}</p>}
          </div>
          <ul className="flex flex-col gap-2 pt-5">
            {evaluation.results.map((result, index) => {
              const skipped = !result.answered && !result.correct;
              const Icon = result.correct ? CheckCircle2 : skipped ? Circle : XCircle;
              return (
                <li key={result.question.id} className="flex items-start gap-3 text-[13px] leading-snug">
                  <Icon size={16} className="mt-[2px] shrink-0" style={{ color: result.correct ? ACCENT : skipped ? "var(--inv-dim-2)" : "var(--inv-danger)" }} />
                  <span>
                    <span className="inv-mono text-[10px] uppercase tracking-[.14em] text-[var(--inv-dim-2)]">
                      {result.question.bonus ? "Bônus" : `Pergunta ${index + 1}`}{result.answered ? "" : " · sem resposta"}
                    </span>
                    {result.feedback && <span className="block pt-1 text-[var(--inv-dim)]">{result.feedback}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
          {report.subtitle && <p className="inv-mono pt-6 text-[10px] uppercase tracking-[.16em] text-[var(--inv-dim-2)]">{report.subtitle}</p>}
          {report.paragraphs.map((paragraph, index) => (
            <p key={index} className="pt-4 text-[14px] leading-relaxed">{paragraph}</p>
          ))}
          {report.closing && <p className="pt-6 text-[14px] italic leading-relaxed text-[var(--inv-dim)]">{report.closing}</p>}
          <button type="button" onClick={retry} className="inv-press mt-8 w-full rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: ACCENT, color: ACCENT }}>
            Rever minhas respostas
          </button>
        </div>
      </AppShell>
    );
  }

  if (solved) {
    const { report } = config;
    return (
      <AppShell accent={ACCENT} title={<span className="inv-display text-[19px]">{report.title}</span>} subtitle={caseData.title}>
        <div ref={topRef} className="inv-anim-fade pb-8">
          <div className="mt-2 flex items-center gap-2" style={{ color: ACCENT }}>
            <CheckCircle2 size={18} />
            <p className="inv-mono text-[10px] uppercase tracking-[.2em]">Caso resolvido</p>
          </div>
          {report.subtitle && <p className="inv-mono pt-3 text-[10px] uppercase tracking-[.16em] text-[var(--inv-dim-2)]">{report.subtitle}</p>}
          {report.paragraphs.map((paragraph, index) => (
            <p key={index} className="pt-4 text-[14px] leading-relaxed">{paragraph}</p>
          ))}
          {report.closing && <p className="pt-6 text-[14px] italic leading-relaxed text-[var(--inv-dim)]">{report.closing}</p>}
        </div>
      </AppShell>
    );
  }

  const isMultiple = (q: (typeof config.questions)[number]) => q.type === "multiple";
  const hasAnswer = (q: (typeof config.questions)[number]) => (isMultiple(q) ? parseAnswer(answers[q.id]).length > 0 : Boolean(answers[q.id]));
  const answeredAll = config.questions.every((q) => (config.scoring && q.bonus ? true : hasAnswer(q)));

  return (
    <AppShell accent={ACCENT} title={<span className="inv-display text-[19px]">Resposta final</span>} subtitle={caseData.title}>
      <div ref={topRef} className="pb-8">
        {config.intro && <p className="pt-2 text-[13px] leading-relaxed text-[var(--inv-dim)]">{config.intro}</p>}
        {config.questions.map((question, index) => (
          <fieldset key={question.id} className="pt-6">
            <legend className="inv-mono pb-3 text-[10px] uppercase tracking-[.18em] text-[var(--inv-dim-2)]">
              {question.bonus ? "Bônus · opcional" : `Pergunta ${index + 1} de ${config.questions.filter((q) => !q.bonus || !config.scoring).length}`}
              {config.scoring && question.points ? ` · ${question.points} pts` : ""}
              {isMultiple(question) ? " · marque todas as que se aplicam" : ""}
            </legend>
            <p className="pb-3 text-[15px] leading-snug">{question.prompt}</p>
            <div className="flex flex-col gap-2">
              {question.options.map((option) => {
                const multiple = isMultiple(question);
                const selected = multiple ? parseAnswer(answers[question.id]).includes(option.id) : answers[question.id] === option.id;
                const Icon = multiple ? (selected ? SquareCheck : Square) : selected ? CircleDot : Circle;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role={multiple ? "checkbox" : "radio"}
                    aria-checked={selected}
                    onClick={() => { setWrong(false); if (multiple) toggleAnswer(question.id, option.id); else setAnswer(question.id, option.id); }}
                    className="inv-press flex items-start gap-3 rounded-xl border px-3 py-3 text-left text-[14px] leading-snug"
                    style={{ borderColor: selected ? ACCENT : "var(--inv-line-strong)", background: selected ? `${ACCENT}14` : "transparent" }}
                  >
                    <Icon size={16} className="mt-[2px] shrink-0" style={{ color: selected ? ACCENT : "var(--inv-dim-2)" }} />
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
        {wrong && <p role="alert" className="inv-anim-shake pt-5 text-[13px]" style={{ color: "var(--inv-danger)" }}>Nem todas as respostas estão corretas. Revise suas evidências e tente novamente.</p>}
        <button
          type="button"
          disabled={!answeredAll}
          onClick={() => setWrong(!submit(config))}
          className="inv-press mt-6 w-full rounded-xl px-4 py-3 text-sm font-medium text-[#120b1d] disabled:opacity-40"
          style={{ background: ACCENT }}
        >
          {config.scoring ? "Enviar e ver resultado" : "Enviar resposta"}
        </button>
      </div>
    </AppShell>
  );
}
