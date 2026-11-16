import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, Lightbulb, RotateCcw, Swords, Trophy } from "lucide-react";
import { useDevice } from "../state/DeviceProvider";
import { AppShell, SectionLabel } from "../components/AppShell";
import { Avatar } from "../components/Media";
import { EvidenceToggle } from "../components/EvidenceToggle";
import { ChessBoard } from "../tabulive/ChessBoard";
import { applyMove, botMove, findKing, getStatus, inCheck, parseFen, toSan, type GameState, type Move } from "../tabulive/engine";
import type { TabuLiveDuel, TabuLivePuzzle } from "../types";

const ACCENT = "#a8e6a1";
const solvedKey = (id: string) => `tabulive:solved:${id}`;

function UnlockBanner({ label }: { label: string }) {
  return (
    <div className="inv-anim-rise mt-4 rounded-2xl border px-4 py-3" style={{ borderColor: ACCENT, background: `${ACCENT}14` }}>
      <p className="inv-mono flex items-center gap-2 text-[10px] uppercase tracking-[.2em]" style={{ color: ACCENT }}><CheckCircle2 size={14} />Resolvido por você</p>
      <p className="pt-1 text-[13px]">O Rei deixou isto pendente. Destravado: <strong>{label}</strong>.</p>
    </div>
  );
}

function PuzzleScreen({ puzzle }: { puzzle: TabuLivePuzzle }) {
  const { isUnlocked, grantUnlock } = useDevice();
  const initial = useMemo(() => parseFen(puzzle.fen), [puzzle.fen]);
  const [state, setState] = useState<GameState>(initial);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [fails, setFails] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const timer = useRef<number | null>(null);
  const solved = isUnlocked(solvedKey(puzzle.id));
  useEffect(() => () => { if (timer.current !== null) window.clearTimeout(timer.current); }, []);

  function onMove(move: Move) {
    const next = applyMove(state, move);
    if (getStatus(next) === "checkmate") {
      setState(next); setFeedback(null);
      grantUnlock(solvedKey(puzzle.id)); grantUnlock(puzzle.unlocks.key);
      return;
    }
    setState(next); setFeedback("Não é xeque-mate. O Rei ainda tem defesa.");
    setFails((n) => n + 1);
    timer.current = window.setTimeout(() => { setState(initial); setFeedback(null); }, 1100);
  }

  const side = initial.turn;
  return (
    <AppShell accent={ACCENT} title={puzzle.title} subtitle={puzzle.subtitle}>
      <p className="pb-3 text-[13px] leading-relaxed text-[var(--inv-dim)]">{puzzle.goal}</p>
      <ChessBoard state={state} orientation={side} playable={solved ? null : side} onMove={onMove} checkSquare={inCheck(state) ? findKing(state.board, state.turn) : null} />
      <p className="inv-mono min-h-[20px] pt-3 text-center text-[11px] uppercase tracking-[.14em]" style={{ color: feedback ? "var(--inv-danger)" : "var(--inv-dim-2)" }} role="status">
        {solved ? "Xeque-mate!" : feedback ?? (side === "w" ? "Brancas jogam" : "Pretas jogam")}
      </p>
      {solved && <UnlockBanner label={puzzle.unlocks.label} />}
      {!solved && (
        <div className="flex flex-col gap-2 pt-3">
          {puzzle.hint && (
            <button type="button" onClick={() => setShowHint((v) => !v)} className="inv-press inv-mono flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[10px] uppercase tracking-[.16em]" style={{ borderColor: "var(--inv-line-strong)", color: "var(--inv-dim)" }}>
              <Lightbulb size={13} />{showHint ? puzzle.hint : "Ver anotação do Rei"}
            </button>
          )}
          {fails >= 3 && (
            <button type="button" onClick={() => setShowSolution((v) => !v)} className="inv-press inv-mono rounded-xl border px-4 py-3 text-[10px] uppercase tracking-[.16em]" style={{ borderColor: "var(--inv-line-strong)", color: "var(--inv-dim)" }}>
              {showSolution ? `Lance: ${puzzle.solution}` : "Mostrar o lance (ainda é você quem joga)"}
            </button>
          )}
        </div>
      )}
      <p className="pt-5 text-[12px] leading-relaxed text-[var(--inv-dim-2)]">Prefere não jogar? O conteúdo trancado também abre com a senha, encontrada em outro lugar do aparelho.</p>
    </AppShell>
  );
}

function DuelScreen({ duel }: { duel: TabuLiveDuel }) {
  const { isUnlocked, grantUnlock } = useDevice();
  const start = useMemo(() => parseFen(duel.fen), [duel.fen]);
  const bot = duel.playerColor === "w" ? "b" : "w";
  const [state, setState] = useState<GameState>(start);
  const [last, setLast] = useState<{ from: number; to: number } | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const solved = isUnlocked(solvedKey(duel.id));
  const status = getStatus(state);
  const over = status !== "ongoing";

  useEffect(() => {
    if (over || state.turn !== bot) return;
    const id = window.setTimeout(() => {
      const move = botMove(state, duel.blunderRate ?? 0.4);
      if (!move) return;
      const san = toSan(state, move, true);
      setLast({ from: move.from, to: move.to }); setLog((l) => [...l, san]); setState(applyMove(state, move));
    }, 650);
    return () => window.clearTimeout(id);
  }, [state, bot, over, duel.blunderRate]);

  useEffect(() => {
    if (status === "checkmate" && state.turn === bot) { grantUnlock(solvedKey(duel.id)); grantUnlock(duel.unlocks.key); }
  }, [status, state.turn, bot, grantUnlock, duel.id, duel.unlocks.key]);

  function onMove(move: Move) {
    setLast({ from: move.from, to: move.to }); setLog((l) => [...l, toSan(state, move, true)]); setState(applyMove(state, move));
  }
  function restart() { setState(start); setLast(null); setLog([]); }

  const message = (() => {
    if (status === "checkmate") return state.turn === bot ? "Xeque-mate! O Peão Bot caiu." : "Xeque-mate: o Peão Bot venceu. Reinicie e tente de novo.";
    if (status === "stalemate") return "Afogamento: empate. O Rei não tem saída, mas também não está em xeque. Reinicie.";
    if (status === "draw50" || status === "insufficient") return "Empate. Reinicie e tente de novo.";
    return state.turn === duel.playerColor ? "Sua vez" : "Peão Bot pensando…";
  })();

  return (
    <AppShell accent={ACCENT} title={duel.title} subtitle={duel.subtitle}>
      <p className="pb-3 text-[13px] leading-relaxed text-[var(--inv-dim)]">{duel.goal}</p>
      <ChessBoard state={state} orientation={duel.playerColor} playable={solved || over ? null : duel.playerColor} onMove={onMove} lastMove={last} checkSquare={inCheck(state) ? findKing(state.board, state.turn) : null} />
      <p className="inv-mono min-h-[20px] pt-3 text-center text-[11px] uppercase tracking-[.14em]" role="status" style={{ color: "var(--inv-dim)" }}>{solved && !over ? "Duelo vencido" : message}</p>
      {solved && <UnlockBanner label={duel.unlocks.label} />}
      <div className="flex gap-2 pt-3">
        <button type="button" onClick={restart} className="inv-press inv-mono flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[10px] uppercase tracking-[.16em]" style={{ borderColor: ACCENT, color: ACCENT }}><RotateCcw size={13} />Reiniciar</button>
        {duel.hint && <button type="button" onClick={() => setShowHint((v) => !v)} className="inv-press inv-mono flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[10px] uppercase tracking-[.16em]" style={{ borderColor: "var(--inv-line-strong)", color: "var(--inv-dim)" }}><Lightbulb size={13} />Dica</button>}
      </div>
      {showHint && duel.hint && <p className="pt-3 text-[13px] leading-relaxed text-[var(--inv-dim)]">{duel.hint}</p>}
      {log.length > 0 && <p className="inv-mono pt-4 text-[10px] leading-relaxed text-[var(--inv-dim-2)]">Lances: {log.join(" · ")}</p>}
      <p className="pt-5 text-[12px] leading-relaxed text-[var(--inv-dim-2)]">Você joga com as {duel.playerColor === "b" ? "Pretas" : "Brancas"}. A fatura também abre com a senha, encontrada em outro lugar do aparelho.</p>
    </AppShell>
  );
}

function FriendScreen({ id }: { id: string }) {
  const { caseData } = useDevice();
  const friend = caseData.tabulive?.friends.find((f) => f.id === id);
  if (!friend) return null;
  return (
    <AppShell accent={ACCENT} title={friend.name} subtitle={friend.status ?? "Amigo no TabuLive"}>
      <div className="flex flex-col gap-3 pb-2">
        {friend.messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.from === "victim" ? "items-end" : "items-start"}`}>
            <div className="max-w-[78%] rounded-2xl px-3 py-2" style={{ background: m.from === "victim" ? `${ACCENT}24` : "var(--inv-surface-2)" }}>
              <p className="text-[14px] leading-snug">{m.text}</p>
              <p className="inv-mono pt-1 text-right text-[9px] text-[var(--inv-dim-2)]">{m.at}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4"><EvidenceToggle accent={ACCENT} item={{ id: `tabulive:friend:${friend.id}`, appId: "tabulive", title: `TabuLive — conversa com ${friend.name}`, subtitle: "TabuLive", target: { app: "tabulive", view: "friend", id: friend.id } }} /></div>
    </AppShell>
  );
}

export function TabuLiveApp() {
  const { caseData, current, open, isUnlocked } = useDevice();
  const data = caseData.tabulive;
  if (!data) return <AppShell accent={ACCENT} title="TabuLive"><p className="text-[14px] text-[var(--inv-dim)]">Aplicativo indisponível neste aparelho.</p></AppShell>;
  if (current?.view === "puzzle") { const p = data.puzzles.find((x) => x.id === current.id); if (p) return <PuzzleScreen puzzle={p} />; }
  if (current?.view === "duel" && data.duel) return <DuelScreen duel={data.duel} />;
  if (current?.view === "friend" && current.id) return <FriendScreen id={current.id} />;

  const Row = ({ title, subtitle, done, onClick, icon }: { title: string; subtitle: string; done: boolean; onClick: () => void; icon: React.ReactNode }) => (
    <button type="button" onClick={onClick} className="inv-press flex w-full items-center gap-3 border-b border-[var(--inv-line)] py-3.5 text-left">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border" style={{ borderColor: "var(--inv-line-strong)", color: ACCENT }}>{icon}</span>
      <span className="min-w-0 flex-1"><span className="block truncate text-[14px]">{title}</span><span className="inv-mono block truncate text-[10px] uppercase tracking-[.12em] text-[var(--inv-dim-2)]">{subtitle}</span></span>
      <span className="inv-mono text-[9px] uppercase tracking-[.14em]" style={{ color: done ? ACCENT : "var(--inv-dim-2)" }}>{done ? "Resolvido" : "Pendente"}</span>
      <ChevronRight size={15} className="text-[var(--inv-dim-2)]" />
    </button>
  );

  return (
    <AppShell accent={ACCENT} title={<span className="inv-display text-[20px]">TabuLive</span>} subtitle="Xadrez online" headerBackground="linear-gradient(180deg,rgba(47,122,70,.22),transparent)">
      <div className="flex items-center gap-3 rounded-2xl border bg-[var(--inv-surface)] p-3">
        <Avatar name={data.profile.name} seed={data.profile.avatarSeed} src={data.profile.avatarSrc} size={48} ring />
        <div><p className="text-[15px]">{data.profile.name}</p><p className="inv-mono text-[10px] uppercase tracking-[.14em] text-[var(--inv-dim)]">{data.profile.title} · {data.profile.rating} pts</p></div>
      </div>
      <SectionLabel>Amigos</SectionLabel>
      {data.friends.map((f) => (
        <button key={f.id} type="button" onClick={() => open({ app: "tabulive", view: "friend", id: f.id })} className="inv-press flex w-full items-center gap-3 border-b border-[var(--inv-line)] py-3 text-left">
          <Avatar name={f.name} seed={f.id} size={38} />
          <span className="min-w-0 flex-1"><span className="block truncate text-[14px]">{f.name}</span><span className="block truncate text-[12px] text-[var(--inv-dim)]">{f.messages[f.messages.length - 1]?.text}</span></span>
          <ChevronRight size={15} className="text-[var(--inv-dim-2)]" />
        </button>
      ))}
      <SectionLabel>Meus puzzles</SectionLabel>
      {data.puzzles.map((p) => <Row key={p.id} title={p.title} subtitle={p.subtitle} done={isUnlocked(solvedKey(p.id))} icon={<Trophy size={16} />} onClick={() => open({ app: "tabulive", view: "puzzle", id: p.id })} />)}
      {data.duel && <Row title={data.duel.title} subtitle={data.duel.subtitle} done={isUnlocked(solvedKey(data.duel.id))} icon={<Swords size={16} />} onClick={() => open({ app: "tabulive", view: "duel", id: data.duel!.id })} />}
    </AppShell>
  );
}
