import type { MatchesData } from "../../types";
import { asset, calendar, L } from "./helpers";

/*
 * Matches (roteiro 5.3). Ajuste autorizado: as falas do perfil de Agrafiena vinham rotuladas "Lídia" no roteiro; aqui
 * pertencem a Agrafiena. Distâncias (exceto a de Irina, "a 40 m") e a cidade são valores menores adicionados para o layout.
 */
export const matches: MatchesData = {
  appName: "MATCHES",
  profile: {
    name: "Grigori",
    age: 47,
    avatarSeed: "rasputin",
  },
  matches: [
    {
      id: "mt-irina",
      name: "Irina Y.",
      age: 21,
      distanceKm: 0.04,
      distanceLabel: L("a 40 m de você", "40 m away", "a 40 m de ti"),
      city: L("Petrogrado", "Petrograd", "Petrogrado"),
      bio: L("Princesa só no papel. Procuro alguém que me escute e me ensine a rezar de verdade.", "A princess in name only. Looking for someone who will listen and teach me to truly pray.", "Princesa solo en el papel. Busco a alguien que me escuche y me enseñe a rezar de verdad."),
      interests: [
        L("Cavalos", "Horses", "Caballos"),
        L("Música", "Music", "Música"),
        L("Orações", "Prayer", "Oraciones"),
      ],
      matchedAt: calendar("09 DEZ"),
      details: [
        {
          label: L("Perfil criado em", "Profile created", "Perfil creado"),
          value: calendar("08 DEZ · 23:50"),
        },
        {
          label: L("Local do cadastro", "Registration location", "Lugar de registro"),
          value: "Moika, 94",
        },
        {
          label: L("Última atividade", "Last active", "Última actividad"),
          value: calendar("17 DEZ · 02:19"),
        },
      ],
      photos: [
        {
          id: "mp-irina-0401",
          kind: "photo",
          seed: "mp-irina-0401",
          src: asset("matches/irina-0401.webp"),
        },
        {
          id: "mp-irina-0402",
          kind: "photo",
          seed: "mp-irina-0402",
          src: asset("matches/irina-0402.webp"),
        },
        {
          id: "mp-irina-0403",
          kind: "photo",
          seed: "mp-irina-0403",
          src: asset("matches/irina-0403.webp"),
        },
        {
          id: "mp-irina-0404",
          kind: "photo",
          seed: "mp-irina-0404",
          src: asset("matches/irina-0404.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: calendar("09 DEZ · 22:12"),
          text: L("O senhor é o homem de quem meu marido tanto fala. Estou tão ansiosa para conhecê-lo.", "You're the man my husband talks about so much. I've been looking forward to meeting you.", "Usted es el hombre del que tanto habla mi marido. Tengo muchas ganas de conocerlo."),
        },
        {
          id: "mm2",
          from: "victim",
          at: calendar("09 DEZ · 22:30"),
          text: L("Princesa? Sou um camponês de botas gastas.", "A princess? I'm a peasant in worn-out boots.", "¿Una princesa? Soy un campesino con las botas gastadas."),
        },
        {
          id: "mm3",
          from: "them",
          at: calendar("09 DEZ · 22:41"),
          text: L("É justamente por isso. Gosto de quem anda pela terra.", "That's exactly why. I like a man who keeps his feet on the ground.", "Justamente por eso. Me gusta quien camina con los pies en la tierra."),
        },
        {
          id: "mm4",
          from: "them",
          at: calendar("13 DEZ · 21:05"),
          text: L("Felix diz que posso recebê-lo na sexta, depois da meia-noite. Sem criados e sem fofocas. Estou pronta para o senhor.", "Felix says I can see you Friday, after midnight. No servants, no gossip. I'll be waiting for you.", "Felix dice que puedo recibirlo el viernes, después de medianoche. Sin criados ni chismes. Lo estaré esperando."),
        },
        {
          id: "mm5",
          from: "victim",
          at: calendar("13 DEZ · 21:20"),
          text: L("Pronto estou eu. rs", "I'll be ready. lol", "Yo sí que estoy listo. jaja"),
        },
        {
          id: "mm6",
          from: "them",
          at: calendar("16 DEZ · 18:20"),
          text: L("Hoje à noite, então. Entre pelo pátio. Felix lhe mostrará o armário que eu adoro.", "Tonight, then. Come in through the courtyard. Felix will show you the cabinet I adore.", "Entonces, esta noche. Entre por el patio. Felix le mostrará el armario que tanto me gusta."),
        },
        {
          id: "mm7",
          from: "victim",
          at: calendar("17 DEZ · 02:11"),
          text: L("Princesa, onde está? O príncipe diz que a senhora já desce.", "Princess, where are you? The prince says you'll be down any moment.", "Princesa, ¿dónde está? El príncipe dice que ya baja."),
        },
        {
          id: "mm8",
          from: "them",
          at: calendar("17 DEZ · 02:19"),
          text: L("Fico pronto em dois minutos, querido. Olhe o crucifixo do armário enquanto espera.", "I'll be ready in two minutes, darling. Look at the crucifix in the cabinet while you wait.", "Estaré lista en dos minutos, querido. Mira el crucifijo del armario mientras esperas."),
        },
      ],
    },
    {
      id: "mt-lidia",
      name: "Lídia",
      age: 34,
      distanceKm: 3,
      city: L("Petrogrado", "Petrograd", "Petrogrado"),
      bio: L("Cantora no Villa Rode. Não aceito cantadas, só gorjetas.", "Singer at the Villa Rode. No pickup lines, tips only.", "Cantante en el Villa Rode. No acepto piropos, solo propinas."),
      interests: [
        L("Canto", "Singing", "Canto"),
        L("Cabaré", "Cabaret", "Cabaret"),
        L("Madeira", "Madeira wine", "Vino de Madeira"),
      ],
      matchedAt: calendar("11 DEZ"),
      photos: [
        {
          id: "mp-lidia-0405",
          kind: "photo",
          seed: "mp-lidia-0405",
          src: asset("matches/lidia-0405.webp"),
        },
        {
          id: "mp-lidia-0406",
          kind: "photo",
          seed: "mp-lidia-0406",
          src: asset("matches/lidia-0406.webp"),
        },
        {
          id: "mp-lidia-0407",
          kind: "photo",
          seed: "mp-lidia-0407",
          src: asset("matches/lidia-0407.webp"),
        },
        {
          id: "mp-lidia-0408",
          kind: "photo",
          seed: "mp-lidia-0408",
          src: asset("matches/lidia-0408.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: calendar("11 DEZ · 23:10"),
          text: L("O santo mais popular da cidade finalmente deu match! Vem me ouvir cantar?", "The city's most popular saint finally matched with me! Come hear me sing?", "¡El santo más popular de la ciudad por fin hizo match conmigo! ¿Vienes a escucharme cantar?"),
        },
        {
          id: "mm2",
          from: "victim",
          at: calendar("11 DEZ · 23:30"),
          text: L("Santo não frequenta cabaré, Lídia. Mas gosto de música.", "Saints don't go to cabarets, Lídia. But I do like music.", "Los santos no van al cabaret, Lídia. Pero me gusta la música."),
        },
        {
          id: "mm3",
          from: "them",
          at: calendar("16 DEZ · 17:10"),
          text: L("Sexta de gala no Villa Rode. Vem hoje?", "It's gala night at the Villa Rode on Friday. Coming tonight?", "El viernes hay gala en el Villa Rode. ¿Vienes esta noche?"),
        },
        {
          id: "mm4",
          from: "victim",
          at: calendar("16 DEZ · 17:35"),
          text: L("Hoje tenho encontro com uma princesa.", "I have a date with a princess tonight.", "Esta noche tengo una cita con una princesa."),
        },
        {
          id: "mm5",
          from: "them",
          at: calendar("16 DEZ · 17:37"),
          text: L("Princesa à meia-noite? Cuidado com conto de fadas, rs.", "A princess at midnight? Careful—you might be in a fairy tale. lol", "¿Una princesa a medianoche? Cuidado, que esto parece un cuento. jaja"),
        },
      ],
    },
    {
      id: "mt-tolia",
      name: "Tolia",
      age: 44,
      distanceKm: 5,
      city: L("Petrogrado", "Petrograd", "Petrogrado"),
      bio: L("Pescador. Moro na Malaya Nevka, perto da Ponte Petrovsky. Falo pouco.", "Fisherman. I live by the Malaya Nevka, near Petrovsky Bridge. Not much of a talker.", "Pescador. Vivo junto al Malaya Nevka, cerca del puente Petrovsky. Hablo poco."),
      interests: [
        L("Pesca no gelo", "Ice fishing", "Pesca en el hielo"),
        L("Chá", "Tea", "Té"),
        L("Silêncio", "Quiet", "Silencio"),
      ],
      matchedAt: calendar("14 DEZ"),
      photos: [
        {
          id: "mp-tolia-0409",
          kind: "photo",
          seed: "mp-tolia-0409",
          src: asset("matches/tolia-0409.webp"),
        },
        {
          id: "mp-tolia-0410",
          kind: "photo",
          seed: "mp-tolia-0410",
          src: asset("matches/tolia-0410.webp"),
        },
        {
          id: "mp-tolia-0411",
          kind: "photo",
          seed: "mp-tolia-0411",
          src: asset("matches/tolia-0411.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: calendar("14 DEZ · 06:40"),
          text: L("Oi.", "Hi.", "Hola."),
        },
        {
          id: "mm2",
          from: "victim",
          at: calendar("14 DEZ · 18:15"),
          text: L("Oi, Tolia. A pesca vai boa?", "Hi, Tolia. How's the fishing?", "Hola, Tolia. ¿Va bien la pesca?"),
        },
        {
          id: "mm3",
          from: "them",
          at: calendar("16 DEZ · 19:22"),
          text: L("Gelo bom. Amanhã cedo vou furar buracos na Nevka.", "Good ice. I'll be drilling holes on the Nevka early tomorrow.", "Hay buen hielo. Mañana temprano abriré agujeros en el Nevka."),
        },
        {
          id: "mm4",
          from: "them",
          at: calendar("17 DEZ · 06:02"),
          text: L("O senhor mora na Gorokhovaya, né? Cheguei cedo na Nevka e vi um carro fechado parado na Ponte Petrovsky. Uns homens jogaram uma trouxa no buraco do gelo. Um deles era alto, de capote claro, com um cinto largo atravessado no peito, e falava numa língua que não era a nossa.", "You live on Gorokhovaya, don't you? I got to the Nevka early and saw a closed car parked on Petrovsky Bridge. Some men threw a bundle into a hole in the ice. One was tall, in a light-colored overcoat, with a wide strap across his chest, and spoke a language I didn't recognize.", "Usted vive en Gorokhovaya, ¿verdad? Llegué temprano al Nevka y vi un coche cerrado parado en el puente Petrovsky. Unos hombres arrojaron un bulto por un agujero en el hielo. Uno era alto, llevaba un abrigo claro y una correa ancha cruzada en el pecho; hablaba en una lengua que no reconocí."),
        },
        {
          id: "mm5",
          from: "them",
          at: calendar("17 DEZ · 06:05"),
          text: L("Fui embora com medo. Conto porque o senhor mora perto.", "I left in fear. I'm telling you because you live nearby.", "Me fui con miedo. Se lo cuento porque vive cerca."),
        },
      ],
    },
    {
      id: "mt-sasha",
      name: "Sasha",
      age: 62,
      distanceKm: 4,
      city: L("Petrogrado", "Petrograd", "Petrogrado"),
      bio: L("Viúva. Faço o melhor bolo de mel de Petrogrado.", "Widow. I make the best honey cake in Petrograd.", "Viuda. Hago el mejor pastel de miel de Petrogrado."),
      interests: [
        L("Mel", "Honey", "Miel"),
        L("Costura", "Sewing", "Costura"),
        L("Igreja", "Church", "Iglesia"),
      ],
      matchedAt: calendar("12 DEZ"),
      photos: [
        {
          id: "mp-sasha-0412",
          kind: "photo",
          seed: "mp-sasha-0412",
          src: asset("matches/sasha-0412.webp"),
        },
        {
          id: "mp-sasha-0413",
          kind: "photo",
          seed: "mp-sasha-0413",
          src: asset("matches/sasha-0413.webp"),
        },
        {
          id: "mp-sasha-0414",
          kind: "photo",
          seed: "mp-sasha-0414",
          src: asset("matches/sasha-0414.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: calendar("12 DEZ · 10:12"),
          text: L("Bolo de mel hoje? Passe aqui.", "Honey cake today? Stop by.", "¿Pastel de miel hoy? Pásate."),
        },
        {
          id: "mm2",
          from: "victim",
          at: calendar("12 DEZ · 10:40"),
          text: L("Hoje não, Sasha. Tenho compromisso com um banho.", "Not today, Sasha. I have an appointment at the baths.", "Hoy no, Sasha. Tengo una cita en los baños."),
        },
      ],
    },
    {
      id: "mt-agrafiena",
      name: "Agrafiena",
      age: 27,
      distanceKm: 6,
      city: L("Petrogrado", "Petrograd", "Petrogrado"),
      bio: L("A vida deve ser vivida como nos folhetins.", "Life should be lived like a serialized novel.", "La vida debe vivirse como en las novelas por entregas."),
      interests: [
        L("Literatura", "Literature", "Literatura"),
        L("Piano", "Piano", "Piano"),
        "Vodka",
      ],
      matchedAt: calendar("09 DEZ"),
      photos: [
        {
          id: "mp-agrafiena-0415",
          kind: "photo",
          seed: "mp-agrafiena-0415",
          src: asset("matches/agrafiena-0415.webp"),
        },
        {
          id: "mp-agrafiena-0416",
          kind: "photo",
          seed: "mp-agrafiena-0416",
          src: asset("matches/agrafiena-0416.webp"),
        },
        {
          id: "mp-agrafiena-0417",
          kind: "photo",
          seed: "mp-agrafiena-0417",
          src: asset("matches/agrafiena-0417.webp"),
        },
        {
          id: "mp-agrafiena-0418",
          kind: "photo",
          seed: "mp-agrafiena-0418",
          src: asset("matches/agrafiena-0418.webp"),
        },
        {
          id: "mp-agrafiena-0419",
          kind: "photo",
          seed: "mp-agrafiena-0419",
          src: asset("matches/agrafiena-0419.webp"),
        },
      ],
      messages: [
        {
          id: "mm1",
          from: "them",
          at: calendar("09 DEZ · 20:11"),
          text: L("Se o senhor for metade dos homens que pregam nos folhetos, eu sou uma mulher de sorte.", "If you're half the man those leaflets make you out to be, I'm a lucky woman.", "Si usted es la mitad de hombre que anuncian esos folletos, soy una mujer con suerte."),
        },
        {
          id: "mm2",
          from: "victim",
          at: calendar("09 DEZ · 23:30"),
          text: L("Eu sou muito maior do que eles pregam.", "I'm much more than those leaflets say.", "Soy mucho más de lo que dicen esos folletos."),
        },
        {
          id: "mm3",
          from: "them",
          at: calendar("10 DEZ · 11:23"),
          text: L("E você pode comprovar isso?", "Can you prove it?", "¿Y puedes demostrarlo?"),
        },
        {
          id: "mm4",
          from: "victim",
          at: calendar("11 DEZ · 17:35"),
          text: L("Palavra por Palavra.", "Word for word.", "Palabra por palabra."),
        },
        {
          id: "mm5",
          from: "them",
          at: calendar("13 DEZ · 12:37"),
          text: L("Isso que veremos.", "We'll see about that.", "Eso ya lo veremos."),
        },
      ],
    },
  ],
};
