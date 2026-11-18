import type { FinalAnswerConfig } from "../../types";
import { L } from "./helpers";

/*
 * Resposta final: 4 perguntas de múltipla escolha. As alternativas erradas usam
 * as falsas pistas do caso (Sebastião, abdução, Luis, Afonso e o golpe do
 * Azimov). A ordem das alternativas é intencionalmente variada.
 * O relatório de encerramento só aparece depois que TODAS estiverem corretas.
 */
export const finalAnswer: FinalAnswerConfig = {
  intro: L(
    "Reúna o que você encontrou nos aplicativos e responda. O relatório de encerramento só é liberado quando todas as respostas estiverem corretas.",
    "Bring together what you uncovered in the apps and answer the questions. The closing report unlocks only when every answer is correct.",
    "Reúne lo que descubriste en las aplicaciones y responde. El informe final se desbloquea cuando todas las respuestas sean correctas.",
  ),
  questions: [
    {
      id: "q-o-que-aconteceu",
      prompt: L("O que aconteceu com Dona Odete?", "What happened to Dona Odete?", "¿Qué le pasó a Dona Odete?"),
      correctOptionId: "d",
      options: [
        { id: "a", text: L("Foi assassinada por alguém com quem se encontrou", "She was murdered by someone she met", "La asesinó alguien con quien se encontró") },
        { id: "b", text: L("Foi abduzida, como sugerem os avistamentos na Estrada das Flores", "She was abducted, as the sightings on Estrada das Flores seem to suggest", "Fue abducida, como parecen indicar los avistamientos en la Estrada das Flores") },
        { id: "c", text: L("Foi enganada e levada por Afonso", "Afonso tricked her and took her away", "Afonso la engañó y se la llevó") },
        { id: "d", text: L("Desapareceu voluntariamente, por decisão própria", "She chose to disappear of her own accord", "Desapareció voluntariamente, por decisión propia") },
      ],
    },
    {
      id: "q-para-onde",
      prompt: L("Para onde Odete estava indo?", "Where was Odete headed?", "¿Adónde iba Odete?"),
      correctOptionId: "b",
      options: [
        { id: "a", text: L("Para a cidade, morar em um quartinho alugado por Sebastião", "To town, to live in a room rented by Sebastião", "Al pueblo, a vivir en un cuartito alquilado por Sebastião") },
        { id: "b", text: L("Para Bora Bora", "To Bora Bora", "A Bora Bora") },
        { id: "c", text: L("Para o Planeta Io, a convite do Príncipe Azimov", "To Planet Io, at Prince Azimov's invitation", "Al planeta Io, por invitación del príncipe Azimov") },
        { id: "d", text: L("Para o pesqueiro de Luis", "To Luis's fishing spot", "Al pesquero de Luis") },
      ],
    },
    {
      id: "q-dinheiro",
      prompt: L("O que foi feito do dinheiro de Odete?", "What happened to Odete's money?", "¿Qué pasó con el dinero de Odete?"),
      correctOptionId: "c",
      options: [
        { id: "a", text: L("Foi tomado por Sebastião, que queria o Rancho", "Sebastião took it because he wanted the ranch", "Sebastião se lo quedó porque quería el rancho") },
        { id: "b", text: L("Foi perdido no golpe do Príncipe Azimov", "It was lost in Prince Azimov's scam", "Se perdió en la estafa del príncipe Azimov") },
        { id: "c", text: L("Odete o usou para financiar seus próprios planos, incluindo ações de caridade", "Odete used it to fund her own plans, including charitable acts", "Odete lo usó para financiar sus propios planes, incluidas obras de caridad") },
        { id: "d", text: L("Foi entregue a Afonso em troca de promessas", "She gave it to Afonso in exchange for promises", "Se lo entregó a Afonso a cambio de promesas") },
      ],
    },
    {
      id: "q-culpado",
      prompt: L("Quem é o culpado pelo desaparecimento?", "Who is responsible for the disappearance?", "¿Quién es responsable de la desaparición?"),
      correctOptionId: "a",
      options: [
        { id: "a", text: L("Ninguém — não houve crime", "No one — there was no crime", "Nadie: no hubo ningún delito") },
        { id: "b", text: "Sebastião" },
        { id: "c", text: "Luis" },
        { id: "d", text: "Afonso" },
      ],
    },
  ],
  report: {
    title: L("Relatório de encerramento", "Closing report", "Informe final"),
    subtitle: L("Solução do caso — Dona Odete de Jesus · Varginha, Minas Gerais — Fevereiro de 2026", "Case solution — Dona Odete de Jesus · Varginha, Minas Gerais — February 2026", "Resolución del caso — Dona Odete de Jesus · Varginha, Minas Gerais — febrero de 2026"),
    paragraphs: [
      L("Dona Odete de Jesus, de 68 anos, foi dada como desaparecida após deixar para trás sua residência e uma série de rastros digitais aparentemente desconexos. À primeira vista, o caso reunia elementos suficientes para levantar suspeitas de crime: movimentações financeiras incomuns, contatos com homens desconhecidos, mensagens enigmáticas e referências a um passado que parecia ainda exercer influência sobre sua vida.", "Sixty-eight-year-old Dona Odete de Jesus was reported missing after leaving her home and a trail of seemingly unrelated digital clues. At first glance, there was plenty to suggest a crime: unusual financial activity, unfamiliar men in her contacts, cryptic messages, and references to a past that still seemed to shape her life.", "Dona Odete de Jesus, de 68 años, fue reportada como desaparecida tras dejar su casa y una serie de rastros digitales aparentemente inconexos. A primera vista, había motivos para sospechar de un delito: movimientos financieros inusuales, contactos con hombres desconocidos, mensajes enigmáticos y referencias a un pasado que aún parecía influir en su vida."),
      L("Entretanto, a análise dos aplicativos, das conversas e das anotações pessoais de Odete revelou que nem todas as pistas apontavam para um crime. Algumas delas mostravam algo muito mais difícil de perceber: uma mulher que, depois de décadas vivendo sob as expectativas dos outros, havia começado a organizar uma vida inteiramente diferente.", "But Odete's apps, conversations, and personal notes told another story. Not every clue pointed to a crime. Some revealed something harder to see: a woman who, after decades of living by other people's expectations, had begun to build a life of her own.", "Sin embargo, al revisar las aplicaciones, conversaciones y notas de Odete, quedó claro que no todas las pistas apuntaban a un delito. Algunas revelaban algo más difícil de ver: una mujer que, después de décadas viviendo según las expectativas ajenas, había empezado a organizar una vida muy distinta."),
      L("Uma das pistas mais importantes da investigação foi a movimentação financeira realizada pouco antes do desaparecimento. O esvaziamento da conta de Odete poderia indicar fraude, extorsão ou até mesmo uma tentativa de ocultar os recursos de um possível crime.", "One of the investigation's key clues was the movement of money shortly before Odete disappeared. Her nearly emptied account could have pointed to fraud, extortion, or an attempt to hide money connected to a crime.", "Una de las pistas más importantes fueron los movimientos de dinero poco antes de la desaparición. Que la cuenta de Odete quedara casi vacía podía sugerir fraude, extorsión o un intento de ocultar fondos vinculados a un delito."),
      L("A verdade, porém, era outra.", "The truth, however, was different.", "Pero la verdad era otra."),
      L("Odete havia decidido utilizar o dinheiro de que dispunha para financiar seus próprios planos. Parte dos recursos foi destinada a outras pessoas, e Arnaldo Castelo recebeu apoio financeiro para se apresentar como Papai Noel. O que inicialmente parecia uma movimentação suspeita fazia parte de uma sequência de decisões tomadas por Odete antes de partir.", "Odete had decided to use her money to fund her own plans. She gave some of it to others, and helped Arnaldo Castelo cover the costs of playing Santa. What looked suspicious at first was part of a series of choices Odete made before leaving.", "Odete había decidido usar su dinero para financiar sus propios planes. Destinó parte de los fondos a otras personas y ayudó a Arnaldo Castelo con los gastos de su iniciativa como Papá Noel. Lo que parecía sospechoso formaba parte de una serie de decisiones que tomó antes de partir."),
      L("Não havia evidências suficientes para concluir que ela tivesse sido roubada ou obrigada a entregar o dinheiro. Pelo contrário, os rastros deixados por ela apontavam para uma decisão deliberada de dispor dos próprios recursos.", "There was no evidence that anyone had stolen from her or forced her to hand over the money. The trail instead suggested a deliberate choice to use her own funds as she wished.", "No había pruebas suficientes de que la hubieran robado o forzado a entregar el dinero. Al contrario, los rastros apuntaban a que decidió libremente cómo usar sus propios recursos."),
      L("Os contatos encontrados nos aplicativos de Odete também pareciam fundamentais para compreender seu desaparecimento.", "The contacts in Odete's apps also seemed crucial to understanding her disappearance.", "Los contactos que aparecían en las aplicaciones de Odete también parecían clave para entender su desaparición."),
      L("Entre eles estavam Arnaldo Castelo, Luis Gois, Afonso Blauss e Mauro Filho. Cada um representava uma possibilidade diferente de relacionamento, companhia ou interesse pessoal. A presença desses homens no histórico digital da desaparecida, entretanto, não significava que algum deles fosse necessariamente responsável por seu sumiço.", "They included Arnaldo Castelo, Luis Gois, Afonso Blauss, and Mauro Filho. Each represented a different possibility for romance, companionship, or personal interest. Their presence in Odete's digital history did not, by itself, make any of them responsible for her disappearance.", "Entre ellos estaban Arnaldo Castelo, Luis Gois, Afonso Blauss y Mauro Filho. Cada uno representaba una posibilidad distinta de romance, compañía o interés personal. Que aparecieran en el historial digital de Odete no significaba que alguno fuera responsable de su desaparición."),
      L("O contato com Luis Gois, proprietário de um pesqueiro em Varginha, contribuiu para levantar suspeitas sobre um possível encontro no rancho próximo ao Rio Verde. Contudo, as informações reunidas não sustentavam a conclusão de que esse encontro tivesse ocorrido conforme se imaginava.", "Luis Gois, who owned a fishing spot in Varginha, raised suspicions about a possible meeting at the ranch near Rio Verde. But the evidence did not support the theory that the encounter happened as investigators first imagined.", "El contacto con Luis Gois, dueño de un pesquero en Varginha, generó sospechas sobre un posible encuentro en el rancho junto a Rio Verde. Sin embargo, la información reunida no demostraba que hubiera ocurrido como se pensaba."),
      L("Os relacionamentos virtuais eram uma parte importante da vida que Odete vinha construindo longe dos olhares da família. Mais do que apontar para um culpado, os registros demonstravam que ela estava explorando possibilidades que talvez nunca tivesse considerado abertamente antes.", "Online dating was part of the life Odete had been building away from her family's gaze. Rather than point to a culprit, the records showed her exploring possibilities she may never have openly considered before.", "Las relaciones virtuales formaban parte de la vida que Odete construía lejos de la mirada de su familia. Más que señalar a un culpable, los registros mostraban que exploraba posibilidades que quizá nunca antes se había permitido considerar."),
      L("A investigação também trouxe à tona a história de Firmino de Jesus, ex-marido de Odete e caminhoneiro desaparecido em 1996, posteriormente declarado morto.", "The investigation also uncovered the story of Firmino de Jesus, Odete's former husband, a truck driver who disappeared in 1996 and was later declared dead.", "La investigación también sacó a la luz la historia de Firmino de Jesus, exmarido de Odete y camionero desaparecido en 1996, posteriormente declarado muerto."),
      L("O desaparecimento de Firmino marcou profundamente o passado da família. Décadas depois, as lembranças daquele período ainda apareciam nas anotações e nos registros pessoais de Odete, conectando sua vida presente a acontecimentos que pareciam pertencer a uma história encerrada.", "Firmino's disappearance left a deep mark on the family. Decades later, memories of that time still surfaced in Odete's notes and personal records, tying her present to events that seemed long settled.", "La desaparición de Firmino marcó profundamente a la familia. Décadas después, los recuerdos de aquella época aún aparecían en las notas y registros personales de Odete, conectando su presente con hechos que parecían parte de una historia cerrada."),
      L("O passado, contudo, não oferecia uma resposta simples para o desaparecimento atual. Era necessário distinguir as memórias, os segredos antigos e as suspeitas levantadas pelos investigadores dos acontecimentos efetivamente comprovados.", "The past did not offer an easy explanation for the current disappearance. Memories, old secrets, and investigators' suspicions had to be separated from what the evidence could actually prove.", "El pasado no ofrecía una explicación sencilla para la desaparición actual. Era necesario distinguir los recuerdos, los secretos antiguos y las sospechas de los investigadores de los hechos realmente comprobados."),
      L("A história de Firmino ajudava a compreender a trajetória de Odete, mas não constituía, por si só, prova de que ele estivesse envolvido em seu desaparecimento.", "Firmino's story helped explain Odete's past, but it was not proof that he had anything to do with her disappearance.", "La historia de Firmino ayudaba a entender la vida de Odete, pero no demostraba que él estuviera involucrado en su desaparición."),
      L("A pista decisiva estava no conjunto das decisões tomadas por Odete antes de desaparecer.", "The decisive clue was the pattern of choices Odete made before she vanished.", "La pista decisiva estaba en el conjunto de decisiones que Odete tomó antes de desaparecer."),
      L("O dinheiro havia sido movimentado. Os contatos haviam sido estabelecidos. As possibilidades de uma nova vida estavam sendo exploradas. E uma passagem para Bora Bora havia sido comprada.", "Money had been moved. New connections had been made. A different life was taking shape. And a ticket to Bora Bora had been purchased.", "El dinero se había movido. Había establecido nuevos contactos. Exploraba la posibilidad de otra vida. Y había comprado un pasaje a Bora Bora."),
      L("Consideradas isoladamente, essas informações poderiam parecer apenas coincidências. Quando reunidas, entretanto, apontavam para uma conclusão consistente: Odete estava preparando sua partida.", "On their own, these facts could look like coincidences. Together, they pointed to a clear conclusion: Odete was preparing to leave.", "Por separado, estos datos podían parecer coincidencias. Juntos, apuntaban a una conclusión clara: Odete preparaba su partida."),
      L("Não se tratava de uma mulher que simplesmente havia perdido o contato com o mundo. Tratava-se de alguém que havia começado a organizar uma saída, utilizando seus recursos e tomando decisões que não dependiam da aprovação de seus familiares.", "This was not a woman who had simply lost touch with the world. She had begun planning her departure, using her own resources and making choices that did not depend on her family's approval.", "No era una mujer que simplemente hubiera perdido contacto con el mundo. Había empezado a preparar su salida, usando sus recursos y tomando decisiones que no dependían de la aprobación de su familia."),
      L("A hipótese de desaparecimento voluntário, inicialmente ofuscada pelas suspeitas de crime, passou a explicar os indícios de maneira muito mais coerente.", "The theory of a voluntary disappearance, initially overshadowed by suspicions of a crime, made far better sense of the evidence.", "La hipótesis de una desaparición voluntaria, al principio opacada por las sospechas de un delito, explicaba las pistas de forma mucho más coherente."),
      L("Dona Odete de Jesus não foi assassinada, sequestrada ou vítima de um desaparecimento acidental, conforme a hipótese que os primeiros indícios poderiam sugerir.", "Dona Odete de Jesus was not murdered, kidnapped, or the victim of an accidental disappearance, despite what the early clues seemed to suggest.", "Dona Odete de Jesus no fue asesinada, secuestrada ni víctima de una desaparición accidental, pese a lo que sugerían las primeras pistas."),
      L("A conclusão da investigação é que Odete planejou deixar Varginha e iniciar uma nova etapa de sua vida. Ela utilizou o dinheiro disponível para financiar seus planos, manteve contatos que ampliaram suas possibilidades e comprou uma passagem para Bora Bora antes de partir.", "The investigation concludes that Odete planned to leave Varginha and begin a new chapter. She used her money to fund her plans, kept in touch with people who opened up new possibilities, and bought a ticket to Bora Bora before leaving.", "La investigación concluye que Odete planeó dejar Varginha y empezar una nueva etapa. Usó el dinero disponible para financiar sus planes, mantuvo contactos que ampliaron sus posibilidades y compró un pasaje a Bora Bora antes de partir."),
      L("A aparente desordem dos rastros digitais escondia uma decisão pessoal: abandonar a rotina, afastar-se das expectativas familiares e buscar uma vida diferente.", "Beneath the apparent disorder of her digital trail was a personal decision: to leave her routine, step away from family expectations, and seek a different life.", "Tras el aparente desorden de sus rastros digitales había una decisión personal: dejar atrás la rutina, apartarse de las expectativas familiares y buscar otra vida."),
      L("O caso, portanto, não termina com a identificação de um assassino. Termina com a descoberta de que a principal suspeita talvez nunca tenha sido uma vítima de crime, mas uma mulher que decidiu desaparecer da vida que todos conheciam.", "This case does not end with the discovery of a killer. It ends with the realization that its central figure may never have been the victim of a crime, but a woman who chose to leave the life everyone knew.", "Este caso no termina con la identificación de un asesino. Termina con el descubrimiento de que la figura central quizá nunca fue víctima de un delito, sino una mujer que decidió desaparecer de la vida que todos conocían."),
      L("Caso encerrado quanto à hipótese de crime: desaparecimento voluntário.", "Case closed as a crime investigation: voluntary disappearance.", "Caso cerrado como investigación criminal: desaparición voluntaria."),
    ],
    closing: L(
      "Última observação: encontrar uma pessoa desaparecida nem sempre significa descobrir quem a levou. Às vezes, significa compreender por que ela decidiu partir.",
      "One final thought: finding a missing person doesn't always mean discovering who took them. Sometimes, it means understanding why they chose to leave.",
      "Una última reflexión: encontrar a una persona desaparecida no siempre significa descubrir quién se la llevó. A veces, significa entender por qué decidió marcharse.",
    ),
  },
};
