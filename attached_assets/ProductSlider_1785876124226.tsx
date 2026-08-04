import { useState } from "react";

const images = [
  { src: "/product-1.jpg", caption: "Envelopes lacrados com pistas" },
  { src: "/product-2.jpg", caption: "Documentos e fotos do caso" },
  { src: "/product-3.jpg", caption: "Arquivos multimídia extraídos da investigação" },
  { src: "/product-4.jpg", caption: "Experiência para grupos" },
];

export function ProductSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
      <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
        O produto em suas mãos
      </h2>

      <div className="relative overflow-hidden rounded-md border border-primary/15 bg-white/5">
        <div className="relative h-64 md:h-80">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.caption}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Caption */}
          <div className="absolute bottom-4 left-6 right-6">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted">
              {images[current].caption}
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
        <div className="flex justify-center gap-2 py-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ver imagem ${i + 1}`}
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
