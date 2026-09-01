import { useState } from "react";
import type { ReactNode } from "react";
import { MessageSquare, Users, Play, Laptop, Smartphone, Fingerprint, Search, HelpCircle } from "lucide-react";

type Slide =
  | { type: "photo"; src: string; caption: string }
  | { type: "graphic"; caption: string; content: ReactNode };

const slides: Slide[] = [
  { type: "photo", src: "/product-1.jpg", caption: "Envelopes Digitais com Pistas" },
  { type: "photo", src: "/product-2.jpg", caption: "Documentos e fotos do caso" },
  { type: "photo", src: "/product-3.jpg", caption: "Arquivos multimídia extraídos da investigação" },
  { type: "photo", src: "/product-4.jpg", caption: "Experiência para grupos" },
  {
    type: "graphic",
    caption: "Conversas e mensagens dos suspeitos",
    content: (
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-secondary/10 blur-[90px] rounded-full mix-blend-screen" />
        <div className="relative flex flex-col gap-3 px-8 w-full max-w-xs">
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
        </div>
        <MessageSquare className="absolute top-6 right-6 w-6 h-6 text-primary/25" strokeWidth={1.5} />
        <p className="absolute bottom-14 left-0 right-0 text-center font-serif text-base md:text-lg font-bold px-8">
          Você vai precisar investigar o que eles disseram.
        </p>
      </div>
    ),
  },
  {
    type: "graphic",
    caption: "Múltiplos suspeitos, teorias e álibis",
    content: (
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-5 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-56 h-56 bg-secondary/10 blur-[90px] rounded-full mix-blend-screen" />
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-16 md:w-14 md:h-20 bg-white/10 border border-primary/20 rounded-sm flex items-center justify-center"
            >
              <Users className="w-5 h-5 text-primary/40" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <p className="font-serif text-lg md:text-xl font-bold text-center px-6 leading-tight">
          Vários suspeitos.<br />Várias teorias.<br />Uma verdade.
        </p>
      </div>
    ),
  },
  {
    type: "graphic",
    caption: "Confissão em vídeo no final do Caso",
    content: (
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-black/10">
        <div className="absolute inset-6 border border-primary/15 rounded-md pointer-events-none" />
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary/40 flex items-center justify-center bg-white/5">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-primary/80 ml-1" fill="currentColor" strokeWidth={0} />
        </div>
        <p className="font-serif text-lg md:text-xl font-bold text-center px-6">A verdade está no final.</p>
      </div>
    ),
  },
  {
    type: "graphic",
    caption: "Uma investigação  onde quiser (Em casa, no Date ou com Amigos)",
    content: (
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-5 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/10 blur-[90px] rounded-full mix-blend-screen" />
        <div className="flex items-center gap-4">
          <div className="w-14 h-10 md:w-16 md:h-11 border border-primary/25 rounded-sm bg-white/5 flex items-center justify-center">
            <Laptop className="w-5 h-5 text-primary/50" strokeWidth={1.5} />
          </div>
          <div className="h-px w-8 bg-primary/20" />
          <div className="w-7 h-11 md:w-8 md:h-12 border border-primary/25 rounded-sm bg-white/5 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-primary/50" strokeWidth={1.5} />
          </div>
        </div>
        <p className="font-serif text-lg md:text-xl font-bold text-center px-6 leading-tight">
          Uma investigação.<br />Onde você quiser.
        </p>
      </div>
    ),
  },
  {
    type: "graphic",
    caption: "Monte sua teoria com quem, como e por quê",
    content: (
      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
        <div className="grid grid-cols-3 gap-4 md:gap-8 px-6">
          {[
            { q: "QUEM?", Icon: Fingerprint },
            { q: "COMO?", Icon: Search },
            { q: "POR QUÊ?", Icon: HelpCircle },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="w-10 h-10 rounded-full border border-primary/25 bg-white/5 flex items-center justify-center">
                <item.Icon className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
              </span>
              <span className="font-serif text-sm md:text-base font-bold">{item.q}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function ProductSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
      <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
        O QUE VEM NO CASO
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
                <img src={slide.src} alt={slide.caption} className="w-full h-full object-cover" />
              ) : (
                slide.content
              )}
            </div>
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute bottom-4 left-6 right-6">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
              {slides[current].caption}
            </p>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/80 border border-primary/40 rounded-md text-primary hover:bg-background hover:border-primary/70 hover:scale-105 active:scale-95 transition-all duration-200 font-serif text-3xl shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-background/80 border border-primary/40 rounded-md text-primary hover:bg-background hover:border-primary/70 hover:scale-105 active:scale-95 transition-all duration-200 font-serif text-3xl shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 py-4 flex-wrap px-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ver slide ${i + 1}`}
              className="p-2 -m-2 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70"
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
