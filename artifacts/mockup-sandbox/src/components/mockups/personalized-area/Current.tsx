import { useState, type FormEvent, type ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
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

const productDetails: Record<Product, { name: string; summary: string; includes?: string; price: string; button: string }> = {
  digital: {
    name: "Kit Investigativo Personalizado DIGITAL",
    summary: "Uma investigação exclusiva, criada a partir de uma ideia, história ou homenagem sua, em uma página interativa da plataforma.",
    includes: "Interface de celular investigativa; conversas e mensagens; perfis e redes sociais fictícias; fotografias; documentos e arquivos; localizações; personagens personalizados; evidências e pistas interativas; narrativa com começo, desenvolvimento e resolução.",
    price: "R$ 247,00",
    button: "Escolher o kit digital",
  },
  physical: {
    name: "Kit Investigativo Personalizado FÍSICO",
    summary: "Uma caixa investigativa exclusiva, preparada especialmente para a sua história e enviada fisicamente.",
    includes: "Dossiê, fotografias, cartas e documentos, envelopes, evidências impressas, relatórios, materiais gráficos personalizados e outros elementos pertinentes à investigação.",
    price: "R$ 347,00 + frete",
    button: "Escolher o kit físico",
  },
  exclusive: {
    name: "EXPERIÊNCIA SUPER EXCLUSIVA",
    summary: "Para projetos especiais, histórias complexas, presentes-surpresa, pedidos de namoro ou casamento, homenagens e experiências híbridas.",
    includes: "Uma experiência criada sob medida, com múltiplas etapas físicas e digitais quando fizer sentido. Não é um pacote rígido.",
    price: "A partir de R$ 797,00; o orçamento pode chegar a R$ 1.300,00, conforme a complexidade.",
    button: "Solicitar orçamento",
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

export function Current() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>("digital");
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const product = selectedProduct ? productDetails[selectedProduct] : null;
  const updateField = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFormError("");
    setFields((current) => ({ ...current, [key]: value }));
  };

  function renderStep(): ReactNode {
    if (step === 0) {
      return (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-bold">O que você gostaria de criar?</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PURPOSES.map((purpose) => (
              <label key={purpose} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm hover:border-primary/45">
                <input type="radio" name="purpose" value={purpose} checked={fields.purpose === purpose} onChange={() => updateField("purpose", purpose)} className="accent-primary" />
                {purpose}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    if (step === 1) {
      const storyFields: Array<{ key: keyof Fields; label: string }> = [
        { key: "storyIdea", label: "Qual é a ideia, mesmo que ainda esteja incompleta?" },
        { key: "storyTransform", label: "O que você gostaria de transformar em experiência?" },
        { key: "storyReal", label: "Existe uma história real por trás? Se quiser, conte um pouco." },
        { key: "storyFeeling", label: "Que sensação você quer provocar em quem jogar?" },
        { key: "storyMustInclude", label: "Há algum acontecimento, segredo ou situação que precisa aparecer?" },
      ];
      return <div className="grid gap-5">{storyFields.map(({ key, label }) => <Field key={key} id={`briefing-${key}`} label={label} value={fields[key] as string} multiline onChange={(value) => updateField(key, value)} />)}</div>;
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
                <label key={style} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm hover:border-primary/45">
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
            <p className="mt-3 flex items-start gap-2 text-xs text-primary/80">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>Os dados e arquivos serão usados para avaliar e desenvolver esta solicitação. Os anexos ficam em armazenamento privado e só são acessíveis por pessoas autorizadas. Não publicaremos materiais no portfólio sem sua autorização separada.</span>
            </p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-white/[0.03] p-4">
            <p className="mb-4 text-sm leading-6">Para anexar arquivos, entre ou crie uma conta. O briefing pode continuar sem anexos.</p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="min-h-11 rounded bg-primary px-4 py-2 text-sm font-bold text-background">Entrar para anexar</button>
              <button type="button" className="min-h-11 rounded border border-primary/40 px-4 py-2 text-sm font-bold">Criar conta</button>
            </div>
            <p className="mt-3 text-xs text-muted">A autenticação e o envio de arquivos exigem login e não estão disponíveis nesta prévia.</p>
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
          {selectedProduct === "physical" && <label className="flex items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm sm:col-span-2"><input type="checkbox" className="mt-1 accent-primary" /><span>Tenho interesse na Experiência Digital adicional<span className="mt-1 block text-xs text-muted">Adicional opcional; valor informado no orçamento.</span></span></label>}
          <div className="sm:col-span-2"><Field id="briefing-additional-info" label="Mais alguma informação que ajude a entender a ideia?" value={fields.additionalInfo} onChange={(value) => updateField("additionalInfo", value)} multiline /></div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6"><input type="checkbox" checked={fields.consentProject} onChange={(event) => updateField("consentProject", event.target.checked)} className="mt-1 accent-primary" /><span>Autorizo o uso das informações deste briefing para analisar e elaborar o projeto.</span></label>
        <details className="rounded-md border border-primary/20 bg-white/[0.03] px-4 py-3"><summary className="cursor-pointer text-sm font-semibold">Como usaremos seus dados</summary><p className="mt-2 text-sm leading-6 text-muted">Os dados e arquivos serão usados para avaliar e desenvolver esta solicitação. Os anexos ficam em armazenamento privado e só são acessíveis por pessoas autorizadas. Não publicaremos materiais no portfólio sem sua autorização separada.</p></details>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6"><input type="checkbox" checked={fields.consentPrivacy} onChange={(event) => updateField("consentPrivacy", event.target.checked)} className="mt-1 accent-primary" /><span>Li e aceito o aviso de privacidade desta solicitação.</span></label>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6"><input type="checkbox" checked={fields.consentPortfolio} onChange={(event) => updateField("consentPortfolio", event.target.checked)} className="mt-1 accent-primary" /><span>Autorizo, opcionalmente, o uso do projeto em portfólio ou divulgação.</span></label>
      </div>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fields.name.trim() || !fields.email.trim() || fields.whatsapp.trim().length < 6) {
      setFormError("Preencha nome, e-mail e WhatsApp para enviar.");
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
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className={`flex items-center justify-between gap-4 ${product ? "mb-8" : "mb-12"}`}>
          <button type="button" onClick={() => product ? setSelectedProduct(null) : setSelectedProduct("digital")} className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground">
            {product ? "Voltar ao início" : "Voltar ao briefing"}
          </button>
          <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted">PT-BR</span>
        </header>

        {!product ? (
          <>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/80">INVESTIGAÇÕES PERSONALIZADAS</p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">Uma história que só poderia ser sua.</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">Escolha a experiência que combina com a sua ideia. Depois, conte o que imaginou — mesmo que ainda seja só o começo.</p>
              <p className="mt-4 text-sm text-primary/80">Valores em reais brasileiros (R$). O pagamento é combinado após a análise do escopo.</p>
            </div>
            <section aria-label="Investigações personalizadas" className="grid items-stretch gap-5 lg:grid-cols-3">
              {(Object.keys(productDetails) as Product[]).map((id) => {
                const item = productDetails[id];
                return (
                  <article key={id} className="flex flex-col rounded-xl border border-primary/20 bg-white/[0.04] p-5 md:p-6">
                    <h2 className="font-serif text-xl font-bold leading-tight">{item.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
                    <div className="mt-5 min-h-8 font-serif text-2xl font-bold text-primary">{item.price}</div>
                    {item.includes && <><h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-foreground">{id === "physical" ? "A caixa pode incluir" : "A experiência pode incluir"}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.includes}</p></>}
                    {id === "digital" && <p className="mt-4 text-xs leading-5 text-muted">O escopo é definido pela complexidade da história e pelo conjunto de materiais — sem limitar a experiência a uma quantidade fixa de aplicativos.</p>}
                    {id === "physical" && <p className="mt-3 text-xs leading-5 text-muted">O frete é calculado após a aprovação do projeto, conforme o CEP de entrega. Adicional digital opcional; valor informado no orçamento.</p>}
                    <button type="button" onClick={() => { setSelectedProduct(id); setStep(0); }} className="mt-auto inline-flex min-h-12 items-center justify-center rounded bg-primary px-4 py-3 text-sm font-bold text-background hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">{item.button}</button>
                  </article>
                );
              })}
            </section>
            <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-muted">Os dados e arquivos serão usados para avaliar e desenvolver esta solicitação. Os anexos ficam em armazenamento privado e só são acessíveis por pessoas autorizadas. Não publicaremos materiais no portfólio sem sua autorização separada.</p>
          </>
        ) : submitted ? (
          <section className="rounded-xl border border-primary/20 bg-white/[0.04] p-6 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">INVESTIGAÇÕES PERSONALIZADAS</p>
            <h2 className="mt-4 font-serif text-3xl font-bold">Recebemos sua ideia.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">Nossa equipe vai analisar a viabilidade e o escopo antes de enviar qualquer instrução de pagamento.</p>
            <p className="mt-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">Esta prévia não envia nem salva seu briefing; nenhum dado foi transmitido.</p>
            <button type="button" onClick={() => { setSubmitted(false); setSelectedProduct(null); }} className="mt-7 inline-flex min-h-11 items-center rounded bg-primary px-5 py-3 font-bold text-background">Voltar ao início</button>
          </section>
        ) : (
          <div className="mx-auto max-w-4xl">
            <form noValidate onSubmit={handleSubmit} className="relative rounded-xl border border-primary/20 bg-white/[0.04] p-5 md:p-9">
              <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <button type="button" onClick={() => setSelectedProduct(null)} className="mb-4 inline-flex min-h-10 items-center gap-2 text-sm text-muted hover:text-foreground"><ChevronLeft className="size-4" aria-hidden="true" />Voltar</button>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">SEU BRIEFING</p>
                  <h2 className="mt-2 font-serif text-2xl font-bold">{product.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-primary">{product.price}</p>
                  <p className="mt-2 text-xs leading-5 text-muted">Valores em reais brasileiros (R$). O pagamento é combinado após a análise do escopo.</p>
                  {selectedProduct === "physical" && <p className="mt-2 max-w-xl text-sm leading-6 text-muted">O frete é calculado após a aprovação do projeto, conforme o CEP de entrega.</p>}
                </div>
                <span className="rounded-full border border-primary/25 px-3 py-1 text-xs text-muted">Etapa {step + 1} de {STEPS.length}</span>
              </div>
              <div className="mb-7 flex gap-1.5" aria-hidden="true">{STEPS.map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-white/10"}`} />)}</div>
              <h3 className="mb-5 font-serif text-lg font-bold">{STEPS[step]}</h3>
              {renderStep()}
              {formError && <p role="alert" className="mt-5 rounded-md border border-red-300/25 bg-red-400/10 p-3 text-sm text-red-200">{formError}</p>}
              <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary/30 px-5 py-3 text-sm font-semibold disabled:invisible"><ChevronLeft className="size-4" aria-hidden="true" />Voltar</button>
                {step < STEPS.length - 1 ? (
                  <button type="button" onClick={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))} className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background">Continuar<ChevronRight className="size-4" aria-hidden="true" /></button>
                ) : (
                  <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background">Enviar briefing<Check className="size-4" aria-hidden="true" /></button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
