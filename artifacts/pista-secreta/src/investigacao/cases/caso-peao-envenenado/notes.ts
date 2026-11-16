import type { Note } from "../../types";

/*
 * Notas (roteiro 4.7), mais recentes primeiro. A nota XEQUE AO BISPO é trancada (PIN 1972 = ano do Match do Século, Reykjavik).
 * Ajuste em relação ao roteiro: no item 5 do dossiê, "Hoje o Bispo falou em derrota" virou "Ontem à noite", pois a conversa com o Bispo foi em 09 MAI.
 */
export const notes: Note[] = [
  {
    id: "n-sem-titulo", title: "Sem título", at: "10 MAI · 21:14", pinned: true,
    preview: "cannoli… pistac… a cane… ta…",
    body: ["cannoli… pistac… a cane… ta… quem sabia da… gav… D. D. diag"],
  },
  {
    id: "n-xeque-bispo", title: "XEQUE AO BISPO", at: "20 ABR · atualizada 10 MAI · 19:10",
    preview: "Dossiê",
    lock: { passcode: "1972", hint: "O duelo que parou o mundo, em Reykjavik." },
    body: [
      "DOSSIÊ",
      "1) A GAMBET é do Bispo. Aparece como “patrocinadora”, mas os lucros caem na conta da Obra da Diagonal. Dízimo virou ficha de cassino.",
      "2) A Partida é combinada. Três derrotas estranhas da Corte Preta em 12 meses (Partidas 12, 41 e 64), sempre com um “erro” absurdo da minha Dama. Quem aposta na derrota rápida da Preta leva o prêmio.",
      "3) A Dama deve ao Gambet R$ 187 mil no meu cartão. Ela está sendo usada. Não é má. Está presa.",
      "4) Lance 31 da Partida 64: a Dama entregou a si mesma sem motivo. Prova pública.",
      "5) Ontem à noite o Bispo falou em “derrota” antes do jogo. Ele sabia o resultado.",
      "6) Assembleia: segunda, 11/05, 10h. 11 de maio, o mesmo dia em que a máquina derrubou o Rei em 1997. Dessa vez o Rei não cai.",
    ],
  },
  {
    id: "n-depois-final", title: "DEPOIS DA FINAL", at: "10 MAI",
    preview: "Falar com a Dama hoje. Sem acusar.",
    body: ["Falar com a Dama hoje. Sem acusar. Oferecer ajuda (clínica, grupo). Pedir que me conte tudo antes de segunda. Eu perdoo. Só falta eu dizer."],
  },
  {
    id: "n-lista", title: "LISTA", at: "08 MAI", preview: "café, ovos, vinho (pro Tor)…",
    checklist: [
      { text: "café", done: false }, { text: "ovos", done: false }, { text: "vinho (pro Tor)", done: true },
      { text: "meias pretas (tenho 32 pares e ainda assim)", done: false },
    ],
  },
  {
    id: "n-aula-roque", title: "AULA DE ROQUE", at: "29 MAR", preview: "O Rei anda duas casas e a Torre pula por cima.",
    body: ["Roque: o Rei anda duas casas e a Torre pula por cima. Não vale se o Rei estiver em xeque, se passar por casa atacada ou se já tiver se mexido.", "(Moral: não dá pra fugir de si mesmo.)"],
  },
  {
    id: "n-senhas", title: "SENHAS (só pra mim)", at: "20 MAR", preview: "Conversa arquivada, dossiê, banco…",
    body: [
      "Conversa arquivada: a partida que nunca morre (Londres).",
      "Dossiê: o duelo que parou o mundo (Reykjavik, Guerra Fria).",
      "Banco: o ano em que a máquina me fez chorar.",
      "(Tor diz que sou previsível. Tor não sabe de nada.)",
    ],
  },
  {
    id: "n-alergias", title: "ALERGIAS E CUIDADOS", at: "14 MAR", preview: "Alergia grave: pistache.",
    body: [
      "Alergia grave: PISTACHE (e castanhas em geral). Quase me levou no aniversário de dois anos atrás.",
      "Caneta de adrenalina: gaveta de cima da escrivaninha, sempre no mesmo lugar. Trocar quando vencer.",
      "Avisar: Dama, Tor, Claudinho. Confeitaria: pedir SEM pistache. A Santa Diagonal sabe? Perguntar.",
    ],
  },
  {
    id: "n-favoritas", title: "FAVORITAS", at: "02 FEV", preview: "Aberturas e partidas que amo.",
    body: [
      "Aberturas: Defesa Siciliana, Gambito da Dama, Índia do Rei.",
      "Partidas: a Imortal, a Sempre-Viva, a Ópera.",
      "Variante do Peão Envenenado: nunca aceite um peão de graça. Se parece grátis, alguém está cobrando a conta.",
    ],
  },
];
