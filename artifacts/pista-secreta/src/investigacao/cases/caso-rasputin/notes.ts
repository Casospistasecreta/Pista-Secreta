import type { Note } from "../../types";
import { asset, calendar, L } from "./helpers";

/*
 * Notas (roteiro 5.7) + Agenda (5.8) + Gravador (5.9), estes dois como notas fixadas (plano B previsto no roteiro).
 * Ajuste autorizado: na Agenda, a chegada de Papa passou de 19 Dez (segunda) para 20 Dez (terça), como dizem as
 * mensagens de Papai e Mamãe ("na terça").
 *
 * GRAVADOR: o áudio real (public/investigacao/caso-rasputin/audio/gravacao-0001.mp3) substitui a transcrição em texto do
 * roteiro. O MP3 é um trecho editado de uma gravação mais longa; para trocar o áudio basta substituir esse arquivo
 * mantendo o nome.
 */
const GRAVACAO_AUDIO_SRC = asset("audio/gravacao-0001.mp3");

export const notes: Note[] = [
  {
    id: "n-gravacao-0001",
    title: L("Gravação 0001", "Recording 0001", "Grabación 0001"),
    at: calendar("17 DEZ · 02:31"),
    preview: L("Trecho de uma gravação mais longa, iniciada por engano.", "Excerpt from a longer recording, started by accident.", "Fragmento de una grabación más larga, iniciada por accidente."),
    body: [L("Trecho editado de uma gravação mais longa, iniciada por engano (botão lateral).", "Edited excerpt from a longer recording, started by accident (side button).", "Fragmento editado de una grabación más larga, iniciada por accidente (botón lateral).")],
    pinned: true,
    audio: { src: GRAVACAO_AUDIO_SRC, label: L("Trecho editado · Gravação 0001", "Edited excerpt · Recording 0001", "Fragmento editado · Grabación 0001") },
  },
  {
    id: "n-agenda",
    title: L("Agenda", "Calendar", "Agenda"),
    at: calendar("16 DEZ"),
    preview: L("22 Nov · 11h00 — Ministério do Interior (Protopopov)", "Nov 22 · 11:00 — Ministry of Internal Affairs (Protopopov)", "22 nov · 11:00 — Ministerio del Interior (Protopopov)"),
    body: [
      L("22 Nov · 11h00 — Ministério do Interior (Protopopov)\n03 Dez · 18h00 — Chá · Palácio Yusupov (Felix)\n08 Dez · 17h00 — Chá · Palácio Yusupov (Felix)\n12 Dez · 14h00 — Casas de Banho Públicas\n15 Dez · 13h30 — Tsarskoye Selo (Imperatriz e Pequeno)\n17 Dez · 00h30 — Moika, 94 — Princesa Irina (via Felix)\n17 Dez · 11h00 — Chá com Anya\n20 Dez — Chegada de Papa\n07 Jan — Trem para Pokrovskoye\n21 Jan — Aniversário (Grigori, 48 anos)", "Nov 22 · 11:00 — Ministry of Internal Affairs (Protopopov)\nDec 3 · 18:00 — Tea · Yusupov Palace (Felix)\nDec 8 · 17:00 — Tea · Yusupov Palace (Felix)\nDec 12 · 14:00 — Public Baths\nDec 15 · 13:30 — Tsarskoye Selo (the Empress and the Little One)\nDec 17 · 00:30 — Moika 94 — Princess Irina (via Felix)\nDec 17 · 11:00 — Tea with Anya\nDec 20 — Papa arrives\nJan 7 — Train to Pokrovskoye\nJan 21 — Birthday (Grigori turns 48)", "22 nov · 11:00 — Ministerio del Interior (Protopopov)\n3 dic · 18:00 — Té · Palacio Yusupov (Felix)\n8 dic · 17:00 — Té · Palacio Yusupov (Felix)\n12 dic · 14:00 — Baños Públicos\n15 dic · 13:30 — Tsarskoye Selo (la Emperatriz y el Pequeño)\n17 dic · 00:30 — Moika 94 — Princesa Irina (por medio de Felix)\n17 dic · 11:00 — Té con Anya\n20 dic — Llega Papá\n7 ene — Tren a Pokrovskoye\n21 ene — Cumpleaños (Grigori cumple 48)"),
    ],
    pinned: true,
  },
  {
    id: "n-sonho",
    title: L("Sonho", "Dream", "Sueño"),
    at: calendar("12 DEZ"),
    body: [
      L("Sonhei com uma ponte de pedra e uma água preta que cantava meu nome. Tinha sinos, mas ninguém tocava. Acordei com gosto de amêndoa na boca. A Praska diria que é sinal. Eu digo que é fome.", "I dreamed of a stone bridge and black water singing my name. There were bells, but no one was ringing them. I woke with the taste of almonds in my mouth. Praska would call it an omen. I say it was hunger.", "Soñé con un puente de piedra y un agua negra que cantaba mi nombre. Había campanas, pero nadie las tocaba. Desperté con sabor a almendras en la boca. Praska diría que es una señal. Yo digo que era hambre."),
    ],
    preview: L("Sonhei com uma ponte de pedra e uma água preta que cantava meu nome. Tinha sinos, mas ninguém tocava. Acordei com gosto de amêndoa na boca. A Praska diria que é sinal. Eu digo que é fome.", "I dreamed of a stone bridge and black water singing my name. There were bells, but no one was ringing them. I woke with the taste of almonds in my mouth. Praska would call it an omen. I say it was hunger.", "Soñé con un puente de piedra y un agua negra que cantaba mi nombre. Había campanas, pero nadie las tocaba. Desperté con sabor a almendras en la boca. Praska diría que es una señal. Yo digo que era hambre."),
  },
  {
    id: "n-lembretes",
    title: L("Lembretes", "Reminders", "Recordatorios"),
    at: calendar("10 DEZ"),
    checklist: [
      {
        text: L("Perguntar a Simanovich o que é “Match”.", "Ask Simanovich what “Match” is.", "Preguntarle a Simanovich qué es «Match»."),
        done: false,
      },
      {
        text: L("Galocha nova ao lado da porta. Não esquecer.", "New galosh by the door. Don't forget it.", "Bota de goma nueva junto a la puerta. No olvidarla."),
        done: false,
      },
      {
        text: L("Avisar Matriona que volto cedo.", "Tell Matriona I'll be back early.", "Avisarle a Matriona que volveré temprano."),
        done: false,
      },
      {
        text: L("Mandar mel ao Pequeno.", "Send honey to the Little One.", "Mandarle miel al Pequeño."),
        done: false,
      },
    ],
    preview: L("Perguntar a Simanovich o que é “Match”.", "Ask Simanovich what “Match” is.", "Preguntarle a Simanovich qué es «Match»."),
  },
  {
    id: "n-para-papa-e-mama-se-eu-p",
    title: L("Para Papa e Mama (se eu partir)", "For Papa and Mama (if I should go)", "Para Papá y Mamá (si me voy)"),
    at: calendar("07 DEZ"),
    body: [
      L("Escrevo em paz, mas com o coração apertado. Sinto que não passarei do primeiro dia do ano novo.", "I write in peace, but my heart is heavy. I feel I will not live to see the first day of the new year.", "Escribo en paz, pero con el corazón apesadumbrado. Siento que no llegaré al primer día del año nuevo."),
      L("Se quem me tirar a vida for gente do povo, ladrão ou camponês, não tema, Papa: o seu trono ficará firme e seus filhos reinarão por muito tempo.", "If the one who takes my life is a commoner, a thief, or a peasant, do not fear, Papa: your throne will stand firm, and your children will reign for many years.", "Si quien me quita la vida es alguien del pueblo, un ladrón o un campesino, no temas, Papá: tu trono seguirá firme y tus hijos reinarán durante mucho tiempo."),
      L("Mas se a mão que me matar tiver sangue de príncipe e brasão de família, se os grandes da corte se sujarem com o meu sangue, então ouça: antes que passem dois anos, ninguém da sua casa continuará vivo, e será o próprio povo russo quem os levará.", "But if the hand that kills me bears princely blood and a family crest, if the great men of the court stain themselves with my blood, then hear this: within two years, no one in your house will remain alive, and the Russian people themselves will carry them away.", "Pero si la mano que me mata lleva sangre de príncipe y escudo familiar, si los grandes de la corte se manchan con mi sangre, escucha: antes de que pasen dos años, no quedará nadie de tu casa con vida, y será el propio pueblo ruso quien se los lleve."),
      L("Não deixe isso acontecer. Escolha o povo. Escute o povo. Deus abençoe o Pequeno, Mama.", "Do not let it happen. Choose the people. Listen to them. God bless the Little One, Mama.", "No permitas que pase. Elige al pueblo. Escúchalo. Que Dios bendiga al Pequeño, Mamá."),
      "— Grigori",
    ],
    preview: L("Escrevo em paz, mas com o coração apertado. Sinto que não passarei do primeiro dia do ano novo.", "I write in peace, but my heart is heavy. I feel I will not live to see the first day of the new year.", "Escribo en paz, pero con el corazón apesadumbrado. Siento que no llegaré al primer día del año nuevo."),
    lock: {
      passcode: "1890",
      hint: L("As senhas são datas ou anos que Rasputin guardou nas Notas e em outros aplicativos.", "Passcodes are dates or years Rasputin saved in Notes and other apps.", "Las claves son fechas o años que Rasputin guardó en Notas y otras aplicaciones."),
    },
  },
  {
    id: "n-datas-importantes",
    title: L("Datas importantes", "Important dates", "Fechas importantes"),
    at: calendar("01 DEZ"),
    body: [
      L("• 26/03 — aniversário da Matriona\n• 21/01 — meu aniversário\n• 07 Jan — trem para Pokrovskoye\n• Senha da conversa do ministro: o dia do Pequeno (dia e mês)\n• Senha da passagem: o dia em que quase morri (dia e mês)\n• Senha da nota para Papa e Mama: o ano em que me uni à Praska", "• 03/26 — Matriona's birthday\n• 01/21 — my birthday\n• Jan 7 — train to Pokrovskoye\n• Minister's conversation passcode: the Little One's day (day and month)\n• Ticket passcode: the day I nearly died (day and month)\n• Note to Papa and Mama passcode: the year I married Praska", "• 26/03 — cumpleaños de Matriona\n• 21/01 — mi cumpleaños\n• 7 ene — tren a Pokrovskoye\n• Clave de la conversación del ministro: el día del Pequeño (día y mes)\n• Clave del billete: el día en que casi morí (día y mes)\n• Clave de la nota para Papá y Mamá: el año en que me casé con Praska"),
    ],
    checklist: [
      {
        text: L("Chave reserva com a Akilina", "Spare key with Akilina", "Llave de repuesto con Akilina"),
        done: false,
      },
      {
        text: L("Descobrir o que é Match", "Find out what Match is", "Averiguar qué es Match"),
        done: false,
      },
    ],
    preview: L("26/03 — aniversário da Matriona", "03/26 — Matriona's birthday", "26/03 — cumpleaños de Matriona"),
  },
  {
    id: "n-quem-pede-e-quem-quer",
    title: L("Quem pede e quem quer", "Who wants what", "Quién pide y qué quiere"),
    at: calendar("22 NOV"),
    body: [
      L("• Condessa M. — quer o filho longe do front.\n• Banqueiro Rubin — quer fornecer para o exército.\n• Khvostov — quer o cargo de volta; guarda rancor.\n• Purishkevich — barulhento. Fala alto para esconder o medo.\n• Grão-duque Nicolau — não me suporta.\n• Ella — reza por mim, mas me teme.\n• Iliodor — de amigo a inimigo; só reza por dinheiro.\n• Felix — jovem triste, mãos frias, riso demais. A casa dele tem corredores demais.", "• Countess M. — wants her son kept away from the front.\n• Banker Rubin — wants to supply the army.\n• Khvostov — wants his post back; holds a grudge.\n• Purishkevich — loud. He raises his voice to hide his fear.\n• Grand Duke Nicholas — can't stand me.\n• Ella — prays for me, but fears me.\n• Iliodor — friend turned enemy; he only prays for money.\n• Felix — sad young man, cold hands, too much laughter. His house has too many hallways.", "• Condesa M. — quiere que su hijo se mantenga lejos del frente.\n• Banquero Rubin — quiere abastecer al ejército.\n• Khvostov — quiere recuperar su cargo; guarda rencor.\n• Purishkevich — escandaloso. Alza la voz para ocultar el miedo.\n• Gran duque Nicolás — no me soporta.\n• Ella — reza por mí, pero me teme.\n• Iliodor — de amigo a enemigo; solo reza por dinero.\n• Felix — joven triste, manos frías, demasiadas risas. Su casa tiene demasiados pasillos."),
    ],
    preview: L("Condessa M. — quer o filho longe do front.", "Countess M. — wants her son kept away from the front.", "Condesa M. — quiere que su hijo se mantenga lejos del frente."),
  },
  {
    id: "n-remedio-do-estomago",
    title: L("Remédio do estômago", "Stomach remedy", "Remedio para el estómago"),
    at: calendar("15 NOV"),
    body: [
      L("Dr. Badmaev diz que meu estômago é frio e a azia me come. Pó de bicarbonato antes das refeições e leite morno. Não beber vinho forte de estômago vazio. (Eu bebo mesmo assim. Praska brigaria.)", "Dr. Badmaev says my stomach is cold and heartburn is eating me alive. Baking soda before meals and warm milk. No strong wine on an empty stomach. (I drink it anyway. Praska would scold me.)", "El Dr. Badmaev dice que tengo el estómago frío y la acidez me devora. Bicarbonato antes de las comidas y leche tibia. Nada de vino fuerte con el estómago vacío. (Igual bebo. Praska me regañaría.)"),
    ],
    preview: L("Dr. Badmaev diz que meu estômago é frio e a azia me come. Pó de bicarbonato antes das refeições e leite morno. Não beber vinho forte de estômago vazio. (Eu bebo mesmo assim. Praska brigaria.)", "Dr. Badmaev says my stomach is cold and heartburn is eating me alive. Baking soda before meals and warm milk. No strong wine on an empty stomach. (I drink it anyway. Praska would scold me.)", "El Dr. Badmaev dice que tengo el estómago frío y la acidez me devora. Bicarbonato antes de las comidas y leche tibia. Nada de vino fuerte con el estómago vacío. (Igual bebo. Praska me regañaría.)"),
  },
  {
    id: "n-o-dia-em-que-me-abriram-",
    title: L("O dia em que me abriram a barriga", "The day they cut me open", "El día que me abrieron el vientre"),
    at: calendar("29 JUN"),
    body: [
      L("29 de junho. Em Pokrovskoye, uma mulher gritou que eu era o Anticristo e enfiou a faca na minha barriga. Vi minhas tripas ao sol. Deus me devolveu. Todo ano agradeço neste dia. A Praska diz que sou teimoso demais para morrer. Eu digo: não é teima, é encargo.", "June 29. In Pokrovskoye, a woman shouted that I was the Antichrist and drove a knife into my belly. I saw my entrails in the sun. God sent me back. I give thanks on this day every year. Praska says I'm too stubborn to die. I say it's not stubbornness—it's a calling.", "29 de junio. En Pokrovskoye, una mujer gritó que yo era el Anticristo y me clavó un cuchillo en el vientre. Vi mis entrañas al sol. Dios me devolvió. Cada año doy gracias en esta fecha. Praska dice que soy demasiado terco para morir. Yo digo que no es terquedad, sino una misión."),
    ],
    preview: L("29 de junho. Em Pokrovskoye, uma mulher gritou que eu era o Anticristo e enfiou a faca na minha barriga. Vi minhas tripas ao sol. Deus me devolveu. Todo ano agradeço neste dia. A Praska diz que sou teimoso demais para morrer. Eu digo: não é teima, é encargo.", "June 29. In Pokrovskoye, a woman shouted that I was the Antichrist and drove a knife into my belly. I saw my entrails in the sun. God sent me back. I give thanks on this day every year. Praska says I'm too stubborn to die. I say it's not stubbornness—it's a calling.", "29 de junio. En Pokrovskoye, una mujer gritó que yo era el Anticristo y me clavó un cuchillo en el vientre. Vi mis entrañas al sol. Dios me devolvió. Cada año doy gracias en esta fecha. Praska dice que soy demasiado terco para morir. Yo digo que no es terquedad, sino una misión."),
  },
  {
    id: "n-cuidados-com-o-pequeno",
    title: L("Cuidados com o Pequeno", "Caring for the Little One", "Cuidados del Pequeño"),
    at: calendar("01 JUN"),
    body: [
      L("• Nada de aspirina: o sangue não estanca.\n• Ao primeiro sinal de dor, repouso. Não esperar piorar.\n• Água morna e pano limpo sobre a articulação.\n• Rezar baixinho. Ele escuta e se acalma.\n• Não deixar subir em árvore nem correr com cachorro.\n• Mel com pão. Histórias de lobo ajudam.", "• No aspirin: the bleeding won't stop.\n• At the first sign of pain, rest. Don't wait for it to get worse.\n• Warm water and a clean cloth on the joint.\n• Pray softly. He can hear and it calms him.\n• No climbing trees or running with the dog.\n• Honey and bread. Wolf stories help.", "• Nada de aspirina: la sangre no se detiene.\n• Al primer dolor, reposo. No esperar a que empeore.\n• Agua tibia y un paño limpio sobre la articulación.\n• Rezar en voz baja. Él escucha y se calma.\n• Nada de trepar árboles ni correr con el perro.\n• Miel con pan. Los cuentos de lobos ayudan."),
    ],
    preview: L("Nada de aspirina: o sangue não estanca.", "No aspirin: the bleeding won't stop.", "Nada de aspirina: la sangre no se detiene."),
  },
];
