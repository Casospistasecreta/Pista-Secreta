import { ChevronRight, FolderSearch, Trash2 } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell } from "../components/AppShell";
import { getApp } from "./registry";

const ACCENT = "#c7a2ff";

export function CaseFileApp() {
  const { caseData, evidence, removeEvidence, clearEvidence, open, goHome } = useDevice();

  return (
    <AppShell
      accent={ACCENT}
      title={<span className="inv-display text-[19px]">Meu caso</span>}
      subtitle={caseData.title}
      right={
        evidence.length > 0 ? (
          <button
            type="button"
            onClick={clearEvidence}
            className="inv-press inv-mono text-[10px] uppercase tracking-[0.16em] text-[var(--inv-dim-2)]"
          >
            Limpar
          </button>
        ) : undefined
      }
      headerBackground="linear-gradient(180deg, rgba(75,42,138,0.25), transparent)"
    >
      <div className="flex items-baseline justify-between pt-2">
        <p className="inv-mono text-[10px] uppercase tracking-[0.22em] text-[var(--inv-dim-2)]">
          Evidências encontradas
        </p>
        <p className="inv-display text-[26px] leading-none" style={{ color: ACCENT }}>
          {evidence.length}
        </p>
      </div>

      {evidence.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
          <FolderSearch size={26} className="text-[var(--inv-dim-2)]" />
          <p className="text-[14px] text-[var(--inv-dim)]">
            Nada marcado ainda. Ao encontrar algo relevante em qualquer aplicativo, toque em
            “marcar como evidência”.
          </p>
          <button
            type="button"
            onClick={goHome}
            className="inv-press inv-mono mt-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em]"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            Voltar ao dispositivo
          </button>
        </div>
      ) : (
        <ul className="flex flex-col pt-4">
          {evidence.map((item) => {
            const app = getApp(item.appId);
            const Icon = app?.icon ?? FolderSearch;
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 border-b border-[var(--inv-line)] py-3.5 last:border-b-0"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
                  style={{ borderColor: "var(--inv-line-strong)", color: app?.accent ?? ACCENT }}
                >
                  <Icon size={15} />
                </span>
                <button
                  type="button"
                  onClick={() => item.target && open(item.target)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-[14px]">{item.title}</p>
                  {item.subtitle && (
                    <p className="inv-mono truncate text-[10px] uppercase tracking-[0.12em] text-[var(--inv-dim-2)]">
                      {item.subtitle}
                    </p>
                  )}
                </button>
                {item.target && <ChevronRight size={15} className="text-[var(--inv-dim-2)]" />}
                <button
                  type="button"
                  onClick={() => removeEvidence(item.id)}
                  className="inv-press p-1 text-[var(--inv-dim-2)]"
                  aria-label={`Remover ${item.title}`}
                >
                  <Trash2 size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}
