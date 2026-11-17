import { useState, useEffect } from "react";
import { useT } from "@/i18n/LanguageProvider";

const testimonials = [
  {
    name: "Ana Lima",
    location: "São Paulo, SP",
    stars: 5,
    textKey: "testimonial.ana.text",
  },
  {
    name: "Rafael Souza",
    location: "Belo Horizonte, MG",
    stars: 5,
    textKey: "testimonial.rafael.text",
  },
  {
    name: "Camila Torres",
    location: "Rio de Janeiro, RJ",
    stars: 5,
    textKey: "testimonial.camila.text",
  },
  {
    name: "Lucas Mendes",
    location: "Curitiba, PR",
    stars: 5,
    textKey: "testimonial.lucas.text",
  },
] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-primary/80 text-[11px]">★</span>
      ))}
    </div>
  );
}

export function TestimonialsSlider() {
  const tText = useT();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];
  const testimonialText = tText(t.textKey);

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
      <h2 className="font-mono tracking-[0.25em] uppercase text-muted mb-6 text-[21px]">
        {tText("site.investigatorsSay")}
      </h2>
      <div className="relative bg-white/5 border border-primary/15 rounded-md p-8 overflow-hidden min-h-[180px]">
        <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-50" />

        <div className="absolute top-4 right-6 font-serif text-6xl text-primary/10 leading-none select-none">
          "
        </div>

        <div key={current} className="animate-in fade-in duration-500">
          <Stars count={t.stars} />
          <p className="font-serif text-base text-primary/90 leading-relaxed mb-5 italic">
            {testimonialText}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-primary/70 tracking-wide">{t.name}</p>
              <p className="font-mono text-[10px] text-muted tracking-wide">{t.location}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label={tText("testimonial.previous")}
                className="w-7 h-7 flex items-center justify-center border border-primary/20 rounded text-primary/50 hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 font-serif focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label={tText("testimonial.next")}
                className="w-7 h-7 flex items-center justify-center border border-primary/20 rounded text-primary/50 hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 font-serif focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`${tText("testimonial.view")} ${i + 1}`}
              className="flex-1 py-2 -my-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 rounded-full"
            >
              <span className="block h-0.5 rounded-full bg-primary/20 overflow-hidden">
                <span
                  key={`${i}-${current}`}
                  className={`block h-full rounded-full bg-primary ${
                    i < current
                      ? "w-full"
                      : i === current
                      ? "testimonial-progress-fill"
                      : "w-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
