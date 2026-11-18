import type { TabuLiveData } from "../../types";
import { asset, calendar, L } from "./helpers";

/*
 * TabuLive (roteiro 4.8 e 6.1). Cada desafio é uma ROTA ALTERNATIVA ao PIN do cadeado correspondente:
 *  - O Pastor (mate em 1, Brancas)  -> conversa arquivada Pastor D. (PIN 1851)
 *  - O Louco  (mate em 1, Pretas)   -> nota XEQUE AO BISPO (PIN 1972)
 *  - Duelo contra o Peão Bot        -> fatura da Nova (PIN 1997)
 * As posições foram verificadas por motor de regras: cada puzzle tem exatamente um lance que dá mate.
 */
export const tabulive: TabuLiveData = {
  profile: { name: L("Rei Preto", "Black King", "Rey Negro"), title: L("Jogador de clube · Premium", "Club player · Premium", "Jugador de club · Premium"), rating: 1480, avatarSeed: "reipreto", avatarSrc: asset("avatar-rei.webp") },
  friends: [
    {
      id: "pastor-d", name: "Pastor_D", status: L("Amigo desde 2023", "Friend since 2023", "Amigo desde 2023"),
      messages: [
        { from: "them", at: calendar("11 ABR"), text: L("Aceita revanche?", "Want a rematch?", "¿Aceptas la revancha?") },
        { from: "victim", at: calendar("11 ABR"), text: L("Só sem aposta.", "Only if there's no bet.", "Pero sin apuestas.") },
        { from: "them", at: calendar("11 ABR"), text: L("Apostar nunca é pecado se for pra Obra.", "Betting isn't a sin when it's for the Mission.", "Apostar nunca es pecado si es por la Obra.") },
      ],
    },
  ],
  puzzles: [
    {
      id: "puzzle-07", title: L("Puzzle 07 — O Pastor", "Puzzle 07 — The Scholar", "Puzzle 07 — El Pastor"), subtitle: L("Brancas jogam · mate em 1", "White to move · mate in 1", "Juegan las blancas · mate en 1"),
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      goal: L("Dê xeque-mate em um lance. Toque na peça e depois na casa de destino.", "Checkmate in one move. Tap a piece, then its destination square.", "Da jaque mate en una jugada. Toca una pieza y luego la casilla de destino."),
      hint: L("O Rei escreveu na margem: “o ponto fraco é sempre o mais próximo do Rei”.", "The King wrote in the margin: “the weak spot is always the one closest to the King.”", "El Rey anotó al margen: “el punto débil siempre es el más cercano al Rey”."),
      solution: L("Dxf7# (a Dama captura em f7, apoiada pelo Bispo)", "Qxf7# (the Queen captures on f7, backed by the Bishop)", "Dxf7# (la Dama captura en f7, con el apoyo del Alfil)"),
      unlocks: { key: "messages:c-pastor", label: L("conversa arquivada com o Pastor D.", "archived chat with Pastor D.", "conversación archivada con el Pastor D.") },
    },
    {
      id: "puzzle-11", title: L("Puzzle 11 — O Louco", "Puzzle 11 — The Fool", "Puzzle 11 — El Loco"), subtitle: L("Pretas jogam · mate em 1", "Black to move · mate in 1", "Juegan las negras · mate en 1"),
      fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
      goal: L("O Rei branco ignorou os avisos. Dê xeque-mate em um lance.", "The White King ignored the warnings. Checkmate in one move.", "El Rey Blanco ignoró las advertencias. Da jaque mate en una jugada."),
      hint: L("O Rei escreveu na margem: “o mate mais rápido do mundo começa com um aviso ignorado”.", "The King wrote in the margin: “the fastest checkmate in the world starts with a warning ignored.”", "El Rey anotó al margen: “el jaque mate más rápido del mundo empieza con una advertencia ignorada”."),
      solution: L("Dh4# (a Dama desce a diagonal até h4)", "Qh4# (the Queen slides down the diagonal to h4)", "Dh4# (la Dama baja por la diagonal hasta h4)"),
      unlocks: { key: "notes:n-xeque-bispo", label: L("nota trancada XEQUE AO BISPO", "locked note CHECK THE BISHOP", "nota bloqueada JAQUE AL OBISPO") },
    },
  ],
  duel: {
    id: "duelo-peao-bot", title: L("Duelo — Peão Bot", "Duel — Pawn Bot", "Duelo — Peón Bot"), subtitle: L("Partida completa · você joga com as Pretas", "Full game · you play as Black", "Partida completa · juegas con las negras"),
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/4K3 w kq - 0 1",
    playerColor: "b", blunderRate: 0.4,
    goal: L("O Peão Bot só tem o Rei e oito peões. Dê xeque-mate nele. Cuidado: se o Rei dele ficar sem lances sem estar em xeque, é afogamento (empate).", "Pawn Bot has only a King and eight pawns. Checkmate it. Careful: if its King has no legal moves but isn't in check, that's stalemate—a draw.", "Peón Bot solo tiene un Rey y ocho peones. Dale jaque mate. Cuidado: si su Rey se queda sin movimientos legales y no está en jaque, es ahogado (tablas)."),
    hint: L("Troque peças só se precisar, avance a Dama e uma Torre juntas e leve o Rei branco para a borda do tabuleiro.", "Trade pieces only if you have to. Advance your Queen and a Rook together, then drive the White King to the edge of the board.", "Cambia piezas solo si hace falta, avanza la Dama junto con una Torre y lleva al Rey Blanco hasta el borde del tablero."),
    unlocks: { key: "bank:t-fatura", label: L("fatura trancada da Nova", "locked Nova bill", "factura bloqueada de Nova") },
  },
};
