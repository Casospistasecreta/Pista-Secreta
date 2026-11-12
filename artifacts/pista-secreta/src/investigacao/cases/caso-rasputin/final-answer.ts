import type { FinalAnswerConfig, FinalReport } from "../../types";

/*
 * Formulário final (roteiro seção 8) e epílogo (seção 10).
 * Pontuação: Q1 10 · Q2 15 · Q3 20 · Q4 25 · Q5 15 · Q6 15 · Bônus 10 (máximo 110).
 * Faixas: 100+ Investigador Imperial · 70–99 Detetive da Okhrana · abaixo de 70 Cúmplice do Esquecimento.
 * Q6 e o bônus valem só se a seleção estiver exatamente certa. O bônus pede os 7 nomes listados (todos inocentes).
 * Nos textos de erro, "Piklike" do roteiro foi trocado por "PicLike", o nome do aplicativo na plataforma.
 */
const completo: FinalReport = {
  title: "Dossiê encerrado — Departamento de Polícia de Petrogrado",
  subtitle: "Investigador Imperial · final completo",
  paragraphs: [
    "Na madrugada de 17 de dezembro de 1916, Grigori Rasputin foi atraído a um palácio por uma princesa que nunca esteve lá. Comeu, bebeu e sobreviveu ao veneno. Foi baleado, espancado, dado como morto, e ainda assim arrastou-se até o pátio. O tiro que o matou, na testa, partiu de uma arma que os confessos assassinos não carregavam.",
    "Foi atirado no Malaya Nevka e achado dois dias depois. A Imperatriz mandou enterrá-lo em Tsarskoye Selo. O Imperador retornou do front e puniu os culpados nobres com exílio, sem julgamento: Felix foi enviado a uma propriedade distante, e Dmitri, ao front da Pérsia.",
    "A nota que Rasputin escreveu a Papa e Mama dizia que, se sangue de príncipe o matasse, ninguém da família sobreviveria a dois anos. Em março de 1917 a monarquia caiu e o corpo foi exumado e queimado. Em julho de 1918, a família imperial inteira foi executada.",
  ],
  closing:
    "Nota honesta: a participação de Oswald Rayner no tiro final é uma hipótese real, difundida por livros e documentários, mas contestada por muitos historiadores. As mensagens, os perfis e o Gravador do celular são ficção construída a partir de fatos históricos.",
};

export const finalAnswer: FinalAnswerConfig = {
  intro: "Reúna suas evidências e responda às perguntas do dossiê. Algumas aceitam mais de uma alternativa; há também uma pergunta bônus.",
  report: completo,
  scoring: {
    tiers: [
      { id: "imperial", label: "Investigador Imperial", minPoints: 100, report: completo },
      {
        id: "okhrana",
        label: "Detetive da Okhrana",
        minPoints: 70,
        report: {
          title: "Detetive da Okhrana",
          subtitle: "Final parcial",
          paragraphs: ["Você achou os culpados que o povo conhecia. O verdadeiro tiro permaneceu na escuridão."],
        },
      },
      {
        id: "esquecimento",
        label: "Cúmplice do Esquecimento",
        minPoints: 0,
        report: {
          title: "Cúmplice do Esquecimento",
          subtitle: "Final “versão oficial”",
          paragraphs: ["Você aceitou a versão que Felix e Purishkevich queriam que você aceitasse. O mundo aceitou também, por muitas décadas."],
        },
      },
    ],
  },
  questions: [
    {
      id: "q1",
      prompt: "Onde Rasputin foi atraído e morto?",
      points: 10,
      correctOptionId: "c",
      options: [
        { id: "a", text: "Gorokhovaya, 64" },
        { id: "b", text: "Casa de Anya, em Tsarskoye Selo" },
        { id: "c", text: "Palácio Yusupov, Moika, 94" },
        { id: "d", text: "Ponte Petrovsky" },
      ],
    },
    {
      id: "q2",
      prompt: "Quem montou a armadilha e como atraiu Rasputin?",
      points: 15,
      correctOptionId: "b",
      options: [
        { id: "a", text: "Protopopov, usando a polícia" },
        { id: "b", text: "Felix Yusupov, usando um perfil falso de “Irina”, que estava na Crimeia" },
        { id: "c", text: "Khvostov, por vingança" },
        { id: "d", text: "Iliodor, pela Igreja" },
      ],
    },
    {
      id: "q3",
      prompt: "Qual foi a causa real da morte?",
      points: 20,
      correctOptionId: "d",
      options: [
        { id: "a", text: "Cianeto nos bolos" },
        { id: "b", text: "Afogamento no Malaya Nevka" },
        { id: "c", text: "Facada" },
        { id: "d", text: "Tiro na testa à queima-roupa; o veneno falhou e ele já estava morto quando foi jogado no rio" },
      ],
      feedback: {
        wrongByOption: {
          a: "O laudo diz outra coisa. Volte às Notas e ao PicLike de 20 de dezembro.",
          b: "O laudo diz outra coisa. Volte às Notas e ao PicLike de 20 de dezembro.",
        },
      },
    },
    {
      id: "q4",
      prompt: "Quem deu o tiro fatal?",
      points: 25,
      correctOptionId: "e",
      options: [
        { id: "a", text: "Felix Yusupov" },
        { id: "b", text: "Vladimir Purishkevich" },
        { id: "c", text: "Dmitri Pavlovich" },
        { id: "d", text: "Dr. Lazovert" },
        { id: "e", text: "Oswald Rayner (amigo de Felix, Embaixada Britânica)" },
        { id: "f", text: "Aleksei Khvostov" },
      ],
      feedback: {
        correct: "O tiro que realmente matou Rasputin não saiu das armas de seus anfitriões.",
        wrongByOption: {
          a: "Você acreditou na versão oficial. Ouça o Gravador de novo: o último disparo não soa como os outros.",
          b: "Você acreditou na versão oficial. Ouça o Gravador de novo: o último disparo não soa como os outros.",
        },
      },
    },
    {
      id: "q5",
      prompt: "Qual foi o motivo central?",
      points: 15,
      correctOptionId: "d",
      options: [
        { id: "a", text: "Dinheiro" },
        { id: "b", text: "Ciúmes pessoais" },
        { id: "c", text: "Vingança por demissão" },
        { id: "d", text: "Política: tirar do jogo o homem que influenciava os Romanov e impedir uma paz separada com a Alemanha" },
      ],
    },
    {
      id: "q6",
      prompt: "Quem participou da emboscada além do atirador?",
      type: "multiple",
      points: 15,
      correctOptionIds: ["a", "b", "c", "d", "e"],
      options: [
        { id: "a", text: "Felix Yusupov" },
        { id: "b", text: "Dmitri Pavlovich" },
        { id: "c", text: "Vladimir Purishkevich" },
        { id: "d", text: "Dr. Lazovert" },
        { id: "e", text: "Tenente Sukhotin" },
        { id: "f", text: "Protopopov" },
        { id: "g", text: "Khvostov" },
        { id: "h", text: "Simanovich" },
      ],
    },
    {
      id: "bonus",
      prompt: "Bônus (opcional): descarte. Marque quem NÃO participou.",
      type: "multiple",
      bonus: true,
      points: 10,
      correctOptionIds: ["irina", "khvostov", "guseva", "iliodor", "protopopov", "simanovich", "lidia"],
      options: [
        { id: "irina", text: "Irina" },
        { id: "khvostov", text: "Khvostov" },
        { id: "guseva", text: "Guseva" },
        { id: "iliodor", text: "Iliodor" },
        { id: "protopopov", text: "Protopopov" },
        { id: "simanovich", text: "Simanovich" },
        { id: "lidia", text: "Lídia" },
      ],
    },
  ],
};
