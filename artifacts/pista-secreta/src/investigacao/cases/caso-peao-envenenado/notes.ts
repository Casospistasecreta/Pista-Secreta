import type { Note } from "../../types";
import { calendar, L } from "./helpers";

/*
 * Notas (roteiro 4.7), mais recentes primeiro. A nota XEQUE AO BISPO é trancada (PIN 1972 = ano do Match do Século, Reykjavik).
 * Ajuste em relação ao roteiro: no item 5 do dossiê, "Hoje o Bispo falou em derrota" virou "Ontem à noite", pois a conversa com o Bispo foi em 09 MAI.
 */
export const notes: Note[] = [
  {
    id: "n-sem-titulo", title: L("Sem título", "Untitled", "Sin título"), at: calendar("10 MAI · 21:14"), pinned: true,
    preview: L("cannoli… pistac… a cane… ta…", "cannoli… pistac… epi… pen…", "cannoli… pistac… la plu…"),
    body: [L("cannoli… pistac… a cane… ta… quem sabia da… gav… D. D. diag", "cannoli… pistac… epi… pen… who knew about the… dra… B. D. diag", "cannoli… pistac… la plu… quién sabía del… caj… D. D. diag")],
  },
  {
    id: "n-xeque-bispo", title: L("XEQUE AO BISPO", "CHECK THE BISHOP", "JAQUE AL OBISPO"), at: L("20 ABR · atualizada 10 MAI · 19:10", "APR 20 · updated MAY 10 · 19:10", "20 ABR · actualizado 10 MAY · 19:10"),
    preview: L("Dossiê", "Dossier", "Expediente"),
    lock: { passcode: "1972", hint: L("O duelo que parou o mundo, em Reykjavik.", "The match that stopped the world, in Reykjavík.", "El duelo que detuvo al mundo, en Reikiavik.") },
    body: [
      L("DOSSIÊ", "DOSSIER", "EXPEDIENTE"),
      L("1) A GAMBET é do Bispo. Aparece como “patrocinadora”, mas os lucros caem na conta da Obra da Diagonal. Dízimo virou ficha de cassino.", "1) GAMBET belongs to the Bishop. It poses as a “sponsor,” but the profits go to the Diagonal Mission. Tithes turned into casino chips.", "1) GAMBET es del Obispo. Figura como “patrocinador”, pero las ganancias van a la cuenta de la Obra de la Diagonal. El diezmo se convirtió en fichas de casino."),
      L("2) A Partida é combinada. Três derrotas estranhas da Corte Preta em 12 meses (Partidas 12, 41 e 64), sempre com um “erro” absurdo da minha Dama. Quem aposta na derrota rápida da Preta leva o prêmio.", "2) The games are fixed. Three strange losses for the Black Court in 12 months (Games 12, 41, and 64), each with an absurd “blunder” by my Queen. Whoever bets on the Black side losing quickly takes the prize.", "2) Las partidas están amañadas. Tres derrotas extrañas de la Corte Negra en 12 meses (Partidas 12, 41 y 64), siempre con un “error” absurdo de mi Reina. Quien apuesta por una derrota rápida de las Negras se lleva el premio."),
      L("3) A Dama deve ao Gambet R$ 187 mil no meu cartão. Ela está sendo usada. Não é má. Está presa.", "3) The Queen owes GAMBET R$ 187,000 on my card. Someone is using her. She isn't evil. She's trapped.", "3) La Reina le debe R$ 187.000 a GAMBET en mi tarjeta. La están utilizando. No es mala. Está atrapada."),
      L("4) Lance 31 da Partida 64: a Dama entregou a si mesma sem motivo. Prova pública.", "4) Move 31 of Game 64: the Queen gave herself away for no reason. Public proof.", "4) Jugada 31 de la Partida 64: la Reina se entregó sin motivo. Prueba pública."),
      L("5) Ontem à noite o Bispo falou em “derrota” antes do jogo. Ele sabia o resultado.", "5) Last night, the Bishop mentioned “defeat” before the game. He knew the result.", "5) Anoche, el Obispo habló de “derrota” antes de la partida. Sabía el resultado."),
      L("6) Assembleia: segunda, 11/05, 10h. 11 de maio, o mesmo dia em que a máquina derrubou o Rei em 1997. Dessa vez o Rei não cai.", "6) Assembly: Monday, May 11, 10 a.m. May 11—the same date a machine brought down the King in 1997. This time, the King won't fall.", "6) Asamblea: lunes 11/05, 10:00. El 11 de mayo, la misma fecha en que una máquina derrotó al Rey en 1997. Esta vez, el Rey no caerá."),
    ],
  },
  {
    id: "n-depois-final", title: L("DEPOIS DA FINAL", "AFTER THE FINAL", "DESPUÉS DE LA FINAL"), at: calendar("10 MAI"),
    preview: L("Falar com a Dama hoje. Sem acusar.", "Talk to the Queen today. Don't accuse her.", "Hablar hoy con la Reina. Sin acusarla."),
    body: [L("Falar com a Dama hoje. Sem acusar. Oferecer ajuda (clínica, grupo). Pedir que me conte tudo antes de segunda. Eu perdoo. Só falta eu dizer.", "Talk to the Queen today. No accusations. Offer help (a clinic, a support group). Ask her to tell me everything before Monday. I forgive her. I just need to say it.", "Hablar hoy con la Reina. Sin acusarla. Ofrecer ayuda (una clínica, un grupo). Pedirle que me cuente todo antes del lunes. La perdono. Solo me falta decírselo.")],
  },
  {
    id: "n-lista", title: L("LISTA", "LIST", "LISTA"), at: calendar("08 MAI"), preview: L("café, ovos, vinho (pro Tor)…", "coffee, eggs, wine (for Tor)…", "café, huevos, vino (para Tor)…"),
    checklist: [
      { text: L("café", "coffee", "café"), done: false }, { text: L("ovos", "eggs", "huevos"), done: false }, { text: L("vinho (pro Tor)", "wine (for Tor)", "vino (para Tor)"), done: true },
      { text: L("meias pretas (tenho 32 pares e ainda assim)", "black socks (I own 32 pairs and somehow still need more)", "calcetines negros (tengo 32 pares y aun así me faltan)"), done: false },
    ],
  },
  {
    id: "n-aula-roque", title: L("AULA DE ROQUE", "CASTLING LESSON", "LECCIÓN DE ENROQUE"), at: calendar("29 MAR"), preview: L("O Rei anda duas casas e a Torre pula por cima.", "The King moves two squares; the Rook hops over.", "El Rey se mueve dos casillas y la Torre salta por encima."),
    body: [L("Roque: o Rei anda duas casas e a Torre pula por cima. Não vale se o Rei estiver em xeque, se passar por casa atacada ou se já tiver se mexido.", "Castling: the King moves two squares, and the Rook jumps over. You can't castle out of check, through an attacked square, or after either piece has moved.", "Enroque: el Rey avanza dos casillas y la Torre salta por encima. No se puede enrocar si el Rey está en jaque, pasa por una casilla atacada o ya se movió."), L("(Moral: não dá pra fugir de si mesmo.)", "(Moral: you can't castle away from yourself.)", "(Moraleja: no puedes enrocarte para huir de ti mismo.)")],
  },
  {
    id: "n-senhas", title: L("SENHAS (só pra mim)", "PASSCODES (just for me)", "CLAVES (solo para mí)"), at: calendar("20 MAR"), preview: L("Conversa arquivada, dossiê, banco…", "Archived chat, dossier, bank…", "Conversación archivada, expediente, banco…"),
    body: [
      L("Conversa arquivada: a partida que nunca morre (Londres).", "Archived chat: the game that never dies (London).", "Conversación archivada: la partida que nunca muere (Londres)."),
      L("Dossiê: o duelo que parou o mundo (Reykjavik, Guerra Fria).", "Dossier: the match that stopped the world (Reykjavík, Cold War).", "Expediente: el duelo que detuvo al mundo (Reikiavik, Guerra Fría)."),
      L("Banco: o ano em que a máquina me fez chorar.", "Bank: the year a machine made me cry.", "Banco: el año en que una máquina me hizo llorar."),
      L("(Tor diz que sou previsível. Tor não sabe de nada.)", "(Tor says I'm predictable. Tor knows nothing.)", "(Tor dice que soy predecible. No sabe nada.)"),
    ],
  },
  {
    id: "n-alergias", title: L("ALERGIAS E CUIDADOS", "ALLERGIES & CARE", "ALERGIAS Y CUIDADOS"), at: calendar("14 MAR"), preview: L("Alergia grave: pistache.", "Severe allergy: pistachio.", "Alergia grave: pistacho."),
    body: [
      L("Alergia grave: PISTACHE (e castanhas em geral). Quase me levou no aniversário de dois anos atrás.", "Severe allergy: PISTACHIO (and most tree nuts). Nearly killed me at my birthday two years ago.", "Alergia grave: PISTACHO (y la mayoría de los frutos secos). Casi me mata en mi cumpleaños hace dos años."),
      L("Caneta de adrenalina: gaveta de cima da escrivaninha, sempre no mesmo lugar. Trocar quando vencer.", "Epinephrine pen: top desk drawer, always in the same place. Replace when it expires.", "Pluma de adrenalina: cajón superior del escritorio, siempre en el mismo sitio. Cambiar al caducar."),
      L("Avisar: Dama, Tor, Claudinho. Confeitaria: pedir SEM pistache. A Santa Diagonal sabe? Perguntar.", "Tell: the Queen, Tor, Claudinho. Bakery order: NO pistachio. Does Santa Diagonal know? Ask.", "Avisar: a la Reina, Tor y Claudinho. Pastelería: pedir SIN pistacho. ¿Lo sabe Santa Diagonal? Preguntar."),
    ],
  },
  {
    id: "n-favoritas", title: L("FAVORITAS", "FAVORITES", "FAVORITAS"), at: calendar("02 FEV"), preview: L("Aberturas e partidas que amo.", "Openings and games I love.", "Aperturas y partidas que me encantan."),
    body: [
      L("Aberturas: Defesa Siciliana, Gambito da Dama, Índia do Rei.", "Openings: Sicilian Defense, Queen's Gambit, King's Indian.", "Aperturas: Defensa Siciliana, Gambito de Dama, Defensa India de Rey."),
      L("Partidas: a Imortal, a Sempre-Viva, a Ópera.", "Games: the Immortal, the Evergreen, the Opera.", "Partidas: la Inmortal, la Siempreviva, la Ópera."),
      L("Variante do Peão Envenenado: nunca aceite um peão de graça. Se parece grátis, alguém está cobrando a conta.", "The Poisoned Pawn Variation: never accept a free pawn. If it looks free, someone's keeping score.", "Variante del Peón Envenenado: nunca aceptes un peón gratis. Si parece gratis, alguien te pasará la cuenta."),
    ],
  },
];
