import type { FinalAnswerConfig, FinalReport } from "../../types";
import { L } from "./helpers";

/*
 * Resposta final (roteiro 5.5 e 5.7): 6 perguntas de escolha única, 100 pontos.
 * Q1 10 · Q2 15 · Q3 20 · Q4 20 · Q5 20 · Q6 15.
 * Faixas: 85+ Grande Mestre (relatório completo) · 55–84 Mestre de Clube · abaixo disso Peão Envenenado.
 * Os distratores usam as falsas pistas do caso (laudo oficial, Tor, Cavalo, Rei Branco, Matches, entregador).
 * As mensagens de erro orientam sem entregar a resposta.
 */
const completo: FinalReport = {
  title: L("XEQUE-MATE — Caso encerrado", "CHECKMATE — Case closed", "JAQUE MATE — Caso cerrado"),
  subtitle: L("Delegacia Xeque · Tabuleiro · noite de 10 de Maio · Grande Mestre", "Checkmate Police · The Board · night of May 10 · Grandmaster", "Comisaría Jaque · El Tablero · noche del 10 de mayo · Gran Maestro"),
  paragraphs: [
    L("Do persa shah mat: “o rei está indefeso”. Ninguém capturou o Rei Preto. Fizeram pior: tiraram as defesas dele e esperaram que aceitasse o presente.", "From the Persian shah mat: “the king is helpless.” No one captured the Black King. They did worse: stripped away his defenses and waited for him to accept the gift.", "Del persa shah mat: “el rey está indefenso”. Nadie capturó al Rey Negro. Hicieron algo peor: le quitaron sus defensas y esperaron a que aceptara el regalo."),
    L("O Rei morreu de choque anafilático, por volta das 21h14. Comeu um cannoli de pistache enviado de presente pela Santa Diagonal, a confeitaria da igreja do Bispo Branco, que fingia estar na Sicília e era dono oculto da GAMBET. O laudo oficial dizia “parada cardíaca”: o coração parou, sim, porque a alergia não foi tratada.", "The King died of anaphylactic shock at around 9:14 p.m. He ate a pistachio cannoli sent as a gift by Santa Diagonal, the bakery run by the White Bishop's church. The Bishop claimed to be in Sicily and secretly owned GAMBET. The official report said “cardiac arrest.” His heart did stop—because his allergy went untreated.", "El Rey murió de un choque anafiláctico cerca de las 21:14. Comió un cannoli de pistacho enviado como regalo por Santa Diagonal, la pastelería de la iglesia del Obispo Blanco. El Obispo fingía estar en Sicilia y era el dueño oculto de GAMBET. El informe oficial decía “paro cardíaco”: sí, el corazón se detuvo, porque no trataron su alergia."),
    L("A caneta de adrenalina que o salvaria tinha sido retirada da gaveta às 17h12 pela Rainha Preta, afundada em dívidas de jogo, que teve a fatura de R$ 187 mil quitada pelo Bispo na véspera. “Troca justa”. Um Bispo mandou o doce. Uma Dama tirou a caneta. Dois lances contra o mesmo ponto fraco: é assim que se faz o Mate do Pastor.", "The life-saving epinephrine pen had been removed from the drawer at 5:12 p.m. by the Black Queen, buried in gambling debt. The Bishop had paid off her R$ 187,000 bill (Brazilian reais) the day before. “A fair trade.” A Bishop sent the sweet. A Queen took the pen. Two moves against the same weak spot—that's how you play Scholar's Mate.", "La pluma de adrenalina que podía salvarlo desapareció del cajón a las 17:12; la retiró la Reina Negra, hundida en deudas de juego. El Obispo había pagado su factura de R$ 187.000 (reales brasileños) el día anterior. “Un intercambio justo”. Un Obispo envió el dulce. Una Reina se llevó la pluma. Dos jugadas contra el mismo punto débil: así se ejecuta el Mate del Pastor."),
    L("O motivo era a Assembleia de segunda. O Rei levaria o dossiê que provava a fraude: partidas combinadas, apostas lavadas pela Obra da Diagonal, lances absurdos como o da Dama no 31. O Rei Branco, o Cavalo, o Tor e o Claudinho eram inocentes. O Rei sabia: nunca aceite um peão de graça. Só não imaginou que a conta chegaria em forma de cannoli.", "The motive was Monday's Assembly. The King planned to bring the dossier proving the fraud: fixed games, bets laundered through the Diagonal Mission, and absurd moves like the Queen's on move 31. The White King, the Knight, Tor, and Claudinho were innocent. The King knew never to accept a free pawn. He just didn't expect the bill to arrive as a cannoli.", "El motivo era la Asamblea del lunes. El Rey pensaba llevar el expediente que probaba el fraude: partidas amañadas, apuestas blanqueadas a través de la Obra de la Diagonal y jugadas absurdas como la de la Reina en la 31. El Rey Blanco, el Caballo, Tor y Claudinho eran inocentes. El Rey sabía que nunca debía aceptar un peón gratis. Solo que no imaginó que la cuenta llegaría en forma de cannoli."),
    L("Na manhã seguinte, a Rainha Preta se entregou à Delegacia Xeque. Leu a última nota do marido, “Eu perdoo. Só falta eu dizer”, e pediu ao Cavalo que levasse o dossiê à Assembleia.", "The next morning, the Black Queen turned herself in to the Checkmate Police. She read her husband's last note—“I forgive you. I just need to say it”—and asked the Knight to take the dossier to the Assembly.", "A la mañana siguiente, la Reina Negra se entregó en la Comisaría Jaque. Leyó la última nota de su marido: “Te perdono. Solo me falta decírtelo”, y le pidió al Caballo que llevara el expediente a la Asamblea."),
  ],
  closing: L("Reis nunca são capturados. Bispos, sim. (Nota: os eventos históricos usados nas senhas são reais; todos os personagens e fatos do caso são ficção.)", "Kings are never captured. Bishops, on the other hand… (Note: the historical events used for passcodes are real; all characters and events in this case are fictional.)", "A los reyes nunca los capturan. A los obispos, sí. (Nota: los hechos históricos usados en las claves son reales; todos los personajes y acontecimientos del caso son ficticios.)"),
};

export const finalAnswer: FinalAnswerConfig = {
  intro: L("Reúna suas evidências e responda às 6 perguntas. Cada acerto vale pontos e o resultado mostra o quanto você enxergou do tabuleiro. Você pode rever e refazer as respostas.", "Gather your evidence and answer all 6 questions. Each correct answer earns points; your result shows how much of the board you saw. You can review and change your answers.", "Reúne las pruebas y responde las 6 preguntas. Cada acierto suma puntos; el resultado muestra cuánto alcanzaste a ver del tablero. Puedes revisar y cambiar tus respuestas."),
  report: completo,
  scoring: {
    tiers: [
      { id: "grande-mestre", label: L("Grande Mestre", "Grandmaster", "Gran Maestro"), minPoints: 85, report: completo },
      {
        id: "mestre-clube", label: L("Mestre de Clube", "Club Player", "Maestro de Club"), minPoints: 55,
        report: {
          title: L("Mestre de Clube", "Club Player", "Maestro de Club"),
          subtitle: L("Final parcial", "Partial ending", "Final parcial"),
          paragraphs: [L("Você leu boa parte do tabuleiro, mas deixou uma peça de fora. Releia as respostas marcadas em vermelho, volte às evidências e confira os horários: no Tabuleiro, tudo se cruza. Quando achar que tem o mate, é só refazer.", "You read most of the board, but missed one piece. Review the answers marked in red, revisit the evidence, and check the times: on the Board, everything connects. When you think you have checkmate, try again.", "Leíste casi todo el tablero, pero te faltó una pieza. Revisa las respuestas marcadas en rojo, vuelve a las pruebas y comprueba los horarios: en el Tablero, todo se conecta. Cuando creas que tienes el jaque mate, inténtalo otra vez.")],
        },
      },
      {
        id: "peao-envenenado", label: L("Peão Envenenado", "Poisoned Pawn", "Peón Envenenado"), minPoints: 0,
        report: {
          title: L("Peão Envenenado", "Poisoned Pawn", "Peón Envenenado"),
          subtitle: L("Final “versão oficial”", "The “official story” ending", "Final de la “versión oficial”"),
          paragraphs: [L("Você aceitou o presente: a versão do laudo, a das aparências, a do doce que ninguém questionou. Nunca aceite um peão de graça. Volte ao celular do Rei, marque as evidências e tente de novo.", "You accepted the gift: the report's version, the story on the surface, the sweet nobody questioned. Never accept a free pawn. Go back to the King's phone, save the evidence, and try again.", "Aceptaste el regalo: la versión del informe, las apariencias, el dulce que nadie cuestionó. Nunca aceptes un peón gratis. Vuelve al celular del Rey, guarda las pruebas e inténtalo de nuevo.")],
        },
      },
    ],
  },
  questions: [
    {
      id: "q1", prompt: L("Como o Rei Preto morreu?", "How did the Black King die?", "¿Cómo murió el Rey Negro?"), points: 10, correctOptionId: "c",
      options: [
        { id: "a", text: L("Parada cardíaca natural, como diz o laudo", "Natural cardiac arrest, as the report says", "Paro cardíaco natural, como dice el informe") },
        { id: "b", text: L("Envenenado por uma substância mortal escondida no doce", "Poisoned by a deadly substance hidden in the sweet", "Envenenado con una sustancia mortal escondida en el dulce") },
        { id: "c", text: L("Choque anafilático, por uma alergia grave", "Anaphylactic shock from a severe allergic reaction", "Choque anafiláctico por una reacción alérgica grave") },
        { id: "d", text: L("Uma queda dentro do palácio", "A fall inside the palace", "Una caída dentro del palacio") },
      ],
      feedback: {
        correct: L("Choque anafilático. O doce, as Notas do Rei e a mensagem do Tor entregam.", "Anaphylactic shock. The sweet, the King's Notes, and Tor's message give it away.", "Choque anafiláctico. Lo revelan el dulce, las notas del Rey y el mensaje de Tor."),
        wrong: L("Releia as Notas do Rei, a foto do doce e a conversa com o Tor às 20h58. O laudo diz uma coisa; o celular diz outra.", "Revisit the King's Notes, the photo of the sweet, and Tor's 8:58 p.m. chat. The report says one thing; the phone says another.", "Relee las notas del Rey, la foto del dulce y la conversación con Tor a las 20:58. El informe dice una cosa; el celular, otra."),
        wrongByOption: { a: L("O laudo diz “parada cardíaca”, e isso é verdade, mas o coração parou por um motivo. Qual?", "The report says “cardiac arrest,” which is true—but the heart stopped for a reason. What was it?", "El informe dice “paro cardíaco”, y es cierto, pero el corazón se detuvo por un motivo. ¿Cuál?") },
      },
    },
    {
      id: "q2", prompt: L("O que impediu o Rei de se salvar?", "What kept the King from saving himself?", "¿Qué impidió que el Rey se salvara?"), points: 15, correctOptionId: "a",
      options: [
        { id: "a", text: L("A caneta de adrenalina não estava mais na gaveta", "The epinephrine pen was no longer in the drawer", "La pluma de adrenalina ya no estaba en el cajón") },
        { id: "b", text: L("Tor demorou demais para chegar", "Tor took too long to get there", "Tor tardó demasiado en llegar") },
        { id: "c", text: L("Ninguém chamou o SAMU", "No one called emergency services", "Nadie llamó a emergencias") },
        { id: "d", text: L("Ele não sabia que tinha alergia", "He didn't know he had an allergy", "No sabía que tenía una alergia") },
      ],
      feedback: {
        correct: L("Comprada em 07/05 e guardada na gaveta (foto 11h40). Às 20h57, a gaveta estava vazia.", "Bought on May 7 and kept in the drawer (photo at 11:40 a.m.). By 8:57 p.m. on May 10, the drawer was empty.", "La compró el 7 de mayo y la guardó en el cajón (foto de las 11:40). A las 20:57 del 10 de mayo, el cajón estaba vacío."),
        wrong: L("Compare as fotos de 07/05 e de 10/05 20h57, e a compra do dia 07 na Nova. Algo mudou de lugar.", "Compare the May 7 photo with the one from May 10 at 8:57 p.m., and check the May 7 purchase in Nova. Something was moved.", "Compara la foto del 7 de mayo con la del 10 de mayo a las 20:57 y revisa la compra del día 7 en Nova. Algo cambió de lugar."),
        wrongByOption: { b: L("Tor chegou tarde, mas a Localização dele mostra por quê. A pergunta é o que faltou ao Rei.", "Tor arrived late, but his Location history shows why. The question is what the King was missing.", "Tor llegó tarde, pero su ubicación explica por qué. La pregunta es qué le faltó al Rey."), d: L("Ele sabia: está nas Notas e no PIKLIKE.", "He knew—it's in the Notes and on PIKLIKE.", "Sí lo sabía: aparece en las notas y en PIKLIKE.") },
      },
    },
    {
      id: "q3", prompt: L("Quem planejou o crime?", "Who planned the crime?", "¿Quién planeó el crimen?"), points: 20, correctOptionId: "d",
      options: [
        { id: "a", text: L("Rei Branco", "White King", "Rey Blanco") },
        { id: "b", text: L("Cavalo Preto", "Black Knight", "Caballo Negro") },
        { id: "c", text: L("Peão Branco, o entregador", "White Pawn, the courier", "Peón Blanco, el repartidor") },
        { id: "d", text: L("Bispo Branco (Dom Bispo)", "White Bishop (Bishop Dom)", "Obispo Blanco (Don Obispo)") },
      ],
      feedback: {
        correct: L("Santa Diagonal é a confeitaria do Bispo, que sabia da alergia e mentiu sobre onde estava.", "Santa Diagonal is the Bishop's bakery. He knew about the allergy and lied about where he was.", "Santa Diagonal es la pastelería del Obispo. Él conocía la alergia y mintió sobre dónde estaba."),
        wrong: L("Siga o pedido do Xeque-Food: de quem é a confeitaria? Quem comentou no PIKLIKE que sabia da alergia? E quem estava “agora mesmo” na praia?", "Trace the Xeque-Food order: who owns the bakery? Who commented on PIKLIKE that he knew about the allergy? And who claimed to be at the beach “right now”?", "Sigue el pedido de Xeque-Food: ¿de quién es la pastelería? ¿Quién comentó en PIKLIKE que conocía la alergia? ¿Y quién decía estar “ahora mismo” en la playa?"),
        wrongByOption: {
          a: L("O Rei Branco estava no show ROQUE às 21h02. Veja o post da Torre Branca.", "The White King was at the CASTLE ROCK show at 9:02 p.m. Check the White Rook's post.", "El Rey Blanco estaba en el concierto ROCK-ENROQUE a las 21:02. Mira la publicación de la Torre Blanca."),
          b: L("O Cavalo saiu do palácio às 19h49, antes do pedido existir, e já tinha o dossiê.", "The Knight left the palace at 7:49 p.m., before the order was placed, and already had the dossier.", "El Caballo salió del palacio a las 19:49, antes de que se hiciera el pedido, y ya tenía el expediente."),
          c: L("O entregador só entregou. Quem pagou o pedido e assinou como “admirador”?", "The courier only made the delivery. Who paid and signed as “an admirer”?", "El repartidor solo entregó el pedido. ¿Quién lo pagó y firmó como “un admirador”?"),
        },
      },
    },
    {
      id: "q4", prompt: L("Quem mexeu na gaveta?", "Who tampered with the drawer?", "¿Quién manipuló el cajón?"), points: 20, correctOptionId: "b",
      options: [
        { id: "a", text: L("Tor (Torre Preta)", "Tor (Black Rook)", "Tor (Torre Negra)") },
        { id: "b", text: L("Rainha Preta (Dama)", "Black Queen", "Reina Negra") },
        { id: "c", text: L("Claudinho, o porteiro", "Claudinho, the doorman", "Claudinho, el portero") },
        { id: "d", text: L("Torre Branca", "White Rook", "Torre Blanca") },
      ],
      feedback: {
        correct: L("A Portaria registra a Dama no palácio às 17h12. Ela negou ter ido e teve a fatura paga na véspera.", "The gate log places the Queen at the palace at 5:12 p.m. She denied being there, and her bill was paid the day before.", "El registro de entrada sitúa a la Reina en el palacio a las 17:12. Ella negó haber ido y alguien pagó su factura el día anterior."),
        wrong: L("Quem entrou no palácio enquanto o Rei estava na Arena? Compare a Portaria com o que cada pessoa disse e com quem tinha motivo para aceitar um favor.", "Who entered the palace while the King was at the Arena? Compare the gate log with everyone's statements—and ask who had a reason to accept a favor.", "¿Quién entró al palacio mientras el Rey estaba en la Arena? Compara el registro de entrada con lo que dijo cada persona y piensa quién tenía motivos para aceptar un favor."),
        wrongByOption: { a: L("Tor só chegou às 21h29 e a localização dele prova o trânsito.", "Tor didn't arrive until 9:29 p.m. His location history confirms he was stuck in traffic.", "Tor no llegó hasta las 21:29; su ubicación confirma que estaba atrapado en el tráfico."), c: L("Claudinho só recebeu o pacote às 20h36.", "Claudinho only received the package at 8:36 p.m.", "Claudinho solo recibió el paquete a las 20:36."), d: L("A Torre Branca estava no show, longe dali.", "The White Rook was at the show, nowhere near the palace.", "La Torre Blanca estaba en el concierto, muy lejos de allí.") },
      },
    },
    {
      id: "q5", prompt: L("Por que o Rei foi silenciado?", "Why was the King silenced?", "¿Por qué silenciaron al Rey?"), points: 20, correctOptionId: "c",
      options: [
        { id: "a", text: L("Disputa pela herança do palácio", "A dispute over who would inherit the palace", "Una disputa por la herencia del palacio") },
        { id: "b", text: L("Ciúme da Dama por causa do Matches", "The Queen's jealousy over MATCHES", "Los celos de la Reina por MATCHES") },
        { id: "c", text: L("Ele ia denunciar, na Assembleia, a fraude da Gambet e das Partidas combinadas", "He planned to expose GAMBET's fraud and the fixed games at the Assembly", "Iba a denunciar en la Asamblea el fraude de GAMBET y las partidas amañadas") },
        { id: "d", text: L("Vingança do Rei Branco por causa da Oposição", "The White King's revenge over the Opposition", "La venganza del Rey Blanco por la oposición") },
      ],
      feedback: {
        correct: L("O dossiê, o lance 31 e o aviso do Rei Branco montam o motivo.", "The dossier, move 31, and the White King's warning reveal the motive.", "El expediente, la jugada 31 y la advertencia del Rey Blanco revelan el motivo."),
        wrong: L("O Rei tinha uma Assembleia marcada. O que ele pretendia levar? Abra a nota trancada (ou o desafio do TabuLive) e leia o Cavalo.", "The King had an Assembly coming up. What was he planning to bring? Open the locked note—or solve the TabuLive puzzle—and read the Knight's messages.", "El Rey tenía una Asamblea pendiente. ¿Qué pensaba llevar? Abre la nota bloqueada —o resuelve el desafío de TabuLive— y lee los mensajes del Caballo."),
        wrongByOption: { b: L("O Matches é distração: a Dama Branca é um robô e o Rei só olhava.", "MATCHES is a distraction: the White Queen is a bot, and the King was only browsing.", "MATCHES es una distracción: la Dama Blanca es un bot y el Rey solo miraba.") },
      },
    },
    {
      id: "q6", prompt: L("Por volta de que horas o Rei morreu?", "About what time did the King die?", "¿A qué hora murió el Rey, aproximadamente?"), points: 15, correctOptionId: "c",
      options: [
        { id: "a", text: L("18h04, quando a Partida terminou", "6:04 p.m., when the game ended", "18:04, cuando terminó la partida") },
        { id: "b", text: L("19h49, quando o Cavalo saiu", "7:49 p.m., when the Knight left", "19:49, cuando se fue el Caballo") },
        { id: "c", text: L("21h14, a última edição e o último sinal do aparelho", "9:14 p.m., the last edit and the device's final signal", "21:14, la última edición y la última señal del dispositivo") },
        { id: "d", text: L("21h29, quando Tor chegou", "9:29 p.m., when Tor arrived", "21:29, cuando llegó Tor") },
      ],
      feedback: {
        correct: L("21h14: última nota, último sinal. Tor só o encontra às 21h31.", "9:14 p.m.: the final note and the device's last signal. Tor doesn't find him until 9:31 p.m.", "21:14: la última nota y la última señal del dispositivo. Tor no lo encuentra hasta las 21:31."),
        wrong: L("Procure a última atividade do aparelho (Notas e Localização) e compare com a hora em que Tor chegou.", "Find the device's last activity in Notes and Location, then compare it with Tor's arrival time.", "Busca la última actividad del dispositivo en Notas y Ubicación y compárala con la hora a la que llegó Tor."),
      },
    },
  ],
};
