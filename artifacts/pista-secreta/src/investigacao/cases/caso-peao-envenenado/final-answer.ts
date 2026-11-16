import type { FinalAnswerConfig, FinalReport } from "../../types";

/*
 * Resposta final (roteiro 5.5 e 5.7): 6 perguntas de escolha única, 100 pontos.
 * Q1 10 · Q2 15 · Q3 20 · Q4 20 · Q5 20 · Q6 15.
 * Faixas: 85+ Grande Mestre (relatório completo) · 55–84 Mestre de Clube · abaixo disso Peão Envenenado.
 * Os distratores usam as falsas pistas do caso (laudo oficial, Tor, Cavalo, Rei Branco, Matches, entregador).
 * As mensagens de erro orientam sem entregar a resposta.
 */
const completo: FinalReport = {
  title: "XEQUE-MATE — Caso encerrado",
  subtitle: "Delegacia Xeque · Tabuleiro · noite de 10 de Maio · Grande Mestre",
  paragraphs: [
    "Do persa shah mat: “o rei está indefeso”. Ninguém capturou o Rei Preto. Fizeram pior: tiraram as defesas dele e esperaram que aceitasse o presente.",
    "O Rei morreu de choque anafilático, por volta das 21h14. Comeu um cannoli de pistache enviado de presente pela Santa Diagonal, a confeitaria da igreja do Bispo Branco, que fingia estar na Sicília e era dono oculto da GAMBET. O laudo oficial dizia “parada cardíaca”: o coração parou, sim, porque a alergia não foi tratada.",
    "A caneta de adrenalina que o salvaria tinha sido retirada da gaveta às 17h12 pela Rainha Preta, afundada em dívidas de jogo, que teve a fatura de R$ 187 mil quitada pelo Bispo na véspera. “Troca justa”. Um Bispo mandou o doce. Uma Dama tirou a caneta. Dois lances contra o mesmo ponto fraco: é assim que se faz o Mate do Pastor.",
    "O motivo era a Assembleia de segunda. O Rei levaria o dossiê que provava a fraude: partidas combinadas, apostas lavadas pela Obra da Diagonal, lances absurdos como o da Dama no 31. O Rei Branco, o Cavalo, o Tor e o Claudinho eram inocentes. O Rei sabia: nunca aceite um peão de graça. Só não imaginou que a conta chegaria em forma de cannoli.",
    "Na manhã seguinte, a Rainha Preta se entregou à Delegacia Xeque. Leu a última nota do marido, “Eu perdoo. Só falta eu dizer”, e pediu ao Cavalo que levasse o dossiê à Assembleia.",
  ],
  closing: "Reis nunca são capturados. Bispos, sim. (Nota: os eventos históricos usados nas senhas são reais; todos os personagens e fatos do caso são ficção.)",
};

export const finalAnswer: FinalAnswerConfig = {
  intro: "Reúna suas evidências e responda às 6 perguntas. Cada acerto vale pontos e o resultado mostra o quanto você enxergou do tabuleiro. Você pode rever e refazer as respostas.",
  report: completo,
  scoring: {
    tiers: [
      { id: "grande-mestre", label: "Grande Mestre", minPoints: 85, report: completo },
      {
        id: "mestre-clube", label: "Mestre de Clube", minPoints: 55,
        report: {
          title: "Mestre de Clube",
          subtitle: "Final parcial",
          paragraphs: ["Você leu boa parte do tabuleiro, mas deixou uma peça de fora. Releia as respostas marcadas em vermelho, volte às evidências e confira os horários: no Tabuleiro, tudo se cruza. Quando achar que tem o mate, é só refazer."],
        },
      },
      {
        id: "peao-envenenado", label: "Peão Envenenado", minPoints: 0,
        report: {
          title: "Peão Envenenado",
          subtitle: "Final “versão oficial”",
          paragraphs: ["Você aceitou o presente: a versão do laudo, a das aparências, a do doce que ninguém questionou. Nunca aceite um peão de graça. Volte ao celular do Rei, marque as evidências e tente de novo."],
        },
      },
    ],
  },
  questions: [
    {
      id: "q1", prompt: "Como o Rei Preto morreu?", points: 10, correctOptionId: "c",
      options: [
        { id: "a", text: "Parada cardíaca natural, como diz o laudo" },
        { id: "b", text: "Envenenado por uma substância mortal escondida no doce" },
        { id: "c", text: "Choque anafilático, por uma alergia grave" },
        { id: "d", text: "Uma queda dentro do palácio" },
      ],
      feedback: {
        correct: "Choque anafilático. O doce, as Notas do Rei e a mensagem do Tor entregam.",
        wrong: "Releia as Notas do Rei, a foto do doce e a conversa com o Tor às 20h58. O laudo diz uma coisa; o celular diz outra.",
        wrongByOption: { a: "O laudo diz “parada cardíaca”, e isso é verdade, mas o coração parou por um motivo. Qual?" },
      },
    },
    {
      id: "q2", prompt: "O que impediu o Rei de se salvar?", points: 15, correctOptionId: "a",
      options: [
        { id: "a", text: "A caneta de adrenalina não estava mais na gaveta" },
        { id: "b", text: "Tor demorou demais para chegar" },
        { id: "c", text: "Ninguém chamou o SAMU" },
        { id: "d", text: "Ele não sabia que tinha alergia" },
      ],
      feedback: {
        correct: "Comprada em 07/05 e guardada na gaveta (foto 11h40). Às 20h57, a gaveta estava vazia.",
        wrong: "Compare as fotos de 07/05 e de 10/05 20h57, e a compra do dia 07 na Nova. Algo mudou de lugar.",
        wrongByOption: { b: "Tor chegou tarde, mas a Localização dele mostra por quê. A pergunta é o que faltou ao Rei.", d: "Ele sabia: está nas Notas e no PIKLIKE." },
      },
    },
    {
      id: "q3", prompt: "Quem planejou e enviou o doce?", points: 20, correctOptionId: "d",
      options: [
        { id: "a", text: "Rei Branco" },
        { id: "b", text: "Cavalo Preto" },
        { id: "c", text: "Peão Branco, o entregador" },
        { id: "d", text: "Bispo Branco (Dom Bispo)" },
      ],
      feedback: {
        correct: "Santa Diagonal é a confeitaria do Bispo, que sabia da alergia e mentiu sobre onde estava.",
        wrong: "Siga o pedido do Xeque-Food: de quem é a confeitaria? Quem comentou no PIKLIKE que sabia da alergia? E quem estava “agora mesmo” na praia?",
        wrongByOption: {
          a: "O Rei Branco estava no show ROQUE às 21h02. Veja o post da Torre Branca.",
          b: "O Cavalo saiu do palácio às 19h49, antes do pedido existir, e já tinha o dossiê.",
          c: "O entregador só entregou. Quem pagou o pedido e assinou como “admirador”?",
        },
      },
    },
    {
      id: "q4", prompt: "Quem retirou a caneta da gaveta?", points: 20, correctOptionId: "b",
      options: [
        { id: "a", text: "Tor (Torre Preta)" },
        { id: "b", text: "Rainha Preta (Dama)" },
        { id: "c", text: "Claudinho, o porteiro" },
        { id: "d", text: "Torre Branca" },
      ],
      feedback: {
        correct: "A Portaria registra a Dama no palácio às 17h12. Ela negou ter ido e teve a fatura paga na véspera.",
        wrong: "Quem entrou no palácio enquanto o Rei estava na Arena? Compare a Portaria com o que cada pessoa disse e com quem tinha motivo para aceitar um favor.",
        wrongByOption: { a: "Tor só chegou às 21h29 e a localização dele prova o trânsito.", c: "Claudinho só recebeu o pacote às 20h36.", d: "A Torre Branca estava no show, longe dali." },
      },
    },
    {
      id: "q5", prompt: "Por que o Rei foi silenciado?", points: 20, correctOptionId: "c",
      options: [
        { id: "a", text: "Disputa pela herança do palácio" },
        { id: "b", text: "Ciúme da Dama por causa do Matches" },
        { id: "c", text: "Ele ia denunciar, na Assembleia, a fraude da Gambet e das Partidas combinadas" },
        { id: "d", text: "Vingança do Rei Branco por causa da Oposição" },
      ],
      feedback: {
        correct: "O dossiê, o lance 31 e o aviso do Rei Branco montam o motivo.",
        wrong: "O Rei tinha uma Assembleia marcada. O que ele pretendia levar? Abra a nota trancada (ou o desafio do TabuLive) e leia o Cavalo.",
        wrongByOption: { b: "O Matches é distração: a Dama Branca é um robô e o Rei só olhava." },
      },
    },
    {
      id: "q6", prompt: "Por volta de que horas o Rei morreu?", points: 15, correctOptionId: "c",
      options: [
        { id: "a", text: "18h04, quando a Partida terminou" },
        { id: "b", text: "19h49, quando o Cavalo saiu" },
        { id: "c", text: "21h14, a última edição e o último sinal do aparelho" },
        { id: "d", text: "21h29, quando Tor chegou" },
      ],
      feedback: {
        correct: "21h14: última nota, último sinal. Tor só o encontra às 21h31.",
        wrong: "Procure a última atividade do aparelho (Notas e Localização) e compare com a hora em que Tor chegou.",
      },
    },
  ],
};
