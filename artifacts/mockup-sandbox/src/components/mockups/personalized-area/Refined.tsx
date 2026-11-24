import { useState, type FormEvent, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, LockKeyhole, ShieldCheck } from "lucide-react";
import "./_group.css";

type Product = "digital" | "physical" | "exclusive";
type Fields = {
  purpose: string;
  storyIdea: string;
  storyTransform: string;
  storyReal: string;
  storyFeeling: string;
  storyMustInclude: string;
  charactersCount: string;
  charactersNames: string;
  charactersTraits: string;
  charactersProtagonist: string;
  charactersExclude: string;
  styles: string[];
  deadline: string;
  budgetRange: string;
  additionalInfo: string;
  name: string;
  email: string;
  whatsapp: string;
  consentProject: boolean;
  consentPrivacy: boolean;
  consentPortfolio: boolean;
};

const STEPS = ["O motivo", "A história", "Os personagens", "O estilo", "Referências", "Prazo e contato", "Permissões"];
const PURPOSES = [
  "Presentear alguém",
  "Preparar uma surpresa especial",
  "Transformar uma história real em investigação",
  "Criar uma história totalmente fictícia",
  "Desenvolver uma ideia própria",
  "Outra ideia",
];
const STYLES = [
  "Assassinato",
  "Desaparecimento",
  "Investigação criminal",
  "Mistério psicológico",
  "Suspense",
  "Conspiração",
  "Segredos familiares",
  "Romance e relacionamentos",
  "Sobrenatural",
  "Outro",
];
const EMPTY_FIELDS: Fields = {
  purpose: "",
  storyIdea: "",
  storyTransform: "",
  storyReal: "",
  storyFeeling: "",
  storyMustInclude: "",
  charactersCount: "",
  charactersNames: "",
  charactersTraits: "",
  charactersProtagonist: "",
  charactersExclude: "",
  styles: [],
  deadline: "",
  budgetRange: "",
  additionalInfo: "",
  name: "",
  email: "",
  whatsapp: "",
  consentProject: false,
  consentPrivacy: false,
  consentPortfolio: false,
};

const productDetails: Record<Product, { name: string; shortName: string; summary: string; includes?: string; price: string; button: string }> = {
  digital: {
    name: "Kit Investigativo Personalizado DIGITAL",
    shortName: "Digital",
    summary: "Uma investigação exclusiva, criada a partir de uma ideia, história ou homenagem sua, em uma página interativa da plataforma.",
    includes: "Interface de celular investigativa; conversas e mensagens; perfis e redes sociais fictícias; fotografias; documentos e arquivos; localizações; personagens personalizados; evidências e pistas interativas; narrativa com começo, desenvolvimento e resolução.",
    price: "R$ 247,00",
    button: "Quero o kit digital",
  },
  physical: {
    name: "Kit Investigativo Personalizado FÍSICO",
    shortName: "Físico",
    summary: "Uma caixa investigativa exclusiva, preparada especialmente para a sua história e enviada fisicamente.",
    includes: "Dossiê, fotografias, cartas e documentos, envelopes, evidências impressas, relatórios e materiais gráficos personalizados, selecionados para a investigação.",
    price: "R$ 347,00 + frete",
    button: "Quero o kit físico",
  },
  exclusive: {
    name: "Experiência super exclusiva",
    shortName: "Sob medida",
    summary: "Para projetos especiais, histórias complexas, presentes-surpresa, pedidos, homenagens e experiências híbridas.",
    includes: "Uma experiência criada sob medida, com múltiplas etapas físicas e digitais quando fizer sentido. Não é um pacote rígido.",
    price: "De R$ 797,00 a R$ 1.300,00",
    button: "Conversar sobre meu projeto",
  },
};

function Field({
  id,
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const controlClass =
    "mt-2 w-full rounded-md border border-primary/25 bg-black/20 px-3 py-3 text-sm text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
  return (
    <label htmlFor={id} className="block text-sm text-foreground">
      <span>{label}{required ? " *" : ""}</span>
      {multiline ? (
        <textarea
          id={id}
          className={`${controlClass} min-h-28 resize-y`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          id={id}
          className={controlClass}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
        />
      )}
    </label>
  );
}

export function Refined() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loginNotice, setLoginNotice] = useState(false);
  const product = selectedProduct ? productDetails[selectedProduct] : null;
  const updateField = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFormError("");
    setFields((current) => ({ ...current, [key]: value }));
  };

  function chooseProduct(id: Product) {
    setSelectedProduct(id);
    setStep(0);
    setSubmitted(false);
    setFormError("");
    window.setTimeout(() => document.getElementById("briefing")?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  }

  function renderStep(): ReactNode {
    if (step === 0) {
      return (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-bold">O que você gostaria de criar?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PURPOSES.map((purpose) => (
              <label key={purpose} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm transition-colors hover:border-primary/45">
                <input type="radio" name="purpose" value={purpose} checked={fields.purpose === purpose} onChange={() => updateField("purpose", purpose)} className="accent-primary" />
                {purpose}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    if (step === 1) {
      const storyFields: Array<{ key: keyof Fields; label: string; placeholder?: string }> = [
        { key: "storyIdea", label: "Qual é a ideia, mesmo que ainda esteja incompleta?", placeholder: "Pode começar por uma frase, uma lembrança ou uma pergunta." },
        { key: "storyTransform", label: "O que você gostaria de transformar em experiência?" },
        { key: "storyReal", label: "Existe uma história real por trás? Se quiser, conte um pouco." },
        { key: "storyFeeling", label: "Que sensação você quer provocar em quem jogar?" },
        { key: "storyMustInclude", label: "Há algum acontecimento, segredo ou situação que precisa aparecer?" },
      ];
      return <div className="grid gap-5">{storyFields.map(({ key, label, placeholder }) => <Field key={key} id={`briefing-${key}`} label={label} value={fields[key] as string} multiline placeholder={placeholder} onChange={(value) => updateField(key, value)} />)}</div>;
    }
    if (step === 2) {
      const characterFields: Array<{ key: keyof Fields; label: string; multiline?: boolean }> = [
        { key: "charactersCount", label: "Quantas pessoas devem fazer parte da história?" },
        { key: "charactersNames", label: "Nomes ou apelidos e relação entre as pessoas", multiline: true },
        { key: "charactersTraits", label: "Características importantes de cada personagem", multiline: true },
        { key: "charactersProtagonist", label: "Quem será o protagonista ou investigador?" },
        { key: "charactersExclude", label: "Alguém que não deve aparecer?" },
      ];
      return <div className="grid gap-5">{characterFields.map(({ key, label, multiline }) => <Field key={key} id={`briefing-${key}`} label={label} value={fields[key] as string} multiline={multiline} onChange={(value) => updateField(key, value)} />)}</div>;
    }
    if (step === 3) {
      return (
        <fieldset>
          <legend className="mb-4 text-sm leading-6">Que tipo de investigação combina com a ideia? Selecione quantos quiser.</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {STYLES.map((style) => {
              const checked = fields.styles.includes(style);
              return (
                <label key={style} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm transition-colors hover:border-primary/45">
                  <input type="checkbox" checked={checked} onChange={() => updateField("styles", checked ? fields.styles.filter((value) => value !== style) : [...fields.styles, style])} className="accent-primary" />
                  {style}
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    }
    if (step === 4) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="font-serif text-xl font-bold">Quer incluir materiais de referência?</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Você pode anexar imagens, PDFs, textos e documentos. Não envie arquivos que não tenha autorização para compartilhar.</p>
            <p className="mt-2 text-xs leading-5 text-muted">Formatos aceitos: JPG, PNG, WEBP, PDF, TXT, RTF e DOCX. Até 5 arquivos, 10 MB cada.</p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-primary/80">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>Referências são privadas, usadas somente por pessoas autorizadas para avaliar e desenvolver o projeto. Nada é publicado sem uma autorização separada.</span>
            </p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-white/[0.03] p-4">
            <p className="mb-4 text-sm leading-6">Para anexar arquivos, é necessário entrar ou criar uma conta. Você pode seguir sem anexos.</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setLoginNotice(true)} className="min-h-11 rounded bg-primary px-4 py-2 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">Entrar para anexar</button>
              <button type="button" onClick={() => setLoginNotice(true)} className="min-h-11 rounded border border-primary/40 px-4 py-2 text-sm font-bold transition-colors hover:bg-white/[0.06]">Criar conta</button>
            </div>
            {loginNotice && <p role="status" className="mt-3 rounded border border-primary/20 bg-primary/5 p-3 text-xs leading-5 text-muted">O acesso exige login e não está disponível nesta prévia. Nenhum arquivo foi selecionado ou enviado.</p>}
            <p className="mt-3 text-xs text-muted">Esta prévia não autentica contas nem recebe arquivos.</p>
          </div>
        </div>
      );
    }
    if (step === 5) {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="briefing-deadline" label="Existe um prazo desejado?" value={fields.deadline} onChange={(value) => updateField("deadline", value)} placeholder="Conte a data ou o período, se houver" />
          {selectedProduct === "exclusive" && <Field id="briefing-budget" label="Qual faixa de orçamento você tem em mente?" value={fields.budgetRange} onChange={(value) => updateField("budgetRange", value)} placeholder="Ex.: até R$ 1.000" />}
          <Field id="briefing-name" label="Seu nome" value={fields.name} onChange={(value) => updateField("name", value)} required autoComplete="name" />
          <Field id="briefing-email" label="Seu e-mail" value={fields.email} onChange={(value) => updateField("email", value)} type="email" required autoComplete="email" />
          <Field id="briefing-whatsapp" label="WhatsApp com DDD" value={fields.whatsapp} onChange={(value) => updateField("whatsapp", value)} type="tel" required autoComplete="tel" />
          {selectedProduct === "physical" && <label className="flex items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm sm:col-span-2"><input type="checkbox" className="mt-1 accent-primary" /><span>Tenho interesse na Experiência Digital adicional<span className="mt-1 block text-xs text-muted">Opcional; valor informado depois da análise do projeto.</span></span></label>}
          <div className="sm:col-span-2"><Field id="briefing-additional-info" label="Mais alguma informação que ajude a entender a ideia?" value={fields.additionalInfo} onChange={(value) => updateField("additionalInfo", value)} multiline /></div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6"><input type="checkbox" checked={fields.consentProject} onChange={(event) => updateField("consentProject", event.target.checked)} className="mt-1 accent-primary" /><span>Autorizo o uso das informações deste briefing para analisar e elaborar o projeto.</span></label>
        <details className="rounded-md border border-primary/20 bg-white/[0.03] px-4 py-3"><summary className="cursor-pointer text-sm font-semibold">Como cuidamos da sua privacidade</summary><p className="mt-2 text-sm leading-6 text-muted">As informações e referências são usadas somente para avaliar e desenvolver esta solicitação. O acesso é restrito a pessoas autorizadas. A publicação de materiais no portfólio depende de uma autorização opcional, separada.</p></details>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6"><input type="checkbox" checked={fields.consentPrivacy} onChange={(event) => updateField("consentPrivacy", event.target.checked)} className="mt-1 accent-primary" /><span>Li e aceito o aviso de privacidade desta solicitação.</span></label>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6"><input type="checkbox" checked={fields.consentPortfolio} onChange={(event) => updateField("consentPortfolio", event.target.checked)} className="mt-1 accent-primary" /><span>Autorizo, opcionalmente, o uso do projeto em portfólio ou divulgação.</span></label>
      </div>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fields.name.trim() || !fields.email.trim() || fields.whatsapp.trim().length < 6) {
      setFormError("Preencha nome, e-mail e WhatsApp para continuar.");
      setStep(5);
      return;
    }
    if (!fields.consentProject || !fields.consentPrivacy) {
      setFormError("Revise as informações e os consentimentos obrigatórios.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <style>{`
        .refined-page { --paper-line: hsl(var(--primary) / .18); }
        .refined-page .grain { pointer-events:none; position:absolute; inset:0; opacity:.18; background-image:radial-gradient(hsl(var(--primary) / .32) .55px,transparent .55px); background-size:7px 7px; mask-image:linear-gradient(to bottom,black,transparent 78%); }
        .refined-page .reveal { animation: refined-rise .75s both cubic-bezier(.2,.8,.2,1); }
        .refined-page .reveal-delay { animation-delay:.14s; }
        .refined-page .reveal-late { animation-delay:.26s; }
        @keyframes refined-rise { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .refined-page .paper-grid { background-image:linear-gradient(var(--paper-line) 1px,transparent 1px),linear-gradient(90deg,var(--paper-line) 1px,transparent 1px);background-size:34px 34px; }
        .refined-page .briefing-anchor { scroll-margin-top:24px; }
        @media (prefers-reduced-motion: reduce) { .refined-page .reveal { animation:none; } }
      `}</style>
      <div className="refined-page">
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-primary/15 px-5 py-5 md:px-10">
          <a href="#inicio" className="group flex items-center gap-3" aria-label="Pista Secreta, início">
            <span className="grid size-9 place-items-center border border-primary/50 font-mono text-sm text-primary transition-transform group-hover:rotate-45">P</span>
            <span className="font-serif text-lg tracking-wide">Pista Secreta</span>
          </a>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[.16em] text-muted md:flex">
            <a className="transition-colors hover:text-foreground" href="#processo">Como funciona</a>
            <a className="transition-colors hover:text-foreground" href="#experiencias">Experiências</a>
            <a className="transition-colors hover:text-foreground" href="#duvidas">Dúvidas</a>
          </nav>
          <a href="#experiencias" className="rounded-sm border border-primary/35 px-4 py-2 text-xs font-semibold tracking-wide transition-colors hover:bg-primary hover:text-background">Escolher experiência</a>
        </header>

        <section id="inicio" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-16 md:min-h-[610px] md:grid-cols-[1.08fr_.92fr] md:px-10 md:pb-24 md:pt-20">
          <div className="grain" aria-hidden="true" />
          <div className="relative z-10 reveal">
            <p className="font-mono text-[11px] uppercase tracking-[.28em] text-primary/80">INVESTIGAÇÕES FEITAS PARA UMA PESSOA SÓ</p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl font-bold leading-[1.05] md:text-7xl">Uma história sua.<br /><em className="font-normal text-primary">Uma investigação inesquecível.</em></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">Uma lembrança, uma homenagem, uma ideia guardada há anos. Conte o ponto de partida — nós transformamos em pistas, personagens e uma experiência para viver junto.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#experiencias" className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-6 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">Encontrar meu formato <ChevronRight className="size-4" /></a>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">A partir de R$ 247,00</span>
            </div>
            <div className="mt-12 flex items-center gap-4 border-t border-primary/20 pt-5">
              <span className="font-mono text-xs text-primary">01 — 03</span>
              <p className="max-w-sm text-xs leading-5 text-muted">Você não precisa chegar com a história pronta. A conversa começa pelo que importa para você.</p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg reveal reveal-delay">
            <div className="paper-grid relative aspect-[4/4.2] overflow-hidden border border-primary/30 bg-[#211831] p-6 shadow-2xl shadow-black/25 md:p-8">
              <div className="absolute inset-4 border border-dashed border-primary/20" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[.22em] text-primary/70">Arquivo confidencial</p>
                    <p className="mt-2 font-serif text-2xl italic">A primeira pista</p>
                  </div>
                  <span className="grid size-12 place-items-center rounded-full border border-primary/40 font-mono text-xs text-primary">PS<br />07</span>
                </div>
                <div className="relative mx-auto my-5 flex aspect-square w-[68%] items-center justify-center">
                  <div className="absolute inset-0 rotate-[-8deg] border border-primary/30" />
                  <div className="absolute inset-5 rotate-[5deg] border border-primary/20" />
                  <div className="relative flex size-36 items-center justify-center rounded-full border border-primary/50 bg-background/75">
                    <span className="font-serif text-6xl italic text-primary">?</span>
                  </div>
                  <span className="absolute left-0 top-1/4 h-px w-full rotate-[-24deg] bg-primary/40" />
                  <span className="absolute left-1/2 top-0 h-full w-px rotate-[17deg] bg-primary/25" />
                  <span className="absolute bottom-4 right-0 font-mono text-[9px] uppercase tracking-widest text-muted">Rastro 04 / reservado</span>
                </div>
                <div className="flex items-end justify-between border-t border-primary/20 pt-4">
                  <p className="max-w-[200px] font-serif text-lg leading-tight">O que você conhece<br />pode ser a chave.</p>
                  <span className="font-mono text-[10px] text-muted">CONFIDENCIAL<br />BRIEFING Nº 001</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[.18em] text-muted">Toda investigação começa com uma pergunta</p>
          </div>
        </section>

        <section id="processo" className="border-y border-primary/15 bg-black/10">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
            <div className="grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.24em] text-primary/80">Da ideia ao dossiê</p>
                <h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight md:text-5xl">O caminho é parte da história.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted md:justify-self-end">Sem briefing impossível e sem fórmulas prontas. Você compartilha o que sabe; a equipe Pista Secreta organiza os fios e propõe uma experiência que faz sentido para a sua ideia.</p>
            </div>
            <div className="mt-12 grid gap-0 border-y border-primary/20 md:grid-cols-3">
              {[
                { n: "01", title: "Você nos dá o ponto de partida", body: "Responda às perguntas no seu ritmo. Uma lembrança, um presente ou só uma boa ideia já bastam." },
                { n: "02", title: "A gente investiga as possibilidades", body: "Analisamos escopo, formato e complexidade. Se faltar alguma peça, conversamos antes de avançar." },
                { n: "03", title: "A história ganha forma", body: "Com o caminho alinhado, criamos uma investigação com pistas e detalhes que pertencem à sua história." },
              ].map((item, index) => (
                <article key={item.n} className={`relative py-7 md:px-7 md:py-9 ${index !== 0 ? "border-t border-primary/20 md:border-l md:border-t-0" : ""}`}>
                  <span className="font-mono text-xs tracking-widest text-primary">{item.n} / 03</span>
                  <h3 className="mt-5 max-w-xs font-serif text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencias" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="flex flex-col justify-between gap-6 border-b border-primary/20 pb-7 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.24em] text-primary/80">Três maneiras de entrar no caso</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">Escolha o formato.<br /><em className="font-normal">A história é sua.</em></h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted">Os valores são claros desde o início. O pagamento só é combinado depois da análise do escopo.</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1.05fr]">
            {(Object.keys(productDetails) as Product[]).map((id, index) => {
              const item = productDetails[id];
              return (
                <article key={id} className={`group flex flex-col border p-5 transition-colors duration-300 md:p-7 ${id === "exclusive" ? "border-primary/50 bg-primary/[.055]" : "border-primary/20 bg-white/[.025] hover:border-primary/45"}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[.2em] text-primary/80">Dossiê 0{index + 1}</span>
                    {id === "exclusive" && <span className="border border-primary/35 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-primary">Sob medida</span>}
                  </div>
                  <h3 className="mt-7 font-serif text-2xl font-bold leading-tight">{item.name}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted">{item.summary}</p>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[.17em] text-muted">Investimento</p>
                  <p className="mt-2 font-serif text-2xl font-bold text-primary">{item.price}</p>
                  {id === "physical" && <p className="mt-2 border-l-2 border-primary/50 pl-3 text-xs font-semibold leading-5 text-foreground">O frete é cobrado à parte. Calculado conforme o CEP após a aprovação do projeto.</p>}
                  {id === "exclusive" && <p className="mt-2 text-xs leading-5 text-muted">O orçamento final depende da complexidade e do formato combinado.</p>}
                  <div className="mt-7 border-t border-primary/20 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[.16em] text-foreground">{id === "physical" ? "O que pode chegar à sua porta" : "O que pode entrar no caso"}</p>
                    <p className="mt-3 text-xs leading-6 text-muted">{item.includes}</p>
                  </div>
                  {id === "digital" && <p className="mt-3 text-xs leading-5 text-muted">Escopo definido pela complexidade e pelos materiais — não por uma quantidade fixa de aplicativos.</p>}
                  {id === "physical" && <p className="mt-3 text-xs leading-5 text-muted">Experiência Digital adicional opcional; valor informado após análise.</p>}
                  <button type="button" onClick={() => chooseProduct(id)} className="mt-8 inline-flex min-h-12 items-center justify-between gap-3 border border-primary/40 px-4 py-3 text-left text-sm font-bold transition-all hover:border-primary hover:bg-primary hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {item.button}<ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </article>
              );
            })}
          </div>
          <p className="mt-5 text-xs leading-5 text-muted">Valores em reais brasileiros (R$). A experiência física custa R$ 347,00, com frete separado. Não há cobrança nesta página.</p>
        </section>

        <section className="border-y border-primary/15 bg-[#211831]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[.85fr_1.15fr] md:px-10 md:py-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.24em] text-primary/80">O que é seu, continua seu</p>
              <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight">Segredos bem guardados. Escolhas bem explicadas.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted">Uma história pessoal merece cuidado. Você decide o que dividir, e pode seguir sem anexar referências privadas.</p>
            </div>
            <div className="grid gap-0 border-y border-primary/20 sm:grid-cols-2 sm:border-b-0">
              <article className="border-b border-primary/20 py-5 sm:pr-7">
                <LockKeyhole className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl">Referências privadas</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Anexos exigem login. O acesso fica restrito a pessoas autorizadas e os arquivos não são públicos.</p>
              </article>
              <article className="border-b border-primary/20 py-5 sm:pl-7">
                <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl">Portfólio é opcional</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Nenhum material é usado para divulgação sem uma autorização específica, separada do projeto.</p>
              </article>
              <article className="py-5 sm:pr-7">
                <span className="font-mono text-xs text-primary">03 / 03</span>
                <h3 className="mt-4 font-serif text-xl">Escopo primeiro</h3>
                <p className="mt-2 text-sm leading-6 text-muted">A equipe avalia viabilidade, formato e investimento antes de qualquer instrução de pagamento.</p>
              </article>
              <article className="py-5 sm:pl-7">
                <span className="font-mono text-xs text-primary">SEM PRESSA</span>
                <h3 className="mt-4 font-serif text-xl">Pode começar simples</h3>
                <p className="mt-2 text-sm leading-6 text-muted">Conte só o que já sabe. O briefing pode ser preenchido sem anexos e sem uma ideia fechada.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="duvidas" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.24em] text-primary/80">Antes de abrir o caso</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Dúvidas<br /><em className="font-normal">de bastidor.</em></h2>
            </div>
            <div className="border-t border-primary/20">
              {[
                { q: "Preciso ter a história inteira pronta?", a: "Não. Uma ideia inicial, uma lembrança ou a intenção do presente já ajudam. O briefing serve para organizar o que você tem; a equipe pode conversar para entender o restante." },
                { q: "Como funciona o preço do kit físico?", a: "O kit custa R$ 347,00. O frete é separado e calculado de acordo com o CEP de entrega após a aprovação do projeto. Uma versão digital adicional é opcional e tem valor informado no orçamento." },
                { q: "O que está incluído na experiência exclusiva?", a: "Ela é desenhada caso a caso, por isso não existe pacote fixo. O investimento fica entre R$ 797,00 e R$ 1.300,00, conforme complexidade, etapas e materiais combinados." },
                { q: "Posso enviar fotos e documentos pessoais?", a: "Sim, se tiver autorização para compartilhá-los. Para anexar referências é necessário entrar em uma conta. Os arquivos ficam privados, com acesso restrito, e não são publicados." },
                { q: "O briefing já confirma a compra ou gera cobrança?", a: "Não. Ele registra sua ideia nesta prévia local e não transmite dados, inicia pagamento ou confirma contratação. O escopo e o investimento são alinhados antes de qualquer pagamento." },
              ].map((faq, index) => (
                <details key={faq.q} className="group border-b border-primary/20 py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-lg leading-snug marker:hidden">
                    <span><span className="mr-3 font-mono text-[10px] text-primary">0{index + 1}</span>{faq.q}</span>
                    <span className="mt-1 font-mono text-lg text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="ml-9 mt-4 max-w-2xl text-sm leading-7 text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-5 mb-14 border border-primary/35 bg-primary/[.055] md:mx-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-9 md:flex-row md:items-center md:px-10 md:py-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.24em] text-primary/80">O próximo capítulo começa aqui</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">Qual história você quer colocar sob investigação?</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Escolha o formato e conte o primeiro detalhe. Sem pagamento e sem compromisso nesta prévia.</p>
            </div>
            <a href="#experiencias" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-primary px-6 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">Ver formatos <ChevronRight className="size-4" /></a>
          </div>
        </section>

        {product && (
          <section id="briefing" className="briefing-anchor mx-auto max-w-5xl px-5 pb-16 md:px-10 md:pb-24">
            {submitted ? (
              <div className="border border-primary/30 bg-white/[.04] p-6 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[.2em] text-primary/80">INVESTIGAÇÕES PERSONALIZADAS</p>
                <h2 className="mt-4 font-serif text-3xl font-bold">Sua ideia está organizada.</h2>
                <p className="mt-3 max-w-2xl leading-7 text-muted">A equipe analisaria viabilidade e escopo antes de enviar qualquer instrução de pagamento.</p>
                <p className="mt-5 border border-primary/20 bg-background/50 p-4 text-sm leading-6 text-muted">Esta prévia não envia nem salva seu briefing; nenhum dado foi transmitido e nenhuma cobrança foi feita.</p>
                <button type="button" onClick={() => { setSubmitted(false); setSelectedProduct(null); document.getElementById("experiencias")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-7 inline-flex min-h-11 items-center border border-primary/40 px-5 py-3 font-bold transition-colors hover:bg-primary hover:text-background">Voltar aos formatos</button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="border border-primary/25 bg-white/[.035] p-5 md:p-9">
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <button type="button" onClick={() => { setSelectedProduct(null); setLoginNotice(false); }} className="mb-4 inline-flex min-h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><ChevronLeft className="size-4" aria-hidden="true" />Trocar formato</button>
                    <p className="font-mono text-xs uppercase tracking-[.2em] text-primary/80">SEU BRIEFING / {product.shortName.toUpperCase()}</p>
                    <h2 className="mt-2 font-serif text-2xl font-bold">{product.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-primary">{product.price}</p>
                    <p className="mt-2 text-xs leading-5 text-muted">O pagamento é combinado somente após a análise do escopo.</p>
                    {selectedProduct === "physical" && <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-foreground">O frete é separado do valor do kit e calculado conforme o CEP de entrega.</p>}
                    {selectedProduct === "exclusive" && <p className="mt-2 max-w-xl text-sm leading-6 text-muted">O orçamento final considera a complexidade e as etapas do seu projeto.</p>}
                  </div>
                  <span className="border border-primary/25 px-3 py-2 font-mono text-xs text-muted">ETAPA {step + 1} / {STEPS.length}</span>
                </div>
                <div className="mb-7 flex gap-1.5" aria-hidden="true">{STEPS.map((_, index) => <span key={index} className={`h-1 flex-1 transition-colors ${index <= step ? "bg-primary" : "bg-white/10"}`} />)}</div>
                <h3 className="mb-5 font-serif text-xl font-bold">{STEPS[step]}</h3>
                {renderStep()}
                {formError && <p role="alert" className="mt-5 border border-red-300/25 bg-red-400/10 p-3 text-sm text-red-200">{formError}</p>}
                <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-primary/20 pt-5 sm:flex-row">
                  <button type="button" onClick={() => { setFormError(""); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0} className="inline-flex min-h-11 items-center justify-center gap-2 border border-primary/30 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/[.04] disabled:invisible"><ChevronLeft className="size-4" aria-hidden="true" />Voltar</button>
                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={() => { setFormError(""); setStep((current) => Math.min(STEPS.length - 1, current + 1)); }} className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">Continuar<ChevronRight className="size-4" aria-hidden="true" /></button>
                  ) : (
                    <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5">Revisar meu briefing<Check className="size-4" aria-hidden="true" /></button>
                  )}
                </div>
                <p className="mt-4 text-center text-[11px] leading-5 text-muted">Prévia local: seus dados não são enviados, salvos ou usados para cobrança.</p>
              </form>
            )}
          </section>
        )}

        <footer className="border-t border-primary/15 px-5 py-7 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <span className="font-serif text-base text-foreground">Pista Secreta</span>
            <span>Histórias pessoais merecem investigações à altura.</span>
            <a className="transition-colors hover:text-foreground" href="#inicio">Voltar ao início ↑</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
