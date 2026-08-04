import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Ana Lima",
    location: "São Paulo, SP",
    stars: 5,
    text: "Passamos um bocado resolvendo e não paramos de rir e discutir as teorias. Melhor date que já fiz na vida.",
  },
  {
    name: "Rafael Souza",
    location: "Belo Horizonte, MG",
    stars: 5,
    text: "Eu e minha namorada não concordamos no final. Ela acertou e jogou na minha cara, mas só da experiência já valeu o pato!",
  },
  {
    name: "Camila Torres",
    location: "Rio de Janeiro, RJ",
    stars: 5,
    text: "Fiz com meu grupo de amigas pós a aula. A gente amou. Já queremos o próximo caso.",
  },
  {
    name: "Lucas Mendes",
    location: "Curitiba, PR",
    stars: 5,
    text: "Presente perfeito para quem ama mistério e suspense. Minha namorada ficou obcecada. Compramos os dois casos.",
  },
];

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
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
      <h2 className="font-mono tracking-[0.25em] uppercase text-muted mb-6 text-[21px]">
        O que dizem os investigadores
      </h2>
      <div className="relative bg-white/5 border border-primary/15 rounded-md p-8 overflow-hidden min-h-[180px]">
        <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-50" />

        <div className="absolute top-4 right-6 font-serif text-6xl text-primary/10 leading-none select-none">
          "
        </div>

        <div key={current} className="animate-in fade-in duration-500">
          <Stars count={t.stars} />
          <p className="font-serif text-base text-primary/90 leading-relaxed mb-5 italic">
            "{t.text}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs text-primary/70 tracking-wide">{t.name}</p>
              <p className="font-mono text-[10px] text-muted tracking-wide">{t.location}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Depoimento anterior"
                className="w-7 h-7 flex items-center justify-center border border-primary/20 rounded text-primary/50 hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 font-serif focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="Próximo depoimento"
                className="w-7 h-7 flex items-center justify-center border border-primary/20 rounded text-primary/50 hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 font-serif focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ver depoimento ${i + 1}`}
              className="py-2 -my-2 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 rounded-full"
            >
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-primary/20 w-2"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
