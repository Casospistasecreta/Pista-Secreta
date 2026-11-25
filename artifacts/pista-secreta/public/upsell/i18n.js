(() => {
  const STORAGE_KEY = "pista-secreta:language";
  const languages = ["pt-BR", "en", "es"];

  const copy = {
    "pt-BR": {
      title: "Pista Secreta — Arquivo Complementar Desbloqueado",
      description: "Uma parte deste caso não cabe na tela. Acesse o Kit Investigador Premium.",
      languageLabel: "Idioma",
      caseLabel: "CASO Nº 04-7731",
      progress: "ARQUIVO {current} / {total}",
      interruptText: "Existe uma parte deste caso que o arquivo digital não consegue entregar.",
      pins: ["Confirmação", "Interrupção", "O Kit", "Experiência", "Conteúdo", "O Objeto", "Valor", "Oferta", "Desbloquear", "Garantia", "Perguntas"],
      content: [
        [".stamp--approved", ["ARQUIVO<br>LIBERADO"]],
        [".section--confirm .eyebrow", ["Aquisição confirmada"]],
        [".confirm__title", ["Seu acesso ao caso<br>foi registrado."]],
        [".confirm__text", ["A versão digital do dossiê já está disponível na sua área de investigação.<br>Documentos, depoimentos e provas estão liberados para leitura imediata."]],
        [".confirm__note", ["Mas há um detalhe sobre este caso que a tela não consegue mostrar por completo."]],
        [".interrupt__label", ["Antes de prosseguir"]],
        [".section--intro .eyebrow", ["Nível de acesso adicional"]],
        [".intro__title", ["Kit Investigador<br><em>Premium</em>"]],
        [".intro__subtitle", ["A investigação sai da tela e chega até você — em papel, em tinta,<br>em provas que podem ser seguradas com as próprias mãos."]],
        [".benefit-card h3", ["O toque muda tudo", "Feito para ser dividido", "Parece um arquivo real", "Uma peça, não um produto"]],
        [".benefit-card p", [
          "Segurar um laudo pericial impresso, sentir o peso do envelope lacrado — é uma camada de imersão que nenhuma tela reproduz.",
          "Espalhe as provas sobre a mesa. Reúna quem vai investigar com você. O caso muda de forma quando é discutido em grupo, evidência por evidência.",
          "Cada peça foi tratada para lembrar um dossiê de investigação de verdade — carimbos, texturas, numeração de evidências.",
          "Depois de solucionado, o dossiê não vai para a gaveta — fica exposto como uma peça de coleção do caso que você decifrou."
        ]],
        [".section--manifest .eyebrow", ["Manifesto de itens"]],
        [".manifest__title", ["O que chega até você"]],
        [".manifest__name", [
          "Pasta de investigação personalizada",
          "Dossiê completo, impresso e encadernado",
          "Fotografias reveladas das evidências",
          "Laudos periciais impressos",
          "Provas físicas do caso",
          "Envelope lacrado com item confidencial",
          "Brindes exclusivos da investigação"
        ]],
        [".mockup-text .eyebrow", ["Peça 01", "Peça 02", "Peça 03"]],
        [".mockup-text h3", [
          "A pasta que abre a investigação",
          "O envelope que só deve ser aberto no momento certo",
          "Fotografias reveladas da cena"
        ]],
        [".mockup-text p", [
          "Capa rígida, etiqueta numerada e acabamento fosco — o primeiro objeto que você toca antes de qualquer prova.",
          "Um item do caso permanece lacrado até a etapa correta da investigação — sua abertura é parte da experiência.",
          "Impressas em papel fotográfico, com o verso numerado — exatamente como uma equipe pericial arquivaria."
        ]],
        [".mi-folder__tab", ["CONFIDENCIAL"]],
        [".mi-folder__stamp", ["CASO 04-7731"]],
        [".mi-envelope__seal", ["LACRADO"]],
        [".section--value .eyebrow", ["Composição do arquivo físico"]],
        [".value__title", ["O que cada peça representaria isoladamente"]],
        [".value__stack li span:first-child", [
          "Pasta de investigação personalizada",
          "Dossiê impresso e encadernado",
          "Fotografias reveladas das evidências",
          "Laudos periciais impressos",
          "Provas físicas do caso",
          "Envelope lacrado + brindes exclusivos"
        ]],
        [".value__total span", ["Valor de referência"]],
        [".stamp--once", ["ACESSO<br>ÚNICO"]],
        [".section--offer .eyebrow", ["Disponível apenas nesta página"]],
        [".offer__title", ["Kit Investigador Premium"]],
        [".offer__text", ["Este arquivo complementar é oferecido uma única vez, logo após a confirmação da compra.<br>Ao sair desta página, ele deixa de aparecer — não por estratégia, mas porque a experiência<br>foi pensada para acontecer neste exato momento da investigação."]],
        [".offer__price-note", ["ou em até 12x"]],
        ["#kiwify-upsell-trigger-", ["Evoluir para Kit Premium Impresso"]],
        ["#kiwify-upsell-cancel-trigger-", ["Manter Digitalmente"]],
        [".skip-link", ["Continuar apenas com o arquivo digital"]],
        [".section--guarantee h2", ["Garantia de integridade do material"]],
        [".section--guarantee p", ["Se algum item chegar danificado ou incompleto, você tem <strong>7 dias corridos</strong><br>após o recebimento para nos avisar — reenviamos a peça sem custo adicional."]],
        [".section--faq .eyebrow", ["Antes de decidir"]],
        [".faq__title", ["Perguntas sobre o arquivo físico"]],
        [".faq-item__question > span:first-child", [
          "O kit substitui a versão digital?",
          "Em quanto tempo o material chega?",
          "Funciona para investigar em grupo?",
          "Essa oferta aparece novamente depois?"
        ]],
        [".faq-item__answer p", [
          "Não. O kit físico complementa o arquivo digital — ele adiciona uma camada tátil à investigação que você já iniciou na tela.",
          "O prazo varia conforme a região, e é informado no checkout antes da confirmação final do envio.",
          "Sim — o formato físico foi desenhado especialmente para ser espalhado sobre uma mesa e investigado em dupla ou em grupo.",
          "Não. Ela é exibida uma única vez, imediatamente após a confirmação da compra digital."
        ]],
        [".site-footer__meta", ["Jogos investigativos digitais · <a href=\"https://pista-secreta.replit.app/\">pista-secreta.replit.app</a>"]],
        [".site-footer__legal", ["Todos os documentos e nomes deste caso são fictícios, criados para fins de entretenimento."]]
      ]
    },
    en: {
      title: "Pista Secreta — Bonus Case File Unlocked",
      description: "Part of this case goes beyond the screen. Discover the Premium Investigator Kit.",
      languageLabel: "Language",
      caseLabel: "CASE NO. 04-7731",
      progress: "FILE {current} / {total}",
      interruptText: "There is a part of this case that the digital file cannot deliver.",
      pins: ["Confirmation", "Interruption", "The Kit", "Experience", "Contents", "The Object", "Value", "Offer", "Unlock", "Guarantee", "Questions"],
      content: [
        [".stamp--approved", ["FILE<br>RELEASED"]],
        [".section--confirm .eyebrow", ["Purchase confirmed"]],
        [".confirm__title", ["Your access to the case<br>has been registered."]],
        [".confirm__text", ["The digital case file is now available in your investigation area.<br>Documents, statements, and evidence are ready for you to review."]],
        [".confirm__note", ["But there is one detail about this case that a screen cannot fully show."]],
        [".interrupt__label", ["Before you continue"]],
        [".section--intro .eyebrow", ["Additional access level"]],
        [".intro__title", ["Investigator Kit<br><em>Premium</em>"]],
        [".intro__subtitle", ["The investigation leaves the screen and reaches you — on paper, in ink,<br>with evidence you can hold in your own hands."]],
        [".benefit-card h3", ["The feel changes everything", "Made to be shared", "Feels like a real case file", "A keepsake, not just a product"]],
        [".benefit-card p", [
          "Hold a printed forensic report and feel the weight of a sealed envelope — a level of immersion no screen can reproduce.",
          "Spread the evidence across a table. Bring your fellow investigators together. The case takes on a new shape when you discuss it as a group, clue by clue.",
          "Every piece is designed to feel like a real investigation file — stamps, textures, and evidence numbering included.",
          "Once solved, the file does not disappear into a drawer — display it as a keepsake from the case you cracked."
        ]],
        [".section--manifest .eyebrow", ["Item manifest"]],
        [".manifest__title", ["What arrives at your door"]],
        [".manifest__name", [
          "Personalized investigation folder",
          "Complete printed and bound case file",
          "Developed evidence photographs",
          "Printed forensic reports",
          "Physical case evidence",
          "Sealed envelope with a confidential item",
          "Investigation-themed exclusive gifts"
        ]],
        [".mockup-text .eyebrow", ["Item 01", "Item 02", "Item 03"]],
        [".mockup-text h3", [
          "The folder that opens the investigation",
          "The envelope to open only at the right moment",
          "Developed scene photographs"
        ]],
        [".mockup-text p", [
          "Hard cover, numbered label, and matte finish — the first object you touch before examining any evidence.",
          "One case item stays sealed until the right stage of the investigation — opening it is part of the experience.",
          "Printed on photo paper and numbered on the back — just as a forensic team would file them."
        ]],
        [".mi-folder__tab", ["CONFIDENTIAL"]],
        [".mi-folder__stamp", ["CASE 04-7731"]],
        [".mi-envelope__seal", ["SEALED"]],
        [".section--value .eyebrow", ["Inside the physical file"]],
        [".value__title", ["What each item would cost on its own"]],
        [".value__stack li span:first-child", [
          "Personalized investigation folder",
          "Printed and bound case file",
          "Developed evidence photographs",
          "Printed forensic reports",
          "Physical case evidence",
          "Sealed envelope + exclusive gifts"
        ]],
        [".value__total span", ["Reference value"]],
        [".stamp--once", ["ONE-TIME<br>ACCESS"]],
        [".section--offer .eyebrow", ["Available on this page only"]],
        [".offer__title", ["Premium Investigator Kit"]],
        [".offer__text", ["This bonus file is offered once, right after your purchase is confirmed.<br>Once you leave this page, it will no longer appear — not as a sales tactic, but because the experience<br>is designed to happen at this exact moment in the investigation."]],
        [".offer__price-note", ["or up to 12 installments"]],
        ["#kiwify-upsell-trigger-", ["Upgrade to the Premium Printed Kit"]],
        ["#kiwify-upsell-cancel-trigger-", ["Keep the Digital Version"]],
        [".skip-link", ["Continue with the digital file only"]],
        [".section--guarantee h2", ["Material integrity guarantee"]],
        [".section--guarantee p", ["If any item arrives damaged or incomplete, you have <strong>7 calendar days</strong><br>after delivery to let us know — we will resend it at no extra cost."]],
        [".section--faq .eyebrow", ["Before you decide"]],
        [".faq__title", ["Questions about the physical file"]],
        [".faq-item__question > span:first-child", [
          "Does the kit replace the digital version?",
          "How long does delivery take?",
          "Can we investigate as a group?",
          "Will this offer appear again?"
        ]],
        [".faq-item__answer p", [
          "No. The physical kit complements the digital file, adding a hands-on layer to the investigation you have already started on screen.",
          "Delivery time varies by region and is shown at checkout before you confirm shipping.",
          "Yes — the physical format is designed to spread across a table and investigate together, as a pair or a group.",
          "No. It appears only once, right after your digital purchase is confirmed."
        ]],
        [".site-footer__meta", ["Digital investigation games · <a href=\"https://pista-secreta.replit.app/\">pista-secreta.replit.app</a>"]],
        [".site-footer__legal", ["All documents and names in this case are fictional and created for entertainment."]]
      ]
    },
    es: {
      title: "Pista Secreta — Archivo complementario desbloqueado",
      description: "Hay una parte de este caso que va más allá de la pantalla. Descubre el Kit Investigador Premium.",
      languageLabel: "Idioma",
      caseLabel: "CASO N.º 04-7731",
      progress: "ARCHIVO {current} / {total}",
      interruptText: "Hay una parte de este caso que el archivo digital no puede ofrecer.",
      pins: ["Confirmación", "Interrupción", "El kit", "Experiencia", "Contenido", "El objeto", "Valor", "Oferta", "Desbloquear", "Garantía", "Preguntas"],
      content: [
        [".stamp--approved", ["ARCHIVO<br>LIBERADO"]],
        [".section--confirm .eyebrow", ["Compra confirmada"]],
        [".confirm__title", ["Tu acceso al caso<br>ha sido registrado."]],
        [".confirm__text", ["La versión digital del expediente ya está disponible en tu área de investigación.<br>Los documentos, testimonios y pruebas están listos para que los revises."]],
        [".confirm__note", ["Pero hay un detalle de este caso que la pantalla no puede mostrar por completo."]],
        [".interrupt__label", ["Antes de continuar"]],
        [".section--intro .eyebrow", ["Nivel de acceso adicional"]],
        [".intro__title", ["Kit Investigador<br><em>Premium</em>"]],
        [".intro__subtitle", ["La investigación sale de la pantalla y llega hasta ti: en papel, con tinta,<br>y con pruebas que puedes sostener con tus propias manos."]],
        [".benefit-card h3", ["El tacto lo cambia todo", "Hecho para compartir", "Parece un expediente real", "Una pieza de colección"]],
        [".benefit-card p", [
          "Sostener un informe forense impreso y sentir el peso del sobre sellado: una inmersión que ninguna pantalla puede reproducir.",
          "Extiende las pruebas sobre la mesa. Reúne a quienes investigarán contigo. El caso cambia cuando se debate en grupo, pista por pista.",
          "Cada pieza está diseñada para parecer parte de un expediente real: sellos, texturas y numeración de evidencias.",
          "Una vez resuelto, el expediente no acaba en un cajón: queda expuesto como recuerdo del caso que descifraste."
        ]],
        [".section--manifest .eyebrow", ["Inventario de piezas"]],
        [".manifest__title", ["Lo que recibirás"]],
        [".manifest__name", [
          "Carpeta de investigación personalizada",
          "Expediente completo, impreso y encuadernado",
          "Fotografías reveladas de las pruebas",
          "Informes forenses impresos",
          "Pruebas físicas del caso",
          "Sobre sellado con un elemento confidencial",
          "Regalos exclusivos de la investigación"
        ]],
        [".mockup-text .eyebrow", ["Pieza 01", "Pieza 02", "Pieza 03"]],
        [".mockup-text h3", [
          "La carpeta que abre la investigación",
          "El sobre que solo debe abrirse en el momento indicado",
          "Fotografías reveladas de la escena"
        ]],
        [".mockup-text p", [
          "Tapa rígida, etiqueta numerada y acabado mate: el primer objeto que tocarás antes de examinar cualquier prueba.",
          "Un elemento del caso permanece sellado hasta la etapa adecuada de la investigación; abrirlo es parte de la experiencia.",
          "Impresas en papel fotográfico y numeradas al dorso, tal como las archivaría un equipo forense."
        ]],
        [".mi-folder__tab", ["CONFIDENCIAL"]],
        [".mi-folder__stamp", ["CASO 04-7731"]],
        [".mi-envelope__seal", ["SELLADO"]],
        [".section--value .eyebrow", ["Contenido del archivo físico"]],
        [".value__title", ["El valor de cada pieza por separado"]],
        [".value__stack li span:first-child", [
          "Carpeta de investigación personalizada",
          "Expediente impreso y encuadernado",
          "Fotografías reveladas de las pruebas",
          "Informes forenses impresos",
          "Pruebas físicas del caso",
          "Sobre sellado + regalos exclusivos"
        ]],
        [".value__total span", ["Valor de referencia"]],
        [".stamp--once", ["ACCESO<br>ÚNICO"]],
        [".section--offer .eyebrow", ["Disponible solo en esta página"]],
        [".offer__title", ["Kit Investigador Premium"]],
        [".offer__text", ["Este archivo complementario se ofrece una sola vez, justo después de confirmar la compra.<br>Al salir de esta página, dejará de aparecer; no como estrategia, sino porque la experiencia<br>está pensada para este momento exacto de la investigación."]],
        [".offer__price-note", ["o hasta en 12 cuotas"]],
        ["#kiwify-upsell-trigger-", ["Pasar al Kit Premium Impreso"]],
        ["#kiwify-upsell-cancel-trigger-", ["Conservar la versión digital"]],
        [".skip-link", ["Continuar solo con el archivo digital"]],
        [".section--guarantee h2", ["Garantía de integridad del material"]],
        [".section--guarantee p", ["Si algún elemento llega dañado o incompleto, tienes <strong>7 días corridos</strong><br>desde la entrega para avisarnos; lo reenviaremos sin costo adicional."]],
        [".section--faq .eyebrow", ["Antes de decidir"]],
        [".faq__title", ["Preguntas sobre el archivo físico"]],
        [".faq-item__question > span:first-child", [
          "¿El kit reemplaza la versión digital?",
          "¿Cuánto tarda en llegar el material?",
          "¿Se puede investigar en grupo?",
          "¿Volverá a aparecer esta oferta?"
        ]],
        [".faq-item__answer p", [
          "No. El kit físico complementa el archivo digital y añade una experiencia táctil a la investigación que ya empezaste en pantalla.",
          "El plazo varía según la región y se informa en el checkout antes de confirmar el envío.",
          "Sí: el formato físico está pensado para extenderse sobre una mesa e investigar en pareja o en grupo.",
          "No. Se muestra una sola vez, justo después de confirmar la compra digital."
        ]],
        [".site-footer__meta", ["Juegos de investigación digital · <a href=\"https://pista-secreta.replit.app/\">pista-secreta.replit.app</a>"]],
        [".site-footer__legal", ["Todos los documentos y nombres de este caso son ficticios y se crearon con fines de entretenimiento."]]
      ]
    }
  };

  function readLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return languages.includes(saved) ? saved : "pt-BR";
    } catch {
      return "pt-BR";
    }
  }

  function applyLanguage(language) {
    const selected = languages.includes(language) ? language : "pt-BR";
    const dictionary = copy[selected];
    document.documentElement.lang = selected;
    document.title = dictionary.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = dictionary.description;

    const caseLabel = document.querySelector(".case-bar__id");
    if (caseLabel) caseLabel.textContent = dictionary.caseLabel;
    document.querySelectorAll(".section[data-pin]").forEach((section, index) => {
      if (dictionary.pins[index] !== undefined) section.setAttribute("data-pin", dictionary.pins[index]);
    });

    dictionary.content.forEach(([selector, values]) => {
      const targets = selector.startsWith("#kiwify-upsell-")
        ? [document.querySelector(`[id^="${selector.slice(1)}"]`)].filter(Boolean)
        : Array.from(document.querySelectorAll(selector));
      targets.forEach((target, index) => {
        if (values[index] !== undefined) target.innerHTML = values[index];
      });
    });

    const selector = document.querySelector(".language-select");
    if (selector) {
      selector.value = selected;
      selector.setAttribute("aria-label", dictionary.languageLabel);
    }
  }

  window.upsellI18n = {
    text(key) {
      return copy[readLanguage()][key] ?? copy["pt-BR"][key] ?? "";
    },
    formatProgress(current, total) {
      return copy[readLanguage()].progress
        .replace("{current}", String(current).padStart(2, "0"))
        .replace("{total}", String(total));
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const selector = document.querySelector(".language-select");
    const initialLanguage = readLanguage();
    applyLanguage(initialLanguage);
    if (selector) {
      selector.addEventListener("change", () => {
        const nextLanguage = languages.includes(selector.value) ? selector.value : "pt-BR";
        try {
          localStorage.setItem(STORAGE_KEY, nextLanguage);
        } catch {
          // The language still changes for this page when storage is unavailable.
        }
        applyLanguage(nextLanguage);
        window.dispatchEvent(new Event("upsell-language-change"));
      });
    }
  });
})();
