import type { SocialData } from "../../types";
import { asset, calendar, L } from "./helpers";

/*
 * Feed do PicLike (roteiro 5.2), do mais recente para o mais antigo. Códigos de foto = últimos 4 dígitos do arquivo
 * (o roteiro cita 0220/03xx em partes; aqui vale o nome do arquivo). Valores menores adicionados para o layout, pois o
 * roteiro não os traz: curtidas, horário dos comentários (usa o dia do post) e o perfil próprio do aparelho.
 */
export const social: SocialData = {
  profile: {
    handle: "@grigori.rasputin",
    displayName: "Grigori Rasputin",
    bio: L("Peregrino de Pokrovskoye.", "Pilgrim from Pokrovskoye.", "Peregrino de Pokrovskoye."),
    avatarSeed: "rasputin",
    avatarSrc: asset("avatar-rasputin.webp"),
    posts: 0,
    followers: 2150,
    following: 14,
  },
  posts: [
    {
      id: "post-0320",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0320",
          kind: "photo",
          seed: "sp-0320",
          src: asset("piklike/foto-0320.webp"),
        },
      ],
      caption: L("Laudo preliminar do Prof. Kosorotov vaza: três ferimentos de bala; nenhum veneno no estômago; pulmões sem água. O tiro na testa, calibre .455, foi dado de muito perto e partiu de arma diferente das demais.", "Professor Kosorotov's preliminary report leaks: three bullet wounds; no poison in the stomach; no water in the lungs. The point-blank shot to the forehead was .455 caliber and came from a different weapon.", "Se filtra el informe preliminar del profesor Kosorotov: tres heridas de bala; nada de veneno en el estómago; pulmones sin agua. El disparo a quemarropa en la frente era de calibre .455 y salió de un arma distinta."),
      at: calendar("20 DEZ · 18:05"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 1760,
      comments: [
        {
          id: "c1",
          author: "@dr_vasiliev",
          text: L("Sem água nos pulmões? Então não se afogou.", "No water in the lungs? Then he didn't drown.", "¿Sin agua en los pulmones? Entonces no se ahogó."),
          at: calendar("20 DEZ"),
        },
        {
          id: "c2",
          author: "@fiel_do_starets",
          text: L("Mataram duas, três vezes!", "They killed him two, three times over!", "¡Lo mataron dos, tres veces!"),
          at: calendar("20 DEZ"),
        },
        {
          id: "c3",
          author: "@colecionador_armas",
          text: L("Calibre .455? Isso é revólver militar inglês, não é Nagant russo.", ".455 caliber? That's a British military revolver, not a Russian Nagant.", "¿Calibre .455? Es un revólver militar británico, no un Nagant ruso."),
          at: calendar("20 DEZ"),
        },
        {
          id: "c4",
          author: "@purishkevich",
          text: L("Fui o último a atirar, e atirei na testa.", "I was the last to shoot, and I shot him in the forehead.", "Fui el último en disparar y le di en la frente."),
          at: calendar("20 DEZ"),
        },
        {
          id: "c5",
          author: "@colecionador_armas",
          text: L("Com que arma, deputado? A sua é de calibre pequeno.", "With what gun, Deputy? Yours is a small caliber.", "¿Con qué arma, diputado? La suya es de bajo calibre."),
          at: calendar("20 DEZ"),
        },
      ],
    },
    {
      id: "post-0219",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0219",
          kind: "photo",
          seed: "sp-0219",
          src: asset("piklike/foto-0219.webp"),
        },
      ],
      caption: L("Galocha encontrada na ponte; corpo retirado do gelo do Malaya Nevka. Polícia confirma: é Rasputin.", "Galosh found on the bridge; body pulled from the ice of the Malaya Nevka. Police confirm: it's Rasputin.", "Hallan una bota de goma en el puente; sacan un cuerpo del hielo del Malaya Nevka. La policía confirma: es Rasputin."),
      at: calendar("19 DEZ · 14:30"),
      place: L("Ponte Petrovsky", "Petrovsky Bridge", "Puente Petrovsky"),
      likes: 2410,
      comments: [
        {
          id: "c1",
          author: "@ivan_padeiro",
          text: L("A galocha é igual à da propaganda da loja.", "That galosh looks just like the one in the shop's ad.", "Esa bota es igual a la del anuncio de la tienda."),
          at: calendar("19 DEZ"),
        },
        {
          id: "c2",
          author: "@patriota_ruso",
          text: L("Acabou o pesadelo.", "The nightmare is over.", "Se acabó la pesadilla."),
          at: calendar("19 DEZ"),
        },
        {
          id: "c3",
          author: "@fiel_do_starets",
          text: L("A Rússia chora hoje.", "Russia mourns today.", "Rusia llora hoy."),
          at: calendar("19 DEZ"),
        },
      ],
    },
    {
      id: "post-0218",
      author: "@rasputin_vive",
      media: [
        {
          id: "sp-0218",
          kind: "photo",
          seed: "sp-0218",
          src: asset("piklike/foto-0218.webp"),
        },
      ],
      caption: L("VISTO NA DOCA AO AMANHECER! Rasputin não morre: sobreviveu a faca, veneno e chumbo. #Imortal", "SPOTTED AT THE DOCK AT DAWN! Rasputin won't die: he survived a knife, poison, and bullets. #Immortal", "¡VISTO EN EL MUELLE AL AMANECER! Rasputin no muere: sobrevivió a cuchillos, veneno y balas. #Inmortal"),
      at: calendar("18 DEZ · 21:12"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 77,
      comments: [
        {
          id: "c1",
          author: "@fiel_do_starets",
          text: L("Eu sabia!", "I knew it!", "¡Lo sabía!"),
          at: calendar("18 DEZ"),
        },
        {
          id: "c2",
          author: "@cetico_nev",
          text: L("A foto é de 1913, bobo.", "That photo is from 1913, you fool.", "Esa foto es de 1913, tonto."),
          at: calendar("18 DEZ"),
        },
        {
          id: "c3",
          author: "@mistico_sib",
          text: L("Ele já sobreviveu à facada de 1914.", "He already survived a stabbing in 1914.", "Ya sobrevivió a una puñalada en 1914."),
          at: calendar("18 DEZ"),
        },
      ],
    },
    {
      id: "post-0217",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0217",
          kind: "photo",
          seed: "sp-0217",
          src: asset("piklike/foto-0217.webp"),
        },
      ],
      caption: L("ÚLTIMA HORA: Rasputin desaparecido. Polícia investiga tiros ouvidos na Moika. Príncipe Yusupov nega ter recebido o visitante.", "BREAKING: Rasputin missing. Police investigate shots heard on Moika. Prince Yusupov denies receiving the visitor.", "ÚLTIMA HORA: Rasputin ha desaparecido. La policía investiga disparos oídos en Moika. El príncipe Yusupov niega haber recibido al visitante."),
      at: calendar("17 DEZ · 11:00"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 902,
      comments: [
        {
          id: "c1",
          author: "@vera_p",
          text: L("Eu ouvi tiros! Disseram que era um cachorro.", "I heard shots! They said it was a dog.", "¡Oí disparos! Dijeron que era un perro."),
          at: calendar("17 DEZ"),
        },
        {
          id: "c2",
          author: "@patriota_ruso",
          text: L("Finalmente.", "At last.", "Por fin."),
          at: calendar("17 DEZ"),
        },
        {
          id: "c3",
          author: "@fiel_do_starets",
          text: L("Isso é obra de gente maligna.", "This is the work of evil people.", "Esto es obra de gente malvada."),
          at: calendar("17 DEZ"),
        },
        {
          id: "c4",
          author: "@observador_capital",
          text: L("Quem teria coragem de tocar no homem da Imperatriz?", "Who would dare lay a hand on the Empress's man?", "¿Quién se atrevería a tocar al hombre de la Emperatriz?"),
          at: calendar("17 DEZ"),
        },
      ],
    },
    {
      id: "post-0216",
      author: "@felix.yusupov",
      media: [
        {
          id: "sp-0216",
          kind: "photo",
          seed: "sp-0216",
          src: asset("piklike/foto-0216.webp"),
        },
      ],
      caption: L("Noite triste: precisei sacrificar um dos meus cães. Perdoem o barulho.", "A sad night: I had to put one of my dogs down. Forgive the noise.", "Noche triste: tuve que sacrificar a uno de mis perros. Perdonen el ruido."),
      at: calendar("17 DEZ · 07:33"),
      place: L("Palácio Yusupov, Moika", "Yusupov Palace, Moika", "Palacio Yusupov, Moika"),
      likes: 188,
      comments: [
        {
          id: "c1",
          author: "@dmitri.p",
          text: L("Meus sentimentos, Felix.", "My condolences, Felix.", "Mi más sentido pésame, Felix."),
          at: calendar("17 DEZ"),
        },
        {
          id: "c2",
          author: "@oswald.rayner",
          text: L("Sorry for your loss, old chap.", "Sorry for your loss, old chap.", "Lamento tu pérdida, viejo amigo."),
          at: calendar("17 DEZ"),
        },
        {
          id: "c3",
          author: "@purishkevich",
          text: L("O pátio já está limpo.", "The courtyard is clean now.", "El patio ya está limpio."),
          at: calendar("17 DEZ"),
        },
        {
          id: "c4",
          author: "@vera_p",
          text: L("Ouvi os tiros daqui! Pensei que fosse briga.", "I heard the shots from here! I thought it was a fight.", "¡Oí los disparos desde aquí! Creí que era una pelea."),
          at: calendar("17 DEZ"),
        },
      ],
    },
    {
      id: "post-0215",
      author: "@khvostov_ex",
      media: [
        {
          id: "sp-0215",
          kind: "photo",
          seed: "sp-0215",
          src: asset("piklike/foto-0215.webp"),
        },
      ],
      caption: L("Noite longa com bons amigos. A Rússia que se vire sozinha.", "A long night with good friends. Russia can fend for itself.", "Noche larga con buenos amigos. Que Rusia se las arregle sola."),
      at: calendar("17 DEZ · 02:12"),
      place: L("Restaurante Medved", "Medved Restaurant", "Restaurante Medved"),
      likes: 41,
      comments: [
        {
          id: "c1",
          author: "@leal_carlos",
          text: L("Aproveite, Excelência!", "Enjoy yourself, Your Excellency!", "¡Que lo disfrute, Excelencia!"),
          at: calendar("17 DEZ"),
        },
        {
          id: "c2",
          author: "@garcom_medved",
          text: L("A mesa 7 ainda pede vinho.", "Table 7 is still asking for wine.", "La mesa 7 sigue pidiendo vino."),
          at: calendar("17 DEZ"),
        },
      ],
    },
    {
      id: "post-0214",
      author: "@dmitri.p",
      media: [
        {
          id: "sp-0214",
          kind: "photo",
          seed: "sp-0214",
          src: asset("piklike/foto-0214.webp"),
        },
      ],
      caption: L("Febre alta e cama. Cancelei tudo para amanhã.", "High fever and bed rest. I canceled everything for tomorrow.", "Fiebre alta y a la cama. Cancelé todo para mañana."),
      at: calendar("16 DEZ · 21:45"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 130,
      comments: [
        {
          id: "c1",
          author: "@s.sukhotin",
          text: L("Descanse, Alteza. Cuido de tudo, inclusive do carro.", "Rest, Your Highness. I'll take care of everything, including the car.", "Descanse, Alteza. Me encargo de todo, también del coche."),
          at: calendar("16 DEZ"),
        },
        {
          id: "c2",
          author: "@felix.yusupov",
          text: L("Melhoras, meu caro.", "Get well soon, my friend.", "Que te mejores, querido."),
          at: calendar("16 DEZ"),
        },
      ],
    },
    {
      id: "post-0213",
      author: "@irina.yusupova",
      media: [
        {
          id: "sp-0213",
          kind: "photo",
          seed: "sp-0213",
          src: asset("piklike/foto-0213.webp"),
        },
      ],
      caption: L("Vento forte e chuva. Dia de ficar em casa com a pequena.", "Strong winds and rain. A day to stay home with the little one.", "Viento fuerte y lluvia. Día de quedarse en casa con la pequeña."),
      at: calendar("16 DEZ · 08:50"),
      place: L("Ai-Todor, Crimeia", "Ai-Todor, Crimea", "Ai-Todor, Crimea"),
      likes: 164,
      comments: [
        {
          id: "c1",
          author: "@felix.yusupov",
          text: L("Beijos. Escrevo à noite.", "Kisses. I'll write tonight.", "Besos. Te escribo esta noche."),
          at: calendar("16 DEZ"),
        },
        {
          id: "c2",
          author: "@xenia_a",
          text: L("Fechei as janelas do salão.", "I closed the drawing-room windows.", "Cerré las ventanas del salón."),
          at: calendar("16 DEZ"),
        },
      ],
    },
    {
      id: "post-0212",
      author: "@irina.yusupova",
      media: [
        {
          id: "sp-0212",
          kind: "photo",
          seed: "sp-0212",
          src: asset("piklike/foto-0212.webp"),
        },
      ],
      caption: L("Sol de inverno na Crimeia. Mamãe, eu e a pequena Irina, enfim juntas.", "Winter sunshine in Crimea. Mother, little Irina, and me, finally together.", "Sol de invierno en Crimea. Mamá, la pequeña Irina y yo, por fin juntas."),
      at: calendar("14 DEZ · 12:03"),
      place: L("Ai-Todor, Crimeia", "Ai-Todor, Crimea", "Ai-Todor, Crimea"),
      likes: 198,
      comments: [
        {
          id: "c1",
          author: "@felix.yusupov",
          text: L("Saudades, meu amor. Beijo na pequena.", "I miss you, my love. A kiss for the little one.", "Te extraño, mi amor. Un beso para la pequeña."),
          at: calendar("14 DEZ"),
        },
        {
          id: "c2",
          author: "@xenia_a",
          text: L("Aproveitem o sol, queridas.", "Enjoy the sunshine, my dears.", "Disfruten del sol, queridas."),
          at: calendar("14 DEZ"),
        },
      ],
    },
    {
      id: "post-0211",
      author: "@iliodor_oficial",
      media: [
        {
          id: "sp-0211",
          kind: "photo",
          seed: "sp-0211",
          src: asset("piklike/foto-0211.webp"),
        },
      ],
      caption: L("O falso santo de Pokrovskoye ainda caminha entre nós. Mas o que sobe depressa desce de repente.", "The false saint of Pokrovskoye still walks among us. But the higher they rise, the harder they fall.", "El falso santo de Pokrovskoye aún camina entre nosotros. Pero quien sube deprisa, cae de golpe."),
      at: calendar("14 DEZ · 10:19"),
      place: L("Cristiânia (Noruega)", "Christiania (Norway)", "Cristianía (Noruega)"),
      likes: 39,
      comments: [
        {
          id: "c1",
          author: "@peregrino_sib",
          text: L("O senhor já foi amigo dele, não?", "You used to be his friend, didn't you?", "Usted fue su amigo, ¿no?"),
          at: calendar("14 DEZ"),
        },
        {
          id: "c2",
          author: "@iliodor_oficial",
          text: L("Fui enganado.", "I was deceived.", "Me engañó."),
          at: calendar("14 DEZ"),
        },
        {
          id: "c3",
          author: "@fiel_do_starets",
          text: L("Inveja pura.", "Pure jealousy.", "Pura envidia."),
          at: calendar("14 DEZ"),
        },
      ],
    },
    {
      id: "post-0210",
      author: "@felix.yusupov",
      media: [
        {
          id: "sp-0210",
          kind: "photo",
          seed: "sp-0210",
          src: asset("piklike/foto-0210.webp"),
        },
      ],
      caption: L("Oxford, 1909 → Petrogrado, 1916. Sete anos depois, meu velho colega de quarto bate à minha porta. Chá e lembranças.", "Oxford, 1909 → Petrograd, 1916. Seven years later, my old college roommate is at my door. Tea and memories.", "Oxford, 1909 → Petrogrado, 1916. Siete años después, mi antiguo compañero de cuarto de la universidad llama a mi puerta. Té y recuerdos."),
      at: calendar("11 DEZ · 16:40"),
      place: L("Palácio Yusupov, Moika", "Yusupov Palace, Moika", "Palacio Yusupov, Moika"),
      likes: 276,
      comments: [
        {
          id: "c1",
          author: "@oswald.rayner",
          text: L("Seu chá continua o melhor do hemisfério, old chap.", "Your tea is still the best in the hemisphere, old chap.", "Tu té sigue siendo el mejor del hemisferio, viejo amigo."),
          at: calendar("11 DEZ"),
        },
        {
          id: "c2",
          author: "@dmitri.p",
          text: L("Preciso conhecê-lo.", "I must meet him.", "Tengo que conocerlo."),
          at: calendar("11 DEZ"),
        },
        {
          id: "c3",
          author: "@purishkevich",
          text: L("Bom ter amigos de confiança em tempos difíceis.", "Good to have trusted friends in difficult times.", "Es bueno tener amigos de confianza en tiempos difíciles."),
          at: calendar("11 DEZ"),
        },
      ],
    },
    {
      id: "post-0209",
      author: "@khvostov_ex",
      media: [
        {
          id: "sp-0209",
          kind: "photo",
          seed: "sp-0209",
          src: asset("piklike/foto-0209.webp"),
        },
      ],
      caption: L("Quem ontem mandava hoje espera. Mas a memória é longa.", "The one who gave orders yesterday waits today. But memories are long.", "Quien ayer daba órdenes hoy espera. Pero la memoria es larga."),
      at: calendar("09 DEZ · 20:02"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 54,
      comments: [
        {
          id: "c1",
          author: "@leal_carlos",
          text: L("Volte ao cargo, Excelência!", "Get your post back, Your Excellency!", "¡Recupere su cargo, Excelencia!"),
          at: calendar("09 DEZ"),
        },
        {
          id: "c2",
          author: "@tolo_anonimo",
          text: L("Foi demitido por incompetência.", "He was dismissed for incompetence.", "Lo despidieron por incompetente."),
          at: calendar("09 DEZ"),
        },
        {
          id: "c3",
          author: "@khvostov_ex",
          text: L("Respondo em breve.", "I'll reply soon.", "Responderé pronto."),
          at: calendar("09 DEZ"),
        },
      ],
    },
    {
      id: "post-0208",
      author: "@padaria_filippov",
      media: [
        {
          id: "sp-0208",
          kind: "photo",
          seed: "sp-0208",
          src: asset("piklike/foto-0208.webp"),
        },
      ],
      caption: L("Hoje só pão preto. O branco acabou às seis da manhã.", "Only black bread today. The white bread was gone by six this morning.", "Hoy solo hay pan negro. El blanco se acabó a las seis de la mañana."),
      at: calendar("08 DEZ · 07:30"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 148,
      comments: [
        {
          id: "c1",
          author: "@maria_costureira",
          text: L("Pelo menos tem.", "At least there's some.", "Al menos hay."),
          at: calendar("08 DEZ"),
        },
        {
          id: "c2",
          author: "@ivan_padeiro",
          text: L("Falta farinha em toda a cidade.", "The whole city is short on flour.", "Falta harina en toda la ciudad."),
          at: calendar("08 DEZ"),
        },
      ],
    },
    {
      id: "post-0207",
      author: "@galochas_triangulo",
      media: [
        {
          id: "sp-0207",
          kind: "photo",
          seed: "sp-0207",
          src: asset("piklike/foto-0207.webp"),
        },
      ],
      caption: L("Galochas de borracha preta com forro vermelho. Proteção contra neve e degelo. Numeração 40 a 46.", "Black rubber galoshes with red lining. Protection from snow and slush. Sizes 40–46.", "Botas de goma negras con forro rojo. Protección contra la nieve y el deshielo. Tallas 40–46."),
      at: calendar("03 DEZ · 10:00"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 31,
      comments: [
        {
          id: "c1",
          author: "@ivan_padeiro",
          text: L("Comprei as minhas ontem.", "I bought mine yesterday.", "Compré las mías ayer."),
          at: calendar("03 DEZ"),
        },
        {
          id: "c2",
          author: "@vera_p",
          text: L("Quanto custa?", "How much are they?", "¿Cuánto cuestan?"),
          at: calendar("03 DEZ"),
        },
      ],
    },
    {
      id: "post-0206",
      author: "@gazeta_da_capital",
      media: [
        {
          id: "sp-0206",
          kind: "photo",
          seed: "sp-0206",
          src: asset("piklike/foto-0206.webp"),
        },
      ],
      caption: L("Filas de pão crescem pela cidade. Governo promete soluções esta semana.", "Bread lines are growing across the city. The government promises a solution this week.", "Las colas para comprar pan crecen por toda la ciudad. El gobierno promete una solución esta semana."),
      at: calendar("28 NOV · 08:30"),
      place: L("Petrogrado", "Petrograd", "Petrogrado"),
      likes: 205,
      comments: [
        {
          id: "c1",
          author: "@ivan_padeiro",
          text: L("Prometem e não entregam.", "They make promises and never deliver.", "Prometen y no cumplen."),
          at: calendar("28 NOV"),
        },
        {
          id: "c2",
          author: "@maria_costureira",
          text: L("Duas horas na fila hoje.", "Two hours in line today.", "Hoy, dos horas en la cola."),
          at: calendar("28 NOV"),
        },
        {
          id: "c3",
          author: "@vera_p",
          text: L("E o carvão, quando chega?", "And when is the coal coming?", "¿Y el carbón, cuándo llega?"),
          at: calendar("28 NOV"),
        },
      ],
    },
    {
      id: "post-0205",
      author: "@arquivo_siberiano",
      media: [
        {
          id: "sp-0205",
          kind: "photo",
          seed: "sp-0205",
          src: asset("piklike/foto-0205.webp"),
        },
      ],
      caption: L("Khioniya Guseva, autora do ataque de 29 de Junho de 1914 contra Rasputin, segue internada em hospital psiquiátrico.", "Khioniya Guseva, who attacked Rasputin on June 29, 1914, remains in a psychiatric hospital.", "Khioniya Guseva, autora del ataque contra Rasputin del 29 de junio de 1914, sigue internada en un hospital psiquiátrico."),
      at: calendar("22 NOV · 13:10"),
      place: "Tomsk",
      likes: 63,
      comments: [
        {
          id: "c1",
          author: "@fiel_do_starets",
          text: L("Que fique lá.", "Let her stay there.", "Que se quede allí."),
          at: calendar("22 NOV"),
        },
        {
          id: "c2",
          author: "@peregrino_sib",
          text: L("Dizem que ela nunca se arrependeu.", "They say she never regretted it.", "Dicen que nunca se arrepintió."),
          at: calendar("22 NOV"),
        },
      ],
    },
    {
      id: "post-0204",
      author: "@purishkevich",
      media: [
        {
          id: "sp-0204",
          kind: "photo",
          seed: "sp-0204",
          src: asset("piklike/foto-0204.webp"),
        },
      ],
      caption: L("Hoje eu disse na tribuna o que ninguém tinha coragem de dizer: o trono está cercado por forças obscuras. Que Deus salve a Rússia.", "Today I said from the Duma's rostrum what no one else dared: dark forces surround the throne. May God save Russia.", "Hoy dije desde la tribuna lo que nadie se atrevía a decir: fuerzas oscuras rodean el trono. Que Dios salve a Rusia."),
      at: calendar("19 NOV · 22:10"),
      place: L("Palácio Táurida (Duma)", "Tauride Palace (Duma)", "Palacio Táuride (Duma)"),
      likes: 412,
      comments: [
        {
          id: "c1",
          author: "@patriota_ruso",
          text: L("Coragem rara!", "Rare courage!", "¡Qué valor tan poco común!"),
          at: calendar("19 NOV"),
        },
        {
          id: "c2",
          author: "@vera_p",
          text: L("Ele vai pagar caro por isso.", "He'll pay dearly for this.", "Lo pagará caro."),
          at: calendar("19 NOV"),
        },
        {
          id: "c3",
          author: "@observador_capital",
          text: L("E agora, o que ele pretende fazer?", "And now, what does he plan to do?", "Y ahora, ¿qué piensa hacer?"),
          at: calendar("19 NOV"),
        },
        {
          id: "c4",
          author: "@purishkevich",
          text: L("Falta pouco.", "Not long now.", "Falta poco."),
          at: calendar("19 NOV"),
        },
      ],
    },
    {
      id: "post-0203",
      author: "@o_marionetista",
      media: [
        {
          id: "sp-0203",
          kind: "photo",
          seed: "sp-0203",
          src: asset("piklike/foto-0203.webp"),
        },
      ],
      caption: L("Quem governa a Rússia? O Imperador, ou o camponês que sussurra no ouvido da Imperatriz? Abram os olhos. #ForçasDasTrevas", "Who rules Russia? The Emperor, or the peasant whispering in the Empress's ear? Open your eyes. #DarkForces", "¿Quién gobierna Rusia? ¿El Emperador o el campesino que susurra al oído de la Emperatriz? Abran los ojos. #FuerzasOscuras"),
      at: calendar("15 NOV · 09:40"),
      likes: 87,
      comments: [
        {
          id: "c1",
          author: "@patriota_ruso",
          text: L("Basta!", "Enough!", "¡Basta!"),
          at: calendar("15 NOV"),
        },
        {
          id: "c2",
          author: "@vera_p",
          text: L("Isso é calúnia.", "That's slander.", "Eso es una calumnia."),
          at: calendar("15 NOV"),
        },
        {
          id: "c3",
          author: "@ivan_padeiro",
          text: L("O pão acabou e eles discutem quem manda.", "The bread is gone, and they're arguing over who's in charge.", "Se acabó el pan y ellos discuten quién manda."),
          at: calendar("15 NOV"),
        },
        {
          id: "c4",
          author: "@observador_capital",
          text: L("Meia verdade também é mentira.", "Half-truths are lies too.", "Una verdad a medias también es mentira."),
          at: calendar("15 NOV"),
        },
      ],
    },
    {
      id: "post-0201",
      author: "@tatiana_n",
      media: [
        {
          id: "sp-0201",
          kind: "photo",
          seed: "sp-0201",
          src: asset("piklike/foto-0201.webp"),
        },
      ],
      caption: L("Plantão no hospital. Os nossos soldados são mais fortes do que imaginam.", "On hospital duty. Our soldiers are stronger than they know.", "De guardia en el hospital. Nuestros soldados son más fuertes de lo que creen."),
      at: calendar("10 NOV · 11:20"),
      place: "Tsarskoye Selo",
      likes: 2140,
      comments: [
        {
          id: "c1",
          author: "@olga_n",
          text: L("Orgulho de você.", "I'm proud of you.", "Estoy orgullosa de ti."),
          at: calendar("10 NOV"),
        },
        {
          id: "c2",
          author: "@anastasia_n",
          text: L("Eu lavei as bandagens! Quase.", "I washed the bandages! Almost.", "¡Lavé las vendas! Casi."),
          at: calendar("10 NOV"),
        },
        {
          id: "c3",
          author: "@soldado_ivan",
          text: L("Obrigado, Alteza.", "Thank you, Your Highness.", "Gracias, Alteza."),
          at: calendar("10 NOV"),
        },
        {
          id: "c4",
          author: "@anna_vyr",
          text: L("Nossa menina de ouro.", "Our golden girl.", "Nuestra niña de oro."),
          at: calendar("10 NOV"),
        },
      ],
    },
    {
      id: "post-0202",
      author: "@alexei_n",
      media: [
        {
          id: "sp-0202",
          kind: "photo",
          seed: "sp-0202",
          src: asset("piklike/foto-0202.webp"),
        },
      ],
      caption: L("12 anos hoje! Papai trouxe um bolo grande demais para mim.", "I'm 12 today! Papa brought me a cake that's much too big.", "¡Hoy cumplo 12! Papá me trajo un pastel demasiado grande."),
      at: calendar("30 JUL · 14:02"),
      place: "Tsarskoye Selo",
      likes: 3520,
      comments: [
        {
          id: "c1",
          author: "@tatiana_n",
          text: L("Parabéns, Pequeno!", "Happy birthday, Little One!", "¡Feliz cumpleaños, Pequeño!"),
          at: calendar("30 JUL"),
        },
        {
          id: "c2",
          author: "@anastasia_n",
          text: L("Eu comi metade.", "I ate half of it.", "Yo me comí la mitad."),
          at: calendar("30 JUL"),
        },
        {
          id: "c3",
          author: "@anna_vyr",
          text: L("Que Deus te guarde, querido.", "May God keep you safe, dear.", "Que Dios te proteja, querido."),
          at: calendar("30 JUL"),
        },
      ],
    },
  ],
  people: [],
};
