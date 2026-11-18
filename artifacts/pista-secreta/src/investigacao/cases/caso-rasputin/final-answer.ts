import type { FinalAnswerConfig, FinalReport } from "../../types";
import { L } from "./helpers";

/*
 * Formulário final (roteiro seção 8) e epílogo (seção 10).
 * Pontuação: Q1 10 · Q2 15 · Q3 20 · Q4 25 · Q5 15 · Q6 15 · Bônus 10 (máximo 110).
 * Faixas: 100+ Investigador Imperial · 70–99 Detetive da Okhrana · abaixo de 70 Cúmplice do Esquecimento.
 * Q6 e o bônus valem só se a seleção estiver exatamente certa. O bônus pede os 7 nomes listados (todos inocentes).
 * Nos textos de erro, "Piklike" do roteiro foi trocado por "PicLike", o nome do aplicativo na plataforma.
 */
const completo: FinalReport = {
  title: L("Dossiê encerrado — Departamento de Polícia de Petrogrado", "Case closed — Petrograd Police Department", "Expediente cerrado — Departamento de Policía de Petrogrado"),
  subtitle: L("Investigador Imperial · final completo", "Imperial Investigator · full ending", "Investigador Imperial · desenlace completo"),
  paragraphs: [
    L("Na madrugada de 17 de dezembro de 1916, Grigori Rasputin foi atraído a um palácio por uma princesa que nunca esteve lá. Comeu, bebeu e sobreviveu ao veneno. Foi baleado, espancado, dado como morto, e ainda assim arrastou-se até o pátio. O tiro que o matou, na testa, partiu de uma arma que os confessos assassinos não carregavam.", "In the early hours of December 17, 1916, Grigori Rasputin was lured to a palace by a princess who was never there. He ate, drank, and survived the poison. He was shot, beaten, and left for dead—yet still dragged himself into the courtyard. The fatal shot to his forehead came from a weapon the confessed killers did not carry.", "En la madrugada del 17 de diciembre de 1916, una princesa que nunca estuvo allí atrajo a Grigori Rasputin a un palacio. Comió, bebió y sobrevivió al veneno. Le dispararon, lo golpearon y lo dieron por muerto; aun así, se arrastró hasta el patio. El disparo que lo mató, en la frente, salió de un arma que los asesinos confesos no llevaban."),
    L("Foi atirado no Malaya Nevka e achado dois dias depois. A Imperatriz mandou enterrá-lo em Tsarskoye Selo. O Imperador retornou do front e puniu os culpados nobres com exílio, sem julgamento: Felix foi enviado a uma propriedade distante, e Dmitri, ao front da Pérsia.", "His body was thrown into the Malaya Nevka and found two days later. The Empress ordered his burial at Tsarskoye Selo. The Emperor returned from the front and punished the noble conspirators with exile, without a trial: Felix was sent to a distant estate, and Dmitri to the Persian front.", "Arrojaron su cuerpo al Malaya Nevka y lo encontraron dos días después. La Emperatriz ordenó enterrarlo en Tsarskoye Selo. El Emperador regresó del frente y castigó a los nobles culpables con el exilio, sin juicio: Felix fue enviado a una finca lejana y Dmitri, al frente de Persia."),
    L("A nota que Rasputin escreveu a Papa e Mama dizia que, se sangue de príncipe o matasse, ninguém da família sobreviveria a dois anos. Em março de 1917 a monarquia caiu e o corpo foi exumado e queimado. Em julho de 1918, a família imperial inteira foi executada.", "The note Rasputin wrote to Papa and Mama warned that if a prince's blood killed him, no one in their family would survive two years. The monarchy fell in March 1917, and his body was exhumed and burned. In July 1918, the entire imperial family was executed.", "La nota que Rasputin escribió a Papá y Mamá advertía que, si lo mataba sangre de príncipe, nadie de su familia sobreviviría dos años. La monarquía cayó en marzo de 1917 y su cuerpo fue exhumado y quemado. En julio de 1918, ejecutaron a toda la familia imperial."),
  ],
  closing:
    L("Nota honesta: a participação de Oswald Rayner no tiro final é uma hipótese real, difundida por livros e documentários, mas contestada por muitos historiadores. As mensagens, os perfis e o Gravador do celular são ficção construída a partir de fatos históricos.", "A note on the record: Oswald Rayner's role in the final shot is a genuine theory, repeated in books and documentaries, but disputed by many historians. The phone's messages, profiles, and Recorder app are fictional, built around historical events.", "Nota aclaratoria: la participación de Oswald Rayner en el disparo final es una hipótesis real, difundida en libros y documentales, pero cuestionada por muchos historiadores. Los mensajes, perfiles y la Grabadora del teléfono son ficción basada en hechos históricos."),
};

export const finalAnswer: FinalAnswerConfig = {
  intro: L("Reúna suas evidências e responda às perguntas do dossiê. Algumas aceitam mais de uma alternativa; há também uma pergunta bônus.", "Gather your evidence and answer the questions in the case file. Some allow multiple selections; there's also a bonus question.", "Reúne las pruebas y responde las preguntas del expediente. Algunas admiten más de una opción; también hay una pregunta extra."),
  report: completo,
  scoring: {
    tiers: [
      { id: "imperial", label: L("Investigador Imperial", "Imperial Investigator", "Investigador Imperial"), minPoints: 100, report: completo },
      {
        id: "okhrana",
        label: L("Detetive da Okhrana", "Okhrana Detective", "Detective de la Okhrana"),
        minPoints: 70,
        report: {
          title: L("Detetive da Okhrana", "Okhrana Detective", "Detective de la Okhrana"),
          subtitle: L("Final parcial", "Partial ending", "Desenlace parcial"),
          paragraphs: [L("Você achou os culpados que o povo conhecia. O verdadeiro tiro permaneceu na escuridão.", "You found the culprits everyone knew about. The real shot remained in the dark.", "Encontraste a los culpables conocidos por todos. El disparo verdadero quedó en la oscuridad.")],
        },
      },
      {
        id: "esquecimento",
        label: L("Cúmplice do Esquecimento", "Accomplice to Oblivion", "Cómplice del Olvido"),
        minPoints: 0,
        report: {
          title: L("Cúmplice do Esquecimento", "Accomplice to Oblivion", "Cómplice del Olvido"),
          subtitle: L("Final “versão oficial”", "The “official version” ending", "Desenlace de la «versión oficial»"),
          paragraphs: [L("Você aceitou a versão que Felix e Purishkevich queriam que você aceitasse. O mundo aceitou também, por muitas décadas.", "You accepted the story Felix and Purishkevich wanted you to believe. The world did too, for decades.", "Aceptaste la versión que Felix y Purishkevich querían que creyeras. El mundo también la aceptó durante décadas.")],
        },
      },
    ],
  },
  questions: [
    {
      id: "q1",
      prompt: L("Onde Rasputin foi atraído e morto?", "Where was Rasputin lured and killed?", "¿Dónde atrajeron y mataron a Rasputin?"),
      points: 10,
      correctOptionId: "c",
      options: [
        { id: "a", text: "Gorokhovaya, 64" },
        { id: "b", text: L("Casa de Anya, em Tsarskoye Selo", "Anya's house in Tsarskoye Selo", "Casa de Anya, en Tsarskoye Selo") },
        { id: "c", text: L("Palácio Yusupov, Moika, 94", "Yusupov Palace, Moika 94", "Palacio Yusupov, Moika 94") },
        { id: "d", text: L("Ponte Petrovsky", "Petrovsky Bridge", "Puente Petrovsky") },
      ],
    },
    {
      id: "q2",
      prompt: L("Quem montou a armadilha e como atraiu Rasputin?", "Who set the trap, and how did he lure Rasputin?", "¿Quién preparó la trampa y cómo atrajo a Rasputin?"),
      points: 15,
      correctOptionId: "b",
      options: [
        { id: "a", text: L("Protopopov, usando a polícia", "Protopopov, using the police", "Protopopov, usando a la policía") },
        { id: "b", text: L("Felix Yusupov, usando um perfil falso de “Irina”, que estava na Crimeia", "Felix Yusupov, using a fake “Irina” profile while she was in Crimea", "Felix Yusupov, con un perfil falso de «Irina» mientras ella estaba en Crimea") },
        { id: "c", text: L("Khvostov, por vingança", "Khvostov, for revenge", "Khvostov, por venganza") },
        { id: "d", text: L("Iliodor, pela Igreja", "Iliodor, on behalf of the Church", "Iliodor, por la Iglesia") },
      ],
    },
    {
      id: "q3",
      prompt: L("Qual foi a causa real da morte?", "What was the actual cause of death?", "¿Cuál fue la verdadera causa de la muerte?"),
      points: 20,
      correctOptionId: "d",
      options: [
        { id: "a", text: L("Cianeto nos bolos", "Cyanide in the pastries", "Cianuro en los pasteles") },
        { id: "b", text: L("Afogamento no Malaya Nevka", "Drowning in the Malaya Nevka", "Ahogamiento en el Malaya Nevka") },
        { id: "c", text: L("Facada", "Stab wound", "Herida de arma blanca") },
        { id: "d", text: L("Tiro na testa à queima-roupa; o veneno falhou e ele já estava morto quando foi jogado no rio", "A point-blank shot to the forehead; the poison failed, and he was already dead when thrown into the river", "Un disparo a quemarropa en la frente; el veneno falló y ya estaba muerto cuando lo arrojaron al río") },
      ],
      feedback: {
        wrongByOption: {
          a: L("O laudo diz outra coisa. Volte às Notas e ao PicLike de 20 de dezembro.", "The autopsy says otherwise. Go back to Notes and PicLike on December 20.", "El informe forense dice otra cosa. Vuelve a Notas y a PicLike del 20 de diciembre."),
          b: L("O laudo diz outra coisa. Volte às Notas e ao PicLike de 20 de dezembro.", "The autopsy says otherwise. Go back to Notes and PicLike on December 20.", "El informe forense dice otra cosa. Vuelve a Notas y a PicLike del 20 de diciembre."),
        },
      },
    },
    {
      id: "q4",
      prompt: L("Quem deu o tiro fatal?", "Who fired the fatal shot?", "¿Quién disparó el tiro mortal?"),
      points: 25,
      correctOptionId: "e",
      options: [
        { id: "a", text: "Felix Yusupov" },
        { id: "b", text: "Vladimir Purishkevich" },
        { id: "c", text: "Dmitri Pavlovich" },
        { id: "d", text: "Dr. Lazovert" },
        { id: "e", text: L("Oswald Rayner (amigo de Felix, Embaixada Britânica)", "Oswald Rayner (Felix's friend, British Embassy)", "Oswald Rayner (amigo de Felix, Embajada Británica)") },
        { id: "f", text: "Aleksei Khvostov" },
      ],
      feedback: {
        correct: L("O tiro que realmente matou Rasputin não saiu das armas de seus anfitriões.", "The shot that truly killed Rasputin did not come from his hosts' weapons.", "El disparo que realmente mató a Rasputin no salió de las armas de sus anfitriones."),
        wrongByOption: {
          a: L("Você acreditou na versão oficial. Ouça o Gravador de novo: o último disparo não soa como os outros.", "You believed the official story. Listen to the Recorder again: the final shot doesn't sound like the others.", "Creíste la versión oficial. Escucha otra vez la Grabadora: el último disparo no suena como los demás."),
          b: L("Você acreditou na versão oficial. Ouça o Gravador de novo: o último disparo não soa como os outros.", "You believed the official story. Listen to the Recorder again: the final shot doesn't sound like the others.", "Creíste la versión oficial. Escucha otra vez la Grabadora: el último disparo no suena como los demás."),
        },
      },
    },
    {
      id: "q5",
      prompt: L("Qual foi o motivo central?", "What was the main motive?", "¿Cuál fue el motivo principal?"),
      points: 15,
      correctOptionId: "d",
      options: [
        { id: "a", text: L("Dinheiro", "Money", "Dinero") },
        { id: "b", text: L("Ciúmes pessoais", "Personal jealousy", "Celos personales") },
        { id: "c", text: L("Vingança por demissão", "Revenge for being dismissed", "Venganza por un despido") },
        { id: "d", text: L("Política: tirar do jogo o homem que influenciava os Romanov e impedir uma paz separada com a Alemanha", "Politics: remove the man influencing the Romanovs and prevent a separate peace with Germany", "Política: apartar al hombre que influía en los Romanov e impedir una paz separada con Alemania") },
      ],
    },
    {
      id: "q6",
      prompt: L("Quem participou da emboscada além do atirador?", "Who took part in the ambush besides the shooter?", "¿Quién participó en la emboscada además del tirador?"),
      type: "multiple",
      points: 15,
      correctOptionIds: ["a", "b", "c", "d", "e"],
      options: [
        { id: "a", text: "Felix Yusupov" },
        { id: "b", text: "Dmitri Pavlovich" },
        { id: "c", text: "Vladimir Purishkevich" },
        { id: "d", text: "Dr. Lazovert" },
        { id: "e", text: L("Tenente Sukhotin", "Lieutenant Sukhotin", "Teniente Sukhotin") },
        { id: "f", text: "Protopopov" },
        { id: "g", text: "Khvostov" },
        { id: "h", text: "Simanovich" },
      ],
    },
    {
      id: "bonus",
      prompt: L("Bônus (opcional): descarte. Marque quem NÃO participou.", "Bonus (optional): elimination round. Select everyone who did NOT take part.", "Extra (opcional): descarte. Marca a quienes NO participaron."),
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
        { id: "lidia", text: L("Lídia", "Lídia", "Lídia") },
      ],
    },
  ],
};
