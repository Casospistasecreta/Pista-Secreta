/**
 * Motor de xadrez mínimo e sem dependências, usado pelo TabuLive.
 * Regras completas: xeque, mate, afogamento, roque, en passant, promoção, regra dos 50 lances e material insuficiente.
 * Casas indexadas como no FEN: 0 = a8 … 63 = h1.
 */
export type Color = "w" | "b";
export type PieceChar = "P" | "N" | "B" | "R" | "Q" | "K" | "p" | "n" | "b" | "r" | "q" | "k";
export type Cell = PieceChar | null;

export interface Castling { K: boolean; Q: boolean; k: boolean; q: boolean }
export interface GameState {
  board: Cell[];
  turn: Color;
  castling: Castling;
  ep: number | null;
  halfmove: number;
  fullmove: number;
}
export interface Move {
  from: number;
  to: number;
  promo?: "q" | "r" | "b" | "n";
  capture?: boolean;
  ep?: boolean;
  castle?: "K" | "Q";
  double?: boolean;
}
export type Status = "ongoing" | "checkmate" | "stalemate" | "draw50" | "insufficient";

export const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const file = (i: number) => i & 7;
export const rank = (i: number) => 8 - (i >> 3);
export const sq = (name: string) => (8 - Number(name[1])) * 8 + (name.charCodeAt(0) - 97);
export const sqName = (i: number) => String.fromCharCode(97 + file(i)) + String(rank(i));
export const colorOf = (p: PieceChar): Color => (p === p.toUpperCase() ? "w" : "b");
const enemy = (c: Color): Color => (c === "w" ? "b" : "w");

export function parseFen(fen: string): GameState {
  const [placement, turn = "w", cast = "-", ep = "-", half = "0", full = "1"] = fen.trim().split(/\s+/);
  const board: Cell[] = [];
  for (const ch of placement) {
    if (ch === "/") continue;
    if (/[1-8]/.test(ch)) for (let n = 0; n < Number(ch); n += 1) board.push(null);
    else board.push(ch as PieceChar);
  }
  if (board.length !== 64) throw new Error(`FEN inválido: ${fen}`);
  return {
    board,
    turn: turn === "b" ? "b" : "w",
    castling: { K: cast.includes("K"), Q: cast.includes("Q"), k: cast.includes("k"), q: cast.includes("q") },
    ep: ep === "-" ? null : sq(ep),
    halfmove: Number(half) || 0,
    fullmove: Number(full) || 1,
  };
}

export function toFen(s: GameState): string {
  const rows: string[] = [];
  for (let r = 0; r < 8; r += 1) {
    let row = ""; let empty = 0;
    for (let f = 0; f < 8; f += 1) {
      const c = s.board[r * 8 + f];
      if (!c) empty += 1; else { if (empty) { row += empty; empty = 0; } row += c; }
    }
    if (empty) row += empty;
    rows.push(row);
  }
  const cast = (s.castling.K ? "K" : "") + (s.castling.Q ? "Q" : "") + (s.castling.k ? "k" : "") + (s.castling.q ? "q" : "") || "-";
  return `${rows.join("/")} ${s.turn} ${cast} ${s.ep === null ? "-" : sqName(s.ep)} ${s.halfmove} ${s.fullmove}`;
}

const KNIGHT: [number, number][] = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const KING: [number, number][] = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const DIAG: [number, number][] = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const ORTH: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const at = (r: number, f: number) => (r >= 0 && r < 8 && f >= 0 && f < 8 ? r * 8 + f : -1);

export function isAttacked(board: Cell[], target: number, by: Color): boolean {
  const r = target >> 3; const f = target & 7;
  const own = (p: Cell, chars: string) => p !== null && colorOf(p) === by && chars.includes(p.toUpperCase());
  const pr = by === "w" ? r + 1 : r - 1;
  for (const df of [-1, 1]) { const i = at(pr, f + df); if (i >= 0 && own(board[i], "P")) return true; }
  for (const [dr, df] of KNIGHT) { const i = at(r + dr, f + df); if (i >= 0 && own(board[i], "N")) return true; }
  for (const [dr, df] of KING) { const i = at(r + dr, f + df); if (i >= 0 && own(board[i], "K")) return true; }
  for (const [dr, df] of DIAG) { for (let k = 1; k < 8; k += 1) { const i = at(r + dr * k, f + df * k); if (i < 0) break; const p = board[i]; if (p) { if (own(p, "BQ")) return true; break; } } }
  for (const [dr, df] of ORTH) { for (let k = 1; k < 8; k += 1) { const i = at(r + dr * k, f + df * k); if (i < 0) break; const p = board[i]; if (p) { if (own(p, "RQ")) return true; break; } } }
  return false;
}

export function findKing(board: Cell[], c: Color): number { return board.indexOf(c === "w" ? "K" : "k"); }
export function inCheck(s: GameState, c: Color = s.turn): boolean {
  const k = findKing(s.board, c); return k >= 0 && isAttacked(s.board, k, enemy(c));
}

function pseudoMoves(s: GameState): Move[] {
  const out: Move[] = []; const { board, turn } = s; const us = turn;
  for (let from = 0; from < 64; from += 1) {
    const p = board[from]; if (!p || colorOf(p) !== us) continue;
    const r = from >> 3; const f = from & 7; const t = p.toUpperCase();
    if (t === "P") {
      const dir = us === "w" ? -1 : 1; const startR = us === "w" ? 6 : 1; const lastR = us === "w" ? 0 : 7;
      const push = (to: number, extra: Partial<Move> = {}) => {
        if ((to >> 3) === lastR) for (const promo of ["q", "r", "b", "n"] as const) out.push({ from, to, promo, ...extra });
        else out.push({ from, to, ...extra });
      };
      const one = at(r + dir, f);
      if (one >= 0 && !board[one]) {
        push(one);
        const two = at(r + 2 * dir, f);
        if (r === startR && two >= 0 && !board[two]) out.push({ from, to: two, double: true });
      }
      for (const df of [-1, 1]) {
        const to = at(r + dir, f + df); if (to < 0) continue;
        const target = board[to];
        if (target && colorOf(target) !== us) push(to, { capture: true });
        else if (!target && s.ep === to) out.push({ from, to, capture: true, ep: true });
      }
    } else if (t === "N" || t === "K") {
      for (const [dr, df] of t === "N" ? KNIGHT : KING) {
        const to = at(r + dr, f + df); if (to < 0) continue;
        const target = board[to];
        if (!target) out.push({ from, to }); else if (colorOf(target) !== us) out.push({ from, to, capture: true });
      }
      if (t === "K") {
        const home = us === "w" ? 60 : 4; const foe = enemy(us);
        if (from === home && !isAttacked(board, home, foe)) {
          const rights = us === "w" ? [s.castling.K, s.castling.Q] : [s.castling.k, s.castling.q];
          const rook = us === "w" ? "R" : "r";
          if (rights[0] && board[home + 3] === rook && !board[home + 1] && !board[home + 2] && !isAttacked(board, home + 1, foe) && !isAttacked(board, home + 2, foe)) out.push({ from, to: home + 2, castle: "K" });
          if (rights[1] && board[home - 4] === rook && !board[home - 1] && !board[home - 2] && !board[home - 3] && !isAttacked(board, home - 1, foe) && !isAttacked(board, home - 2, foe)) out.push({ from, to: home - 2, castle: "Q" });
        }
      }
    } else {
      const dirs = t === "B" ? DIAG : t === "R" ? ORTH : [...DIAG, ...ORTH];
      for (const [dr, df] of dirs) {
        for (let k = 1; k < 8; k += 1) {
          const to = at(r + dr * k, f + df * k); if (to < 0) break;
          const target = board[to];
          if (!target) { out.push({ from, to }); continue; }
          if (colorOf(target) !== us) out.push({ from, to, capture: true });
          break;
        }
      }
    }
  }
  return out;
}

export function applyMove(s: GameState, m: Move): GameState {
  const board = s.board.slice(); const piece = board[m.from] as PieceChar; const us = s.turn;
  const castling = { ...s.castling }; let ep: number | null = null;
  const captured = board[m.to];
  board[m.from] = null;
  if (m.ep) board[m.to + (us === "w" ? 8 : -8)] = null;
  board[m.to] = m.promo ? ((us === "w" ? m.promo.toUpperCase() : m.promo) as PieceChar) : piece;
  if (m.castle === "K") { board[m.to - 1] = board[m.to + 1]; board[m.to + 1] = null; }
  if (m.castle === "Q") { board[m.to + 1] = board[m.to - 2]; board[m.to - 2] = null; }
  if (m.double) ep = (m.from + m.to) / 2;
  if (piece === "K") { castling.K = false; castling.Q = false; }
  if (piece === "k") { castling.k = false; castling.q = false; }
  for (const i of [m.from, m.to]) {
    if (i === 63) castling.K = false; if (i === 56) castling.Q = false;
    if (i === 7) castling.k = false; if (i === 0) castling.q = false;
  }
  return {
    board, turn: enemy(us), castling, ep,
    halfmove: piece.toUpperCase() === "P" || captured || m.ep ? 0 : s.halfmove + 1,
    fullmove: s.fullmove + (us === "b" ? 1 : 0),
  };
}

export function legalMoves(s: GameState): Move[] {
  return pseudoMoves(s).filter((m) => !inCheck(applyMove(s, m), s.turn));
}
export function legalMovesFrom(s: GameState, from: number): Move[] { return legalMoves(s).filter((m) => m.from === from); }

export function insufficientMaterial(s: GameState): boolean {
  const rest = s.board.filter((c): c is PieceChar => c !== null && c.toUpperCase() !== "K");
  if (rest.length === 0) return true;
  if (rest.length === 1 && "NBnb".includes(rest[0])) return true;
  return false;
}

export function getStatus(s: GameState): Status {
  const moves = legalMoves(s);
  if (moves.length === 0) return inCheck(s) ? "checkmate" : "stalemate";
  if (insufficientMaterial(s)) return "insufficient";
  if (s.halfmove >= 100) return "draw50";
  return "ongoing";
}

/** Notação algébrica (SAN) em inglês; `pt` troca as letras das peças para a notação brasileira. */
export function toSan(s: GameState, m: Move, pt = false): string {
  const piece = s.board[m.from] as PieceChar; const t = piece.toUpperCase();
  const letters: Record<string, string> = pt ? { N: "C", B: "B", R: "T", Q: "D", K: "R" } : { N: "N", B: "B", R: "R", Q: "Q", K: "K" };
  let out = "";
  if (m.castle) out = m.castle === "K" ? "O-O" : "O-O-O";
  else {
    if (t === "P") { if (m.capture) out += String.fromCharCode(97 + file(m.from)); }
    else {
      out += letters[t];
      const rivals = legalMoves(s).filter((o) => o.to === m.to && o.from !== m.from && s.board[o.from] === piece);
      if (rivals.length) {
        if (rivals.every((o) => file(o.from) !== file(m.from))) out += String.fromCharCode(97 + file(m.from));
        else if (rivals.every((o) => rank(o.from) !== rank(m.from))) out += String(rank(m.from));
        else out += sqName(m.from);
      }
    }
    if (m.capture) out += "x";
    out += sqName(m.to);
    if (m.promo) out += "=" + (pt ? letters[m.promo.toUpperCase()] : m.promo.toUpperCase());
  }
  const next = applyMove(s, m);
  if (inCheck(next)) out += legalMoves(next).length === 0 ? "#" : "+";
  return out;
}

export function perft(s: GameState, depth: number): number {
  if (depth === 0) return 1;
  const moves = legalMoves(s);
  if (depth === 1) return moves.length;
  let n = 0; for (const m of moves) n += perft(applyMove(s, m), depth - 1); return n;
}

const VALUE: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
function material(s: GameState, side: Color): number {
  let v = 0;
  for (const c of s.board) { if (!c) continue; const x = VALUE[c.toLowerCase()]; v += colorOf(c) === side ? x : -x; }
  return v;
}

/**
 * Bot iniciante: olha 2 lances (a própria jogada + a melhor resposta do adversário), mas erra de propósito
 * parte das vezes. Serve para o "Duelo — Peão Bot", pensado para ser vencido por qualquer pessoa.
 */
export function botMove(s: GameState, blunderRate = 0.35, rng: () => number = Math.random): Move | null {
  const moves = legalMoves(s); if (moves.length === 0) return null;
  if (rng() < blunderRate) return moves[Math.floor(rng() * moves.length)];
  const side = s.turn; let best: Move[] = []; let bestScore = -Infinity;
  for (const m of moves) {
    const next = applyMove(s, m); const replies = legalMoves(next);
    let score: number;
    if (replies.length === 0) score = inCheck(next) ? 100000 : 0;
    else { let worst = Infinity; for (const r of replies) { const after = applyMove(next, r); const v = material(after, side); if (v < worst) worst = v; } score = worst; }
    score += rng() * 8;
    if (score > bestScore) { bestScore = score; best = [m]; } else if (score === bestScore) best.push(m);
  }
  return best[Math.floor(rng() * best.length)] ?? moves[0];
}
