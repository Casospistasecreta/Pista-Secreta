import type { MatchesData } from "../../types";
import type { LocalizedText } from "@/i18n/types";
import { calendar, eles, L, photo, rei } from "./helpers";

/*
 * Matches (roteiro 4.3). Distâncias e cidade são valores menores acrescentados para o layout.
 * O Rei estava no app só "olhando" e usa um perfil discreto. Dama Branca é um robô de propaganda do Gambet (os dados do perfil entregam).
 */
const m = (id: string, file: string, caption: LocalizedText) => photo(id, `matches/${file}.webp`, caption);

export const matches: MatchesData = {
  appName: "MATCHES",
  profile: { name: L("R. Preto", "B. King", "R. Negro"), age: 58, avatarSeed: "reipreto" },
  matches: [
    {
      id: "mt-cavalob", name: L("Cavalo Branco", "White Knight", "Caballo Blanco"), age: 31, distanceKm: 3, city: L("Tabuleiro", "The Board", "Tablero"),
      bio: L("Só ando em L. Quem consegue me acompanhar?", "I only move in an L. Can you keep up?", "Solo me muevo en L. ¿Quién puede seguirme el ritmo?"),
      interests: [L("Viagens", "Travel", "Viajes"), L("Saltos", "Jumps", "Saltos"), L("Obstáculos", "Obstacles", "Obstáculos")],
      matchedAt: calendar("20 MAR"),
      photos: [m("mt-cb-1", "cavalob-0311", L("Cavalo branco em uma academia", "White horse at a gym", "Caballo blanco en un gimnasio")), m("mt-cb-2", "cavalob-0312", L("Cavalo branco em uma pista de corrida", "White horse on a racetrack", "Caballo blanco en una pista de carreras")), m("mt-cb-3", "cavalob-0313", L("Pequeno cavalo branco sobre um banco de academia", "Small white horse on a gym bench", "Caballito blanco sobre un banco de gimnasio"))],
      messages: [
        rei("mx1", "20 MAR · 21:10", L("Você fez o L?", "Did you make an L?", "¿Hiciste la L?")),
        eles("mx2", "20 MAR · 21:11", L("Duas casas pra frente, uma de lado. Tipo meu ex.", "Two squares forward, one to the side. Like my ex.", "Dos casillas adelante y una al lado. Como mi ex.")),
        rei("mx3", "20 MAR · 21:22", L("Sou casado. Só estava olhando.", "I'm married. Just browsing.", "Estoy casado. Solo estaba mirando.")),
        eles("mx4", "20 MAR · 21:23", "", photo("mx-horse", "matches/foto-matche-cavalo.webp", L("Foto de um cavalo de verdade em um pasto", "A real horse grazing in a field", "Un caballo de verdad pastando en un campo"))),
      ],
    },
    {
      id: "mt-damab", name: L("Dama Branca", "White Queen", "Dama Blanca"), age: 45, distanceKm: 1, city: L("Tabuleiro", "The Board", "Tablero"),
      bio: L("Viciada em trocas e jogos. Vem comigo pro Gambet que eu te ensino 🎰", "Love trading and games. Come to GAMBET and I'll show you the ropes 🎰", "Me encantan los intercambios y los juegos. Ven a GAMBET y te enseño 🎰"),
      interests: [L("Apostas", "Betting", "Apuestas"), L("Trocas", "Trades", "Intercambios"), L("Jogos", "Games", "Juegos")],
      matchedAt: calendar("03 ABR"),
      photos: [m("mt-db-1", "damab-0321", L("Dama branca em uma sala de luxo", "White Queen in a luxury lounge", "Dama Blanca en un salón de lujo")), m("mt-db-2", "damab-0322", L("Dama branca ao lado de fichas de cassino e um celular", "White Queen beside casino chips and a phone", "Dama Blanca junto a fichas de casino y un celular"))],
      details: [
        { label: L("Perfil criado em", "Profile created", "Perfil creado"), value: calendar("02 ABR · 23:58") },
        { label: L("Mensagens idênticas enviadas hoje", "Identical messages sent today", "Mensajes idénticos enviados hoy"), value: "3.412" },
        { label: L("Verificação de identidade", "Identity verification", "Verificación de identidad"), value: L("Não verificada", "Not verified", "Sin verificar") },
      ],
      messages: [
        eles("md1", "03 ABR · 01:10", L("Oi gato! Aceita um gambito? Link na bio: bônus de boas-vindas!", "Hey handsome! Ready to accept a gambit? Welcome bonus at the link in my bio!", "¡Hola, guapo! ¿Aceptas un gambito? Enlace en mi bio: ¡bono de bienvenida!")),
        rei("md2", "03 ABR · 01:15", L("Já moro com uma. Quero distância.", "I already live with one. I'm looking for distance.", "Ya vivo con una. Quiero mantener distancia.")),
        eles("md3", "03 ABR · 01:16", L("Aceite o gambito e ganhe 3 peões!", "Accept the gambit and win 3 pawns!", "¡Acepta el gambito y gana 3 peones!")),
      ],
    },
    {
      id: "mt-peao", name: L("Peão Preto", "Black Pawn", "Peón Negro"), age: 19, distanceKm: 0.1, city: L("Tabuleiro", "The Board", "Tablero"),
      bio: L("Estagiário da vida. Um dia chego na casa 8.", "Life's an internship. One day I'll make it to the eighth rank.", "Becario de la vida. Algún día llegaré a la octava fila."),
      interests: [L("Promoção", "Promotion", "Promoción"), L("Futebol", "Soccer", "Fútbol"), L("Delivery", "Delivery", "Reparto a domicilio")],
      matchedAt: calendar("28 MAR"),
      photos: [m("mt-p-1", "peao-0331", L("Peão preto ao lado de um café gelado e óculos escuros", "Black Pawn beside an iced coffee, wearing sunglasses", "Peón Negro junto a un café frío y gafas de sol")), m("mt-p-2", "peao-0332", L("Peão preto em uma cafeteria", "Black Pawn at a café", "Peón Negro en una cafetería"))],
      messages: [
        eles("mp1", "28 MAR · 22:40", L("Opa, sou eu, Claudinho. Eu não sabia que era o senhor!! Por favor não me demita.", "Hey, it's me, Claudinho. I didn't know it was you!! Please don't fire me.", "¡Hola, soy Claudinho! ¡No sabía que era usted! Por favor, no me despida.")),
        rei("mp2", "28 MAR · 22:44", L("Fica tranquilo. Eu também não sabia que era você.", "Relax. I didn't know it was you either.", "Tranquilo. Yo tampoco sabía que eras tú.")),
        eles("mp3", "28 MAR · 22:45", L("Podemos fingir que isso nunca aconteceu?", "Can we pretend this never happened?", "¿Podemos fingir que esto nunca pasó?")),
        rei("mp4", "28 MAR · 22:46", L("Já esqueci.", "Already forgotten.", "Ya lo olvidé.")),
      ],
    },
  ],
};
