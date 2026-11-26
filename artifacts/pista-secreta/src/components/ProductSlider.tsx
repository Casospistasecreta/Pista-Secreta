import { useEffect, useRef, useState } from "react";
import { MessageSquare, Users, Play, Laptop, Smartphone, Fingerprint, Search, HelpCircle } from "lucide-react";
import { useT, type TranslationKey } from "@/i18n/LanguageProvider";
import { trackEvent } from "@/lib/analytics";

type Slide =
  | { type: "photo"; src: string; captionKey: TranslationKey }
  | {
      type: "graphic";
      kind: "conversations" | "suspects" | "confession" | "anywhere" | "theory";
      captionKey: TranslationKey;
    };

const slides: Slide[] = [
  { type: "photo", src: "/product-1.jpg", captionKey: "slider.photo1Caption" },
  { type: "photo", src: "/product-2.jpg", captionKey: "slider.photo2Caption" },
  { type: "photo", src: "/product-3.jpg", captionKey: "slider.photo3Caption" },
  { type: "photo", src: "/product-4.jpg", captionKey: "slider.photo4Caption" },
  { type: "graphic", kind: "conversations", captionKey: "slider.conversationsCaption" },
  { type: "graphic", kind: "suspects", captionKey: "slider.suspectsCaption" },
  { type: "graphic", kind: "confession", captionKey: "slider.confessionCaption" },
  { type: "graphic", kind: "anywhere", captionKey: "slider.anywhereCaption" },
  { type: "graphic", kind: "theory", captionKey: "slider.theoryCaption" },
];

type Translator = ReturnType<typeof useT>;

function GraphicSlide({ kind, t }: { kind: Extract<Slide, { type: "graphic" }>["kind"]; t: Translator }) {
  if (kind === "conversations") {
    return (
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
        <img src="/slide-conversations.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-secondary/10 blur-[90px] rounded-full mix-blend-screen" />
        <div className="relative z-10 flex flex-col gap-3 px-8 w-full max-w-xs">
          <div className="self-start bg-white/10 border border-primary/15 rounded-lg rounded-bl-sm px-4 py-2.5 max-w-[80%]">
            <div className="h-1.5 w-24 bg-primary/30 rounded-full mb-1.5" />
            <div className="h-1.5 w-16 bg-primary/20 rounded-full" />
          </div>
          <div className="self-end bg-secondary/20 border border-secondary/30 rounded-lg rounded-br-sm px-4 py-2.5 max-w-[75%]">
            <div className="h-1.5 w-20 bg-primary/30 rounded-full" />
          </div>
          <div className="self-start bg-white/10 border border-primary/15 rounded-lg rounded-bl-sm px-4 py-2.5 max-w-[70%]">
            <div className="h-1.5 w-14 bg-primary/30 rounded-full" />
          </div>
          <MessageSquare className="absolute top-6 right-6 z-10 w-6 h-6 text-primary/70" strokeWidth={1.5} />
          <p className="text-center font-serif text-base md:text-lg font-bold px-8">{t("slider.investigateWhatTheySaid")}</p>
        </div>
      </div>
    );
  }

  if (kind === "suspects") {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-5 overflow-hidden">
        <img src="/slide-suspects.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-secondary/10 blur-[90px] rounded-full mix-blend-screen" />
        <div className="relative z-10 flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-12 h-16 md:w-14 md:h-20 bg-white/10 border border-primary/20 rounded-sm flex items-center justify-center">
              <Users className="w-5 h-5 text-primary/40" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <p className="relative z-10 font-serif text-lg md:text-xl font-bold text-center px-6 leading-tight">
          {t("slider.manySuspects")}<br />{t("slider.manyTheories")}<br />{t("slider.oneTruth")}
        </p>
      </div>
    );
  }

  if (kind === "confession") {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-black/10">
        <img src="/slide-confession.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary/70 flex items-center justify-center bg-background/45">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-primary/80 ml-1" fill="currentColor" strokeWidth={0} />
        </div>
        <p className="relative z-10 font-serif text-lg md:text-xl font-bold text-center px-6">{t("slider.truthAtEnd")}</p>
      </div>
    );
  }

  if (kind === "anywhere") {
    return (
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-5 overflow-hidden">
        <img src="/slide-anywhere.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/10 blur-[90px] rounded-full mix-blend-screen" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-10 md:w-16 md:h-11 border border-primary/25 rounded-sm bg-white/5 flex items-center justify-center">
            <Laptop className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
          </div>
          <div className="h-px w-8 bg-primary/20" />
          <div className="w-7 h-11 md:w-8 md:h-12 border border-primary/25 rounded-sm bg-white/5 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-primary/50" strokeWidth={1.5} />
          </div>
        </div>
        <p className="relative z-10 font-serif text-lg md:text-xl font-bold text-center px-6 leading-tight">
          {t("slider.investigationAnywhere")}<br />{t("slider.whereverYouWant")}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center gap-4 overflow-hidden">
      <img src="/slide-theory.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative z-10 grid grid-cols-3 gap-4 md:gap-8 px-6">
        {[
          { key: "slider.who", Icon: Fingerprint },
          { key: "slider.how", Icon: Search },
          { key: "slider.why", Icon: HelpCircle },
        ].map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-2">
            <span className="w-10 h-10 rounded-full border border-primary/25 bg-white/5 flex items-center justify-center">
              <item.Icon className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
            </span>
            <span className="font-serif text-sm md:text-base font-bold">{t(item.key as TranslationKey)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductSlider() {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const viewedSlides = useRef(new Set<number>());

  useEffect(() => {
    if (viewedSlides.current.has(current)) return;
    viewedSlides.current.add(current);
    trackEvent("product_content_view", {
      slide_index: current + 1,
      content_type: slides[current].type,
    });
  }, [current]);

  const goTo = (nextIndex: number) => {
    if (nextIndex === current) return;
    trackEvent("product_content_navigation", {
      from_slide: current + 1,
      to_slide: nextIndex + 1,
    });
    setCurrent(nextIndex);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
      <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
        {t("site.whatIsIncluded")}
      </h2>

      <div className="relative overflow-hidden rounded-md border border-primary/15 bg-white/5">
        <div className="relative h-64 md:h-80">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.type === "photo" ? (
                <img src={slide.src} alt={t(slide.captionKey)} className="w-full h-full object-cover" />
              ) : (
                <GraphicSlide kind={slide.kind} t={t} />
              )}
            </div>
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute bottom-4 left-6 right-6 z-20 pointer-events-none">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
              {t(slides[current].captionKey)}
            </p>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label={t("slider.previousImage")}
            className="absolute left-3 top-1/2 z-30 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/90 border border-primary/50 rounded-md text-primary hover:bg-background hover:border-primary/70 hover:scale-105 active:scale-95 transition-all duration-200 font-serif text-3xl shadow-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label={t("slider.nextImage")}
            className="absolute right-3 top-1/2 z-30 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/90 border border-primary/50 rounded-md text-primary hover:bg-background hover:border-primary/70 hover:scale-105 active:scale-95 transition-all duration-200 font-serif text-3xl shadow-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 py-4 flex-wrap px-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`${t("slider.viewSlide")} ${i + 1}`}
              className="p-2 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-4" : "bg-primary/25 w-1.5"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
