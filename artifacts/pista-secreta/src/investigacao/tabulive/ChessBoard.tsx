import { useMemo, useState } from "react";
import { applyMove, colorOf, file, legalMoves, rank, type Color, type GameState, type Move, type PieceChar } from "./engine";
import { useT } from "@/i18n/LanguageProvider";

const GLYPH: Record<string, string> = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const FONT = '"Noto Sans Symbols 2","Segoe UI Symbol","Apple Symbols","DejaVu Sans","Arial Unicode MS",serif';
const LIGHT = "#d9cdf2";
const DARK = "#7a58b8";

function Piece({ piece }: { piece: PieceChar }) {
  const white = colorOf(piece) === "w";
  return (
    <span
      aria-hidden="true"
      className="select-none leading-none"
      style={{
        fontFamily: FONT,
        fontSize: "min(9vw, 36px)",
        color: white ? "#fffdf4" : "#1b1228",
        textShadow: white
          ? "0 0 1px #1b1228,0 0 2px #1b1228,1px 1px 0 #1b1228,-1px -1px 0 #1b1228,1px -1px 0 #1b1228,-1px 1px 0 #1b1228"
          : "0 0 1px rgba(255,255,255,.55)",
      }}
    >
      {GLYPH[piece.toLowerCase()]}
      {"\uFE0E"}
    </span>
  );
}

export interface ChessBoardProps {
  state: GameState;
  /** Lado que fica embaixo. */
  orientation: Color;
  /** Cor que o jogador pode mexer (null = tabuleiro só de leitura). */
  playable: Color | null;
  onMove: (move: Move) => void;
  lastMove?: { from: number; to: number } | null;
  /** Casa do rei em xeque (destacada). */
  checkSquare?: number | null;
}

/** Tabuleiro com toque: toque na peça, depois na casa de destino. Promoção automática para Dama. */
export function ChessBoard({ state, orientation, playable, onMove, lastMove, checkSquare }: ChessBoardProps) {
  const t = useT();
  const [selected, setSelected] = useState<number | null>(null);
  const moves = useMemo(() => (playable && state.turn === playable ? legalMoves(state) : []), [state, playable]);
  const targets = useMemo(() => moves.filter((m) => m.from === selected), [moves, selected]);

  const order = useMemo(() => {
    const list = Array.from({ length: 64 }, (_, i) => i);
    return orientation === "w" ? list : list.reverse();
  }, [orientation]);

  function tap(index: number) {
    if (!playable || state.turn !== playable) return;
    const piece = state.board[index];
    const move = targets.find((m) => m.to === index && (!m.promo || m.promo === "q"));
    if (move) { setSelected(null); onMove(move); return; }
    if (piece && colorOf(piece) === playable && moves.some((m) => m.from === index)) setSelected(index === selected ? null : index);
    else setSelected(null);
  }

  return (
    <div className="mx-auto w-full max-w-[360px] select-none" role="grid" aria-label={t("chessboard.label")}>
      <div className="grid grid-cols-8 overflow-hidden rounded-lg border border-white/15" style={{ aspectRatio: "1 / 1" }}>
        {order.map((index) => {
          const f = file(index); const r = rank(index);
          const dark = (f + (8 - r)) % 2 === 1;
          const piece = state.board[index];
          const isTarget = targets.some((m) => m.to === index);
          const isLast = lastMove && (lastMove.from === index || lastMove.to === index);
          const isSel = selected === index;
          const isCheck = checkSquare === index;
          const showFile = r === (orientation === "w" ? 1 : 8);
          const showRank = f === (orientation === "w" ? 0 : 7);
          return (
            <button
              key={index}
              type="button"
              role="gridcell"
              onClick={() => tap(index)}
              aria-label={`${String.fromCharCode(97 + f)}${r}${piece ? ` ${piece}` : ""}`}
              className="relative flex items-center justify-center"
              style={{ background: isCheck ? "#e06a6a" : isSel ? "#fffacd" : isLast ? (dark ? "#9e86d4" : "#efe3a8") : dark ? DARK : LIGHT }}
            >
              {piece && <Piece piece={piece} />}
              {isTarget && (
                <span className="absolute rounded-full" style={{ width: piece ? "86%" : "30%", height: piece ? "86%" : "30%", background: piece ? "transparent" : "rgba(30,15,60,.38)", border: piece ? "3px solid rgba(30,15,60,.45)" : "none" }} />
              )}
              {showFile && <span className="absolute bottom-[1px] right-[3px] text-[8px] font-semibold" style={{ color: dark ? LIGHT : DARK }}>{String.fromCharCode(97 + f)}</span>}
              {showRank && <span className="absolute left-[3px] top-[1px] text-[8px] font-semibold" style={{ color: dark ? LIGHT : DARK }}>{r}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { applyMove };
