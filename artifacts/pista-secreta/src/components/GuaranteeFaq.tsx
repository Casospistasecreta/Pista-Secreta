import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT, type TranslationKey } from "@/i18n/LanguageProvider";
import {
  Lock,
  Mail,
  Save,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const GUARANTEE_DAYS = 7;
const SUPPORT_EMAIL = "casospistasecreta@gmail.com";

const PERKS: Array<{ Icon: LucideIcon; title: TranslationKey; description: TranslationKey }> = [
  {
    Icon: Zap,
    title: "site.guarantee.perk.immediate",
    description: "site.guarantee.perk.immediateDescription",
  },
  {
    Icon: Smartphone,
    title: "site.guarantee.perk.browser",
    description: "site.guarantee.perk.browserDescription",
  },
  {
    Icon: Mail,
    title: "site.guarantee.perk.support",
    description: "site.guarantee.perk.supportDescription",
  },
];

const FAQ: Array<{
  id: string;
  Icon: LucideIcon;
  question: TranslationKey;
  answer: TranslationKey;
}> = [
  {
    id: "delivery",
    Icon: Zap,
    question: "site.guarantee.faq.deliveryQuestion",
    answer: "site.guarantee.faq.deliveryAnswer",
  },
  {
    id: "installation",
    Icon: Smartphone,
    question: "site.guarantee.faq.installQuestion",
    answer: "site.guarantee.faq.installAnswer",
  },
  {
    id: "difficulty",
    Icon: Search,
    question: "site.guarantee.faq.difficultyQuestion",
    answer: "site.guarantee.faq.difficultyAnswer",
  },
  {
    id: "group",
    Icon: Users,
    question: "site.guarantee.faq.groupQuestion",
    answer: "site.guarantee.faq.groupAnswer",
  },
  {
    id: "progress",
    Icon: Save,
    question: "site.guarantee.faq.progressQuestion",
    answer: "site.guarantee.faq.progressAnswer",
  },
  {
    id: "payment",
    Icon: Lock,
    question: "site.guarantee.faq.paymentQuestion",
    answer: "site.guarantee.faq.paymentAnswer",
  },
  {
    id: "support",
    Icon: Mail,
    question: "site.guarantee.faq.supportQuestion",
    answer: "site.guarantee.faq.supportAnswerBefore",
  },
];

function IconTile({ Icon, large = false }: { Icon: LucideIcon; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`group flex shrink-0 items-center justify-center rounded border border-primary/25 bg-white/5 text-primary/80 transition-transform duration-300 group-hover:rotate-0 ${
        large ? "h-11 w-11" : "h-9 w-9"
      } -rotate-2`}
    >
      <Icon className={large ? "h-5 w-5" : "h-4 w-4"} strokeWidth={1.75} />
    </span>
  );
}

export function GuaranteeFaq() {
  const t = useT();

  return (
    <>
      <section
        id="garantia"
        className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both"
      >
        <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {t("site.guarantee.title")}
        </h2>

        <div className="relative overflow-hidden rounded-lg border border-primary/15 bg-white/5">
          <div className="card-gradient-top absolute left-0 right-0 top-0 h-[2px] opacity-70" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/15 blur-[90px] mix-blend-screen"
          />
          <span className="absolute right-4 top-4 rotate-6 rounded-sm border border-red-400/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-red-400/80">
            {t("site.guarantee.riskZero")}
          </span>

          <div className="relative p-6 pt-12 text-center">
            <div
              aria-hidden="true"
              className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center"
            >
              <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-primary/40 motion-reduce:animate-none" />
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-primary/60 bg-gradient-to-b from-secondary/30 to-background shadow-[0_0_36px_-6px_hsl(var(--secondary)/0.6)]">
                <ShieldCheck className="mb-0.5 h-5 w-5 text-primary/80" strokeWidth={1.75} />
                <span className="font-serif text-4xl font-bold leading-none">{GUARANTEE_DAYS}</span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                  {t("site.guarantee.daysUnit")}
                </span>
              </div>
            </div>

            <h3 className="mb-3 font-serif text-2xl font-bold leading-tight">
              {t("site.guarantee.heading")}
            </h3>
            <p className="mx-auto max-w-md text-base leading-relaxed text-muted md:text-lg">
              {t("site.guarantee.bodyBefore")}{" "}
              <strong className="text-primary">
                {GUARANTEE_DAYS} {t("site.guarantee.daysUnit")}
              </strong>{" "}
              {t("site.guarantee.bodyBetween")}{" "}
              <strong className="text-primary">{t("site.guarantee.refundAmount")}</strong>
              {t("site.guarantee.bodyAfter")}
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:text-center">
              {PERKS.map(({ Icon, title, description }) => (
                <li
                  key={title}
                  className="group flex items-center gap-3 rounded-lg border border-primary/15 bg-white/5 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07] sm:flex-col sm:gap-2"
                >
                  <IconTile Icon={Icon} large />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary/90">
                      {t(title)}
                    </div>
                    <p className="mt-1 text-sm leading-snug text-muted">{t(description)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="duvidas"
        className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both"
      >
        <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
          {t("site.guarantee.faqTitle")}
        </h2>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQ.map(({ id, Icon, question, answer }) => (
            <AccordionItem
              key={id}
              value={`faq-${id}`}
              className="group relative overflow-hidden rounded-lg border border-primary/15 bg-white/5 transition-all duration-300 hover:border-primary/30 data-[state=open]:border-primary/40 data-[state=open]:bg-white/[0.07]"
            >
              <div className="card-gradient-top absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity group-data-[state=open]:opacity-70" />
              <AccordionTrigger className="gap-3 px-4 py-3.5 text-left hover:no-underline [&>svg]:text-primary/60">
                <span className="flex flex-1 items-center gap-3">
                  <IconTile Icon={Icon} />
                  <span className="font-serif text-[15px] font-bold leading-snug md:text-base">
                    {t(question)}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pl-[4rem] text-sm leading-relaxed text-muted md:text-[15px]">
                {id === "support" ? (
                  <>
                    {t(answer)}{" "}
                    <a
                      href={`mailto:${SUPPORT_EMAIL}`}
                      className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                    >
                      {SUPPORT_EMAIL}
                    </a>
                    {t("site.guarantee.faq.supportAnswerAfter")}
                  </>
                ) : (
                  t(answer, { days: GUARANTEE_DAYS })
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-primary/50">
          {t("site.guarantee.faq.moreQuestions")}{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-primary/80 underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          >
            {t("site.guarantee.faq.contact")}
          </a>
        </p>
      </section>
    </>
  );
}

export default GuaranteeFaq;
