import type { TabuLiveData } from "../../types";
import { asset } from "./helpers";

/*
 * TabuLive (roteiro 4.8 e 6.1). Cada desafio é uma ROTA ALTERNATIVA ao PIN do cadeado correspondente:
 *  - O Pastor (mate em 1, Brancas)  -> conversa arquivada Pastor D. (PIN 1851)
 *  - O Louco  (mate em 1, Pretas)   -> nota XEQUE AO BISPO (PIN 1972)
 *  - Duelo contra o Peão Bot        -> fatura da Nova (PIN 1997)
 * As posições foram verificadas por motor de regras: cada puzzle tem exatamente um lance que dá mate.
 */
export const tabulive: TabuLiveData = {
  profile: { name: "Rei Preto", title: "Jogador de clube · Premium", rating: 1480, avatarSeed: "reipreto", avatarSrc: asset("avatar-rei.webp") },
  friends: [
    {
      id: "pastor-d", name: "Pastor_D", status: "Amigo desde 2023",
      messages: [
        { from: "them", at: "11 ABR", text: "Aceita revanche?" },
        { from: "victim", at: "11 ABR", text: "Só sem aposta." },
        { from: "them", at: "11 ABR", text: "Apostar nunca é pecado se for pra Obra." },
      ],
    },
  ],
  puzzles: [
    {
      id: "puzzle-07", title: "Puzzle 07 — O Pastor", subtitle: "Brancas jogam · mate em 1",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      goal: "Dê xeque-mate em um lance. Toque na peça e depois na casa de destino.",
      hint: "O Rei escreveu na margem: “o ponto fraco é sempre o mais próximo do Rei”.",
      solution: "Dxf7# (a Dama captura em f7, apoiada pelo Bispo)",
      unlocks: { key: "messages:c-pastor", label: "conversa arquivada com o Pastor D." },
    },
    {
      id: "puzzle-11", title: "Puzzle 11 — O Louco", subtitle: "Pretas jogam · mate em 1",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
      goal: "O Rei branco ignorou os avisos. Dê xeque-mate em um lance.",
      hint: "O Rei escreveu na margem: “o mate mais rápido do mundo começa com um aviso ignorado”.",
      solution: "Dh4# (a Dama desce a diagonal até h4)",
      unlocks: { key: "notes:n-xeque-bispo", label: "nota trancada XEQUE AO BISPO" },
    },
  ],
  duel: {
    id: "duelo-peao-bot", title: "Duelo — Peão Bot", subtitle: "Partida completa · você joga com as Pretas",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/4K3 w kq - 0 1",
    playerColor: "b", blunderRate: 0.4,
    goal: "O Peão Bot só tem o Rei e oito peões. Dê xeque-mate nele. Cuidado: se o Rei dele ficar sem lances sem estar em xeque, é afogamento (empate).",
    hint: "Troque peças só se precisar, avance a Dama e uma Torre juntas e leve o Rei branco para a borda do tabuleiro.",
    unlocks: { key: "bank:t-fatura", label: "fatura trancada da Nova" },
  },
};
