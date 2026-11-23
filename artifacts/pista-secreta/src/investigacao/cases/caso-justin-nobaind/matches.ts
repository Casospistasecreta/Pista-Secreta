import type { MatchesData, Message } from "../../types";
import { photo } from "./helpers";

/*
 * Matches (roteiro 5.5). Distâncias e cidades são valores menores adicionados para o layout. A Coruja não tem idade
 * (aparece sem idade, como "redigida"). Ajuste: na fala da Ramona (12 ABR 01:50) "cagada" virou "bagunça" (classificação 14+).
 */
const them = (id: string, at: string, text: string): Message => ({ id, from: "them", at, text });
const me = (id: string, at: string, text: string): Message => ({ id, from: "victim", at, text });

export const matches: MatchesData = {
  appName: "MATCHES",
  profile: { name: "Justin", age: 27, avatarSeed: "justin" },
  matches: [
    {
      id: "mt-coruja",
      name: "Coruja",
      age: 0,
      redacted: true,
      distanceKm: 0,
      distanceLabel: "distância oculta",
      bio: "Procuro quem queira jantar quando o mundo dorme. Gosto de gente que sabe sair de uma festa.",
      interests: ["Madrugada", "Jantares", "Barcos"],
      matchedAt: "22 ABR",
      details: [
        { label: "Perfil criado em", value: "22 ABR · 22:55" },
        { label: "Local do cadastro", value: "Pier Road, 12, Santa Monica" },
        { label: "Última atividade", value: "08 MAI · 02:40" },
      ],
      photos: [photo("mp-0307", "matches/0307.webp"), photo("mp-0308", "matches/0308.webp"), photo("mp-0309", "matches/0309.webp")],
      messages: [
        me("m01", "22 ABR · 23:05", "Você é a Coruja? Que bio é essa?"),
        them("m02", "22 ABR · 23:20", "Primeiro encontro: eu cuido do cardápio, você escolhe a música."),
        me("m03", "29 ABR · 21:12", "Escolhi. É a que eu nunca gravei."),
        them("m04", "29 ABR · 21:30", "Perfeito. Convidados: dois de confiança e um de plantão. Ninguém mais."),
        them("m05", "04 MAI · 22:20", "A aliança vence dia 10. O jantar é dia 7. Ninguém dá festa depois do vencimento."),
        me("m06", "05 MAI · 23:10", "E a sobremesa?"),
        them("m07", "05 MAI · 23:14", "Doce e rápida. O médico explica. Você só segue o relógio e conta até dez."),
        me("m08", "06 MAI · 22:40", "E se o garçom perceber?"),
        them("m09", "06 MAI · 22:44", "O garçom vai estar olhando a piscina, não a cozinha."),
        them("m10", "07 MAI · 21:50", "Jantar às 22h. Mel e Milo entram pela lateral. Tuco espera na doca com o casaco."),
        me("m11", "07 MAI · 21:54", "Já escolhi o casaco. O azul."),
        them("m12", "07 MAI · 21:55", "Boa festa, J."),
        them("m13", "08 MAI · 02:40", "Saiu sem barulho. A festa acabou."),
      ],
    },
    {
      id: "mt-kelly",
      name: "Kelly G.",
      age: 22,
      distanceKm: 6.2,
      city: "Los Angeles",
      bio: "Cantora nova na cidade. Procuro quem me ensine a não ser engolida.",
      interests: ["Pop", "Dança", "Primeiro disco"],
      matchedAt: "22 MAR",
      photos: [photo("mp-0301", "matches/0301.webp"), photo("mp-0302", "matches/0302.webp"), photo("mp-0303", "matches/0303.webp")],
      messages: [
        them("m01", "22 MAR · 13:40", "Match! Se você quiser, posso te pagar um café e sua orientação."),
        me("m02", "22 MAR · 14:05", "Orientação eu dou. Café eu aceito."),
        them("m03", "04 ABR · 18:20", "Katherine viu a gente tomando café e quase me fulminou."),
        me("m04", "04 ABR · 18:30", "Ela fulmina até sorvete."),
      ],
    },
    {
      id: "mt-lilly",
      name: "Lilly S.",
      age: 24,
      distanceKm: 3.4,
      city: "Hollywood",
      bio: "Tiete de carteirinha. Se você me der um autógrafo, eu não lavo a mão.",
      interests: ["Rock", "Fotografia", "Fita K7"],
      matchedAt: "12 ABR",
      photos: [photo("mp-0304", "matches/0304.webp"), photo("mp-0305", "matches/0305.webp"), photo("mp-0306", "matches/0306.webp")],
      messages: [
        them("m01", "12 ABR · 20:14", "Eu sei que você tem namorada, Justin. Só queria dizer que gosto de você desde o primeiro disco."),
        me("m02", "12 ABR · 20:30", "Obrigado, Lilly. Mas tem alguém na banda que gosta de você desde antes de mim."),
        them("m03", "12 ABR · 20:31", "Quem?"),
        me("m04", "12 ABR · 20:33", "Pergunta pro baixista. Ele não sabe mentir."),
      ],
    },
    {
      id: "mt-ramona",
      name: "Ramona C.",
      age: 37,
      distanceKm: 1.8,
      city: "Los Angeles",
      bio: "Procurando alguém para me ouvir reclamar. Marco horário para todo mundo, menos para mim. Pontualidade é o meu tipo.",
      interests: ["Café", "Jazz", "Reuniões longas"],
      matchedAt: "11 ABR",
      photos: [photo("mp-0313", "matches/0313.webp"), photo("mp-0314", "matches/0314.webp"), photo("mp-0315", "matches/0315.webp")],
      messages: [
        them("m01", "11 ABR · 23:50", "Match. Se a Katherine ver você usando isso vai dar mais um problema de imagem pública."),
        me("m02", "11 ABR · 23:58", "Não estou usando para namorar."),
        them("m03", "12 ABR · 01:50", "Não importa o motivo de você estar usando. Importa a bagunça que eu vou ter que limpar depois."),
        me("m04", "12 ABR · 05:36", "Que bom que eu tenho você então."),
      ],
    },
    {
      id: "mt-dolly",
      name: "Dolly",
      age: 26,
      distanceKm: 2.1,
      city: "Hollywood",
      bio: "Entrego o que você precisar, rapidinho.",
      interests: ["Festas", "Doces", "Sempre disponível"],
      matchedAt: "03 MAI",
      photos: [photo("mp-0311", "matches/0311.webp"), photo("mp-0312", "matches/0312.webp")],
      messages: [
        them("m01", "03 MAI · 02:00", "Oi, lindo. Sou amiga do Brock."),
        me("m02", "03 MAI · 02:08", "Não, obrigado."),
        them("m03", "03 MAI · 02:09", "Todo mundo aceita uma hora."),
      ],
    },
  ],
};
