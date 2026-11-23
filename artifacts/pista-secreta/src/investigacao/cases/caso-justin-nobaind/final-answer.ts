import type { FinalAnswerConfig, FinalReport } from "../../types";
import { asset } from "./helpers";

/*
 * Resposta final. O roteiro (7.1) tem hoje 4 perguntas e pede para refazer a pontuação (a antiga era para 6 perguntas).
 * Nova pontuação, total 100:
 *   Q1 causa da morte aparente ........ 25 (tudo ou nada)
 *   Q2 quem ajudou .................... 20 (10 por aliado certo, -10 por erro)
 *   Q3 provas ......................... 40 (10 por prova certa, -10 por erro)
 *   Q4 por que desapareceu ............ 15 (tudo ou nada)
 * Faixas (as mesmas do roteiro): 85–100 Headliner · 60–84 Banda de Abertura · abaixo de 60 Fã de Camarim.
 * O bônus antigo (acertar os seis certos e nenhum dos quatro errados) foi removido junto com as perguntas 5 e 6.
 * A prova "van às 22h41" saiu: o post da Lilly que a sustentava foi removido do caso a pedido do autor.
 * Q2 segue o roteiro: só Bob e Stitch são aliados corretos (Mel e Tuco são apoio, não amigos de infância).
 */
const completo: FinalReport = {
  image: { src: asset("epilogo.webp"), alt: "Ensenada, 14 de maio de 1994" },
  title: "DOSSIÊ ENCERRADO",
  subtitle: "Divisão de Pessoas Desaparecidas · Evidência Nº 0594 · Headliner",
  paragraphs: [
    "Justin Nobaind não morreu de Sugar Rush. Morreu de contrato, mas só no papel. B. Bee perdeu o artista no dia 10 de maio. O Círculo de Veludo passou meses procurando um clone que não existia. Em Ensenada, um homem que não dá autógrafos toca violão num bar de beira de cais.",
    "O que aconteceu: em janeiro, B. Bee empurrou Justin para dentro do Círculo e, em abril, entregou o contrato final, com prazo em 10 de maio. Justin não quis assinar nem ser substituído. Aliou-se ao repórter Bob Redwood, que lhe apresentou o Dr. Milo Stitch e abriu o canal Coruja no Matches. Com a ajuda discreta de Mel e Tuco, montaram O Último Acorde.",
    "Na noite de 7 de maio, Justin afastou Katherine, convidou Christian para ser a testemunha honesta e deixou na mesa da piscina uma caixa lacrada, comprada de Brock. Stitch e Mel chegaram antes das 22h12. Christian o encontrou às 22h48 e ligou para o 911 às 22h53. O corpo foi para a clínica em vez do IML, e dali para a marina, onde o Marlin Azul de Tuco cruzou até Ensenada. O celular voltou para a família pela Funerária Halloway.",
    "Na tarde de 14 de maio, Dolores Nobaind abriu o bolso da jaqueta azul que Mel lhe entregara e encontrou uma fita cassete. A fita dizia:",
    "“Mãe. Se você está ouvindo isto, o enterro já aconteceu e eu estou vivo. Pode me xingar à vontade antes de me abraçar. Estou limpo, inteiro e longe de quem queria meu nome numa linha pontilhada. Não achei outro jeito de sair sem arrastar vocês. Pai, cuida dela e deixa ela ficar brava. Eu tentei avisar na lasanha. Fui covarde na hora H e fiz do meu jeito, cantando o recado em vez de falar. Toquem o Vidro Doce. Quando eu puder, mando um aceno numa música que ninguém conhece. Te amo, mãe. Mesmo. J.”",
    "No dia seguinte, uma rádio de Ensenada tocou, uma única vez, uma melodia de violão que nenhum disco de Justin Nobaind jamais registrou.",
  ],
  closing: "Nota honesta: personagens, bandas, marcas, drogas e eventos deste caso são fictícios. Qualquer semelhança com pessoas ou acontecimentos reais é coincidência. O Programa do Substituto é só um boato dentro do jogo.",
};

export const finalAnswer: FinalAnswerConfig = {
  intro: "Reúna suas evidências e responda às 4 perguntas. Cada acerto vale pontos e o resultado mostra o quanto você enxergou do que realmente aconteceu. Você pode rever e refazer as respostas.",
  report: completo,
  scoring: {
    tiers: [
      { id: "headliner", label: "Headliner", minPoints: 85, report: completo },
      {
        id: "banda-de-abertura", label: "Banda de Abertura", minPoints: 60,
        report: {
          title: "Banda de Abertura",
          subtitle: "Final parcial",
          paragraphs: ["Você descobriu que algo estava errado, mas não quem segurava a caneta. O Justin do dossiê continua em Los Angeles, num caixão cheio de areia. Releia as respostas marcadas em vermelho, volte às evidências e confira os horários. Quando achar que tem a história inteira, é só refazer."],
        },
      },
      {
        id: "fa-de-camarim", label: "Fã de Camarim", minPoints: 0,
        report: {
          title: "Fã de Camarim",
          subtitle: "Final “versão oficial”",
          paragraphs: ["Você aceitou a manchete que o Círculo escreveu: overdose, namorada, tragédia. É exatamente o que ele queria que você fizesse. Volte ao celular de Justin, marque as evidências e tente de novo."],
        },
      },
    ],
  },
  questions: [
    {
      id: "q1", prompt: "O que causou a morte aparente de Justin na noite de 7 de maio?", points: 25, correctOptionId: "d",
      options: [
        { id: "a", text: "Overdose acidental de Sugar Rush" },
        { id: "b", text: "Envenenamento por Katherine" },
        { id: "c", text: "Assassinato a mando de B. Bee e do Círculo de Veludo" },
        { id: "d", text: "Uma sedação planejada pelo próprio Justin, para encenar a morte" },
      ],
      feedback: {
        correct: "Ninguém matou Justin Nobaind. Ele só precisava que acreditassem que sim.",
        wrong: "Você acreditou na manchete. Compare a hora em que o médico chegou com a hora do 911 e abra de novo a caixa que ninguém abriu.",
      },
    },
    {
      id: "q2", prompt: "Quem ajudou Justin?", type: "multiple", points: 20,
      correctOptionIds: ["bob", "stitch"],
      partialCredit: { perCorrect: 10, penaltyPerWrong: 10 },
      options: [
        { id: "bob", text: "Bob Redwood" },
        { id: "stitch", text: "Dr. Milo Stitch" },
        { id: "christian", text: "Christian Old" },
        { id: "david", text: "David Brawl" },
        { id: "ramona", text: "Ramona Clouds" },
        { id: "alex", text: "Alex Tulip" },
      ],
      feedback: {
        correct: "Dois nomes ajudaram por amizade: o repórter que abriu o caminho e o médico que fez a sedação.",
        wrong: "Quem chorou de verdade não sabia de nada. Procure quem já estava lá antes do 911 e quem sabia do plano desde março.",
      },
    },
    {
      id: "q3", prompt: "Quais provas comprovam sua teoria?", type: "multiple", points: 40,
      correctOptionIds: ["caixa", "limpo", "medico", "corpo"],
      partialCredit: { perCorrect: 10, penaltyPerWrong: 10 },
      options: [
        { id: "caixa", text: "A caixa de Sugar Rush está lacrada" },
        { id: "limpo", text: "Justin estava limpo havia 194 dias" },
        { id: "medico", text: "O médico já estava na casa antes da chamada" },
        { id: "corpo", text: "O corpo nunca chegou ao IML" },
        { id: "kat", text: "Katherine saiu de casa às 21h10" },
        { id: "adiantamento", text: "O adiantamento de US$ 250 mil" },
        { id: "rick", text: "O post de Rick Jackson" },
        { id: "brock", text: "O pagamento de US$ 380 a Brock" },
        { id: "anonima", text: "A mensagem anônima avisando o assassinato" },
        { id: "romances", text: "Os casos românticos secretos de Justin" },
      ],
      feedback: {
        correct: "Cada uma dessas provas aparece em pelo menos dois lugares do celular, e nenhuma delas fecha com a overdose.",
        wrong: "Prova de verdade aparece em mais de um lugar do celular. Confira a caixa, os dias limpos, a hora em que o médico chegou e o caminho do corpo. O resto é barulho.",
      },
    },
    {
      id: "q4", prompt: "Por que Justin precisava morrer/desaparecer?", points: 15, correctOptionId: "d",
      options: [
        { id: "a", text: "Fugir de uma dívida com Brock" },
        { id: "b", text: "Escapar da polícia" },
        { id: "c", text: "Terminar com Katherine sem briga" },
        { id: "d", text: "Evitar assinar um contrato que tomaria o controle da sua vida" },
      ],
      feedback: {
        correct: "O contrato vencia em 10 de maio. Sem Justin, B. Bee ficou sem artista e sem disco.",
        wrong: "Olhe o prazo que B. Bee deu e o que o canal Coruja chamava de “aliança”. Quem estava preso a quê?",
      },
    },
  ],
};
