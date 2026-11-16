import type { MatchesData } from "../../types";
import { eles, photo, rei } from "./helpers";

/*
 * Matches (roteiro 4.3). Distâncias e cidade são valores menores acrescentados para o layout.
 * O Rei estava no app só "olhando" e usa um perfil discreto. Dama Branca é um robô de propaganda do Gambet (os dados do perfil entregam).
 */
const m = (id: string, file: string, caption: string) => photo(id, `matches/${file}.webp`, caption);

export const matches: MatchesData = {
  appName: "MATCHES",
  profile: { name: "R. Preto", age: 58, avatarSeed: "reipreto" },
  matches: [
    {
      id: "mt-cavalob", name: "Cavalo Branco", age: 31, distanceKm: 3, city: "Tabuleiro",
      bio: "Só ando em L. Quem consegue me acompanhar?",
      interests: ["Viagens", "Saltos", "Obstáculos"],
      matchedAt: "20 MAR",
      photos: [m("mt-cb-1", "cavalob-0311", "Cavalo branco em uma academia"), m("mt-cb-2", "cavalob-0312", "Cavalo branco em uma pista de corrida"), m("mt-cb-3", "cavalob-0313", "Pequeno cavalo branco sobre um banco de academia")],
      messages: [
        rei("mx1", "20 MAR · 21:10", "Você fez o L?"),
        eles("mx2", "20 MAR · 21:11", "Duas casas pra frente, uma de lado. Tipo meu ex."),
        rei("mx3", "20 MAR · 21:22", "Sou casado. Só estava olhando."),
        eles("mx4", "20 MAR · 21:23", "", photo("mx-horse", "matches/foto-matche-cavalo.webp", "Foto de um cavalo de verdade em um pasto")),
      ],
    },
    {
      id: "mt-damab", name: "Dama Branca", age: 45, distanceKm: 1, city: "Tabuleiro",
      bio: "Viciada em trocas e jogos. Vem comigo pro Gambet que eu te ensino 🎰",
      interests: ["Apostas", "Trocas", "Jogos"],
      matchedAt: "03 ABR",
      photos: [m("mt-db-1", "damab-0321", "Dama branca em uma sala de luxo"), m("mt-db-2", "damab-0322", "Dama branca ao lado de fichas de cassino e um celular")],
      details: [
        { label: "Perfil criado em", value: "02 ABR · 23:58" },
        { label: "Mensagens idênticas enviadas hoje", value: "3.412" },
        { label: "Verificação de identidade", value: "Não verificada" },
      ],
      messages: [
        eles("md1", "03 ABR · 01:10", "Oi gato! Aceita um gambito? Link na bio: bônus de boas-vindas!"),
        rei("md2", "03 ABR · 01:15", "Já moro com uma. Quero distância."),
        eles("md3", "03 ABR · 01:16", "Aceite o gambito e ganhe 3 peões!"),
      ],
    },
    {
      id: "mt-peao", name: "Peão Preto", age: 19, distanceKm: 0.1, city: "Tabuleiro",
      bio: "Estagiário da vida. Um dia chego na casa 8.",
      interests: ["Promoção", "Futebol", "Delivery"],
      matchedAt: "28 MAR",
      photos: [m("mt-p-1", "peao-0331", "Peão preto ao lado de um café gelado e óculos escuros"), m("mt-p-2", "peao-0332", "Peão preto em uma cafeteria")],
      messages: [
        eles("mp1", "28 MAR · 22:40", "Opa, sou eu, Claudinho. Eu não sabia que era o senhor!! Por favor não me demita."),
        rei("mp2", "28 MAR · 22:44", "Fica tranquilo. Eu também não sabia que era você."),
        eles("mp3", "28 MAR · 22:45", "Podemos fingir que isso nunca aconteceu?"),
        rei("mp4", "28 MAR · 22:46", "Já esqueci."),
      ],
    },
  ],
};
