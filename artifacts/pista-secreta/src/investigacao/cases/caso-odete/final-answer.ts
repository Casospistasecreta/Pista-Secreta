import type { FinalAnswerConfig } from "../../types";

/*
 * Resposta final: 4 perguntas de múltipla escolha. As alternativas erradas usam
 * as falsas pistas do caso (Sebastião, abdução, Luis, Afonso e o golpe do
 * Azimov). A ordem das alternativas é intencionalmente variada.
 * O relatório de encerramento só aparece depois que TODAS estiverem corretas.
 */
export const finalAnswer: FinalAnswerConfig = {
  intro: "Reúna o que você encontrou nos aplicativos e responda. O relatório de encerramento só é liberado quando todas as respostas estiverem corretas.",
  questions: [
    {
      id: "q-o-que-aconteceu",
      prompt: "O que aconteceu com Dona Odete?",
      correctOptionId: "d",
      options: [
        { id: "a", text: "Foi assassinada por alguém com quem se encontrou" },
        { id: "b", text: "Foi abduzida, como sugerem os avistamentos na Estrada das Flores" },
        { id: "c", text: "Foi enganada e levada por Afonso" },
        { id: "d", text: "Desapareceu voluntariamente, por decisão própria" },
      ],
    },
    {
      id: "q-para-onde",
      prompt: "Para onde Odete estava indo?",
      correctOptionId: "b",
      options: [
        { id: "a", text: "Para a cidade, morar em um quartinho alugado por Sebastião" },
        { id: "b", text: "Para Bora Bora" },
        { id: "c", text: "Para o Planeta Io, a convite do Príncipe Azimov" },
        { id: "d", text: "Para o pesqueiro de Luis" },
      ],
    },
    {
      id: "q-dinheiro",
      prompt: "O que foi feito do dinheiro de Odete?",
      correctOptionId: "c",
      options: [
        { id: "a", text: "Foi tomado por Sebastião, que queria o Rancho" },
        { id: "b", text: "Foi perdido no golpe do Príncipe Azimov" },
        { id: "c", text: "Odete o usou para financiar seus próprios planos, incluindo ações de caridade" },
        { id: "d", text: "Foi entregue a Afonso em troca de promessas" },
      ],
    },
    {
      id: "q-culpado",
      prompt: "Quem é o culpado pelo desaparecimento?",
      correctOptionId: "a",
      options: [
        { id: "a", text: "Ninguém — não houve crime" },
        { id: "b", text: "Sebastião" },
        { id: "c", text: "Luis" },
        { id: "d", text: "Afonso" },
      ],
    },
  ],
  report: {
    title: "Relatório de encerramento",
    subtitle: "Solução do caso — Dona Odete de Jesus · Varginha, Minas Gerais — Fevereiro de 2026",
    paragraphs: [
      "Dona Odete de Jesus, de 68 anos, foi dada como desaparecida após deixar para trás sua residência e uma série de rastros digitais aparentemente desconexos. À primeira vista, o caso reunia elementos suficientes para levantar suspeitas de crime: movimentações financeiras incomuns, contatos com homens desconhecidos, mensagens enigmáticas e referências a um passado que parecia ainda exercer influência sobre sua vida.",
      "Entretanto, a análise dos aplicativos, das conversas e das anotações pessoais de Odete revelou que nem todas as pistas apontavam para um crime. Algumas delas mostravam algo muito mais difícil de perceber: uma mulher que, depois de décadas vivendo sob as expectativas dos outros, havia começado a organizar uma vida inteiramente diferente.",
      "Uma das pistas mais importantes da investigação foi a movimentação financeira realizada pouco antes do desaparecimento. O esvaziamento da conta de Odete poderia indicar fraude, extorsão ou até mesmo uma tentativa de ocultar os recursos de um possível crime.",
      "A verdade, porém, era outra.",
      "Odete havia decidido utilizar o dinheiro de que dispunha para financiar seus próprios planos. Parte dos recursos foi destinada a outras pessoas, e Arnaldo Castelo recebeu apoio financeiro para se apresentar como Papai Noel. O que inicialmente parecia uma movimentação suspeita fazia parte de uma sequência de decisões tomadas por Odete antes de partir.",
      "Não havia evidências suficientes para concluir que ela tivesse sido roubada ou obrigada a entregar o dinheiro. Pelo contrário, os rastros deixados por ela apontavam para uma decisão deliberada de dispor dos próprios recursos.",
      "Os contatos encontrados nos aplicativos de Odete também pareciam fundamentais para compreender seu desaparecimento.",
      "Entre eles estavam Arnaldo Castelo, Luis Gois, Afonso Blauss e Mauro Filho. Cada um representava uma possibilidade diferente de relacionamento, companhia ou interesse pessoal. A presença desses homens no histórico digital da desaparecida, entretanto, não significava que algum deles fosse necessariamente responsável por seu sumiço.",
      "O contato com Luis Gois, proprietário de um pesqueiro em Varginha, contribuiu para levantar suspeitas sobre um possível encontro no rancho próximo ao Rio Verde. Contudo, as informações reunidas não sustentavam a conclusão de que esse encontro tivesse ocorrido conforme se imaginava.",
      "Os relacionamentos virtuais eram uma parte importante da vida que Odete vinha construindo longe dos olhares da família. Mais do que apontar para um culpado, os registros demonstravam que ela estava explorando possibilidades que talvez nunca tivesse considerado abertamente antes.",
      "A investigação também trouxe à tona a história de Firmino de Jesus, ex-marido de Odete e caminhoneiro desaparecido em 1996, posteriormente declarado morto.",
      "O desaparecimento de Firmino marcou profundamente o passado da família. Décadas depois, as lembranças daquele período ainda apareciam nas anotações e nos registros pessoais de Odete, conectando sua vida presente a acontecimentos que pareciam pertencer a uma história encerrada.",
      "O passado, contudo, não oferecia uma resposta simples para o desaparecimento atual. Era necessário distinguir as memórias, os segredos antigos e as suspeitas levantadas pelos investigadores dos acontecimentos efetivamente comprovados.",
      "A história de Firmino ajudava a compreender a trajetória de Odete, mas não constituía, por si só, prova de que ele estivesse envolvido em seu desaparecimento.",
      "A pista decisiva estava no conjunto das decisões tomadas por Odete antes de desaparecer.",
      "O dinheiro havia sido movimentado. Os contatos haviam sido estabelecidos. As possibilidades de uma nova vida estavam sendo exploradas. E uma passagem para Bora Bora havia sido comprada.",
      "Consideradas isoladamente, essas informações poderiam parecer apenas coincidências. Quando reunidas, entretanto, apontavam para uma conclusão consistente: Odete estava preparando sua partida.",
      "Não se tratava de uma mulher que simplesmente havia perdido o contato com o mundo. Tratava-se de alguém que havia começado a organizar uma saída, utilizando seus recursos e tomando decisões que não dependiam da aprovação de seus familiares.",
      "A hipótese de desaparecimento voluntário, inicialmente ofuscada pelas suspeitas de crime, passou a explicar os indícios de maneira muito mais coerente.",
      "Dona Odete de Jesus não foi assassinada, sequestrada ou vítima de um desaparecimento acidental, conforme a hipótese que os primeiros indícios poderiam sugerir.",
      "A conclusão da investigação é que Odete planejou deixar Varginha e iniciar uma nova etapa de sua vida. Ela utilizou o dinheiro disponível para financiar seus planos, manteve contatos que ampliaram suas possibilidades e comprou uma passagem para Bora Bora antes de partir.",
      "A aparente desordem dos rastros digitais escondia uma decisão pessoal: abandonar a rotina, afastar-se das expectativas familiares e buscar uma vida diferente.",
      "O caso, portanto, não termina com a identificação de um assassino. Termina com a descoberta de que a principal suspeita talvez nunca tenha sido uma vítima de crime, mas uma mulher que decidiu desaparecer da vida que todos conheciam.",
      "Caso encerrado quanto à hipótese de crime: desaparecimento voluntário.",
    ],
    closing: "Última observação: encontrar uma pessoa desaparecida nem sempre significa descobrir quem a levou. Às vezes, significa compreender por que ela decidiu partir.",
  },
};
