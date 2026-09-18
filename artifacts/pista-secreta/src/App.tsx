import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import NotFound from "@/pages/not-found";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import case1Image from "@assets/1.png";
import case2Image from "@assets/2.png";
import { ProductSlider } from "@/components/ProductSlider";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { trackClickBuy, trackViewCase, type CaseName } from "@/lib/analytics";
import {
  Search, Users, Heart, Compass,
  Folder, Image as ImageIcon, ClipboardList, MessageSquare, Mic, Video, Music,
} from "lucide-react";

const queryClient = new QueryClient();
const purchaseUrl = "https://kiwify.app/CzueX7E";
const InvestigacaoPage = lazy(() => import("@/investigacao/InvestigacaoPage"));

// Case/product metadata used for analytics events (view_case / click_buy).
const CASES: Record<CaseName, { name: CaseName; productName: string; value: number }> = {
  wendel_jr: { name: "wendel_jr", productName: "O Caso Wendel Jr", value: 27 },
  universitario: { name: "universitario", productName: "O Caso Universitário", value: 27 },
};

function getApiPath(path: string) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, "/");
}

function LandingPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [purchaseClicks, setPurchaseClicks] = useState<number | null>(null);
  const showStats = new URLSearchParams(window.location.search).get("stats") === "1";
  const case1CardRef = useRef<HTMLDivElement>(null);
  const case2CardRef = useRef<HTMLDivElement>(null);
  const viewedCasesRef = useRef<Set<CaseName>>(new Set());

  useEffect(() => {
    if (!showStats) {
      return;
    }

    fetch(getApiPath("api/analytics/purchase-clicks"))
      .then((response) => response.json())
      .then((data: { totalClicks?: number }) => {
        setPurchaseClicks(data.totalClicks ?? 0);
      })
      .catch(() => {
        setPurchaseClicks(0);
      });
  }, [showStats]);

  // view_case: fires once per case when its card in "Casos disponíveis"
  // scrolls into view (this single-page site doesn't have separate
  // case/product pages, so the visible card is the closest equivalent).
  useEffect(() => {
    const targets: Array<{ el: HTMLDivElement | null; caseName: CaseName }> = [
      { el: case1CardRef.current, caseName: "wendel_jr" },
      { el: case2CardRef.current, caseName: "universitario" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = targets.find((t) => t.el === entry.target);
          if (!target || viewedCasesRef.current.has(target.caseName)) return;

          viewedCasesRef.current.add(target.caseName);
          const caseInfo = CASES[target.caseName];
          trackViewCase({
            case_name: caseInfo.name,
            product_name: caseInfo.productName,
            value: caseInfo.value,
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    targets.forEach(({ el }) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSignup = () => {
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setError(false);
    setSuccess(true);
    setEmail("");
  };

  const handlePurchaseClick = (caseName: CaseName) => {
    const caseInfo = CASES[caseName];
    trackClickBuy({
      case_name: caseInfo.name,
      product_name: caseInfo.productName,
      value: caseInfo.value,
    });

    fetch(getApiPath("api/analytics/purchase-click"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination: purchaseUrl }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-secondary selection:text-foreground">
      <div className="noise-overlay" />
      {/* Background Hero */}
      <div className="absolute inset-0 z-0 h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-20" />
        <img 
          src="/hero-bg.png" 
          alt="Mesa de investigação com arquivos confidenciais, fotos e uma lupa" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        {/* Atmosfera investigativa sutil — acima do escurecimento para não ficar invisível, mas ainda inteiramente atrás do texto (protegido pelo z-10 do container de conteúdo, fora deste bloco) */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-secondary/10 blur-[100px] rounded-full mix-blend-screen animate-atmosphere-drift-1" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[90px] rounded-full mix-blend-screen animate-atmosphere-drift-2" />
          <svg
            className="absolute top-6 right-6 w-40 h-40 md:w-56 md:h-56 opacity-[0.12]"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="animate-atmosphere-threads">
              <path d="M100 40 C 60 90, 150 110, 40 160" stroke="#dc2626" strokeWidth="1" fill="none" />
              <path d="M100 40 C 140 70, 60 130, 150 150" stroke="#dc2626" strokeWidth="1" fill="none" />
            </g>
            <circle cx="100" cy="40" r="7" fill="none" stroke="#dc2626" strokeWidth="0.5" opacity="0.5" />
            <circle cx="100" cy="40" r="4" fill="#dc2626" className="animate-atmosphere-pin" />
          </svg>
        </div>
      </div>
      <div className="smoke-overlay" aria-hidden="true">
        <div className="smoke-wisp smoke-wisp-one" />
        <div className="smoke-wisp smoke-wisp-two" />
        <div className="smoke-wisp smoke-wisp-three" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-24">
        <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted">
              Pista Secreta &mdash; Experiências Investigativas
            </span>
            <div className="h-px flex-1 bg-primary/10" />
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
            Casos nunca resolvidos.
            <br />
            Até Agora...
          </h1>
          <p className="text-lg leading-[1.75] max-w-lg font-bold text-primary">Você terá acesso às mesmas provas que um investigador teria: interrogatórios, arquivos ocultos e pistas do crime. Uma experiência investigativa imersiva para grupos de 2 a 6 pessoas. Provas reais, interrogatórios gravados, pistas lacradas e um assassinato que precisa ser resolvido.</p>
        </header>

        <ProductSlider />

        <div className="flex justify-center my-8 animate-in fade-in duration-1000 delay-200 fill-mode-both">
          <button
            type="button"
            onClick={() => setCaseModalOpen(true)}
            className="bg-primary/90 hover:bg-primary text-background rounded px-8 py-4 font-serif text-lg font-bold transition-all duration-300 ease-out shadow-[0_0_24px_rgba(255,250,205,0.2)] hover:shadow-[0_0_42px_rgba(255,250,205,0.38)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Comece a Investigação
          </button>
        </div>

        <Dialog open={caseModalOpen} onOpenChange={setCaseModalOpen}>
          <DialogContent className="bg-background border-primary/20 text-foreground max-w-2xl">
            <DialogTitle className="font-serif text-2xl font-bold mb-0">Escolha seu caso</DialogTitle>
            <DialogDescription className="font-mono text-[10px] tracking-widest uppercase text-muted mb-2">
              Duas investigações disponíveis
            </DialogDescription>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="relative bg-white/5 border border-primary/15 rounded-lg overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70" />
                <div className="p-4">
                  <div className="font-mono text-[9px] tracking-widest text-muted mb-2">CASO 001</div>
                  <h4 className="font-serif text-lg font-bold mb-1">O Caso Wendel Jr</h4>
                  <p className="text-xs text-muted mb-3 leading-snug">
                    Futebol e intrigas. Um jogador famoso teve seu fim acidentalmente ou foi orquestrado?
                  </p>
                  <img src={case1Image} alt="Caso 001" className="w-full h-20 object-cover rounded border border-primary/10 opacity-90 mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-serif text-xl font-bold text-red-400">R$ 27</span>
                    <span className="font-serif text-sm text-muted/60 line-through">R$ 47</span>
                  </div>
                  <a
                    href="https://pay.kiwify.com.br/LfosEmV"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePurchaseClick("wendel_jr")}
                    className="block w-full bg-primary/90 hover:bg-primary text-background rounded p-2.5 font-serif text-sm font-bold text-center transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Escolher este caso
                  </a>
                </div>
              </div>

              <div className="relative bg-white/5 border border-primary/15 rounded-lg overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70" />
                <div className="p-4">
                  <div className="font-mono text-[9px] tracking-widest text-muted mb-2">CASO 002</div>
                  <h4 className="font-serif text-lg font-bold mb-1">O Caso Universitário</h4>
                  <p className="text-xs text-muted mb-3 leading-snug">
                    Dentro do campus, ninguém é inocente. Cada pista leva a outro suspeito.
                  </p>
                  <img src={case2Image} alt="Caso 002" className="w-full h-20 object-cover rounded border border-primary/10 opacity-90 mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-serif text-xl font-bold text-red-400">R$ 27</span>
                    <span className="font-serif text-sm text-muted/60 line-through">R$ 47</span>
                  </div>
                  <a
                    href="https://pay.kiwify.com.br/ZG3gabG"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePurchaseClick("universitario")}
                    className="block w-full bg-primary/90 hover:bg-primary text-background rounded p-2.5 font-serif text-sm font-bold text-center transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Escolher este caso
                  </a>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="h-px ultraviolet-gradient my-12 opacity-50 animate-in fade-in duration-1000 delay-300 fill-mode-both" />

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            Casos disponíveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div ref={case1CardRef} className="group relative bg-white/5 border border-primary/15 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />

              <div className="p-6 pb-4">
                <div className="font-mono text-[10px] tracking-widest text-muted mb-3 flex justify-between items-center">
                  <span>Caso 001 - ARQUIVO CONFIDENCIAL</span>
                  <span className="inline-block border border-primary/25 rounded px-2 py-0.5 text-[9px] text-primary/55 -rotate-2">
                    Em aberto
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-muted/70">Dificuldade</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`block w-3 h-1.5 rounded-sm ${
                          n <= 4 ? "bg-secondary/80" : "bg-primary/15 border border-primary/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-muted/70">4/5</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">O Caso Wendel Jr</h3>
                <p className="text-sm text-muted mb-4">
                   Futebol e intrigas. Um jogador famoso teve seu fim acidentalmente ou foi orquestrado?
                </p>
                <img src={case1Image} alt="Caso 001 envelope" className="w-full h-32 object-cover rounded border border-primary/10 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-6 pt-4 border-t border-primary/10 flex flex-col flex-1 justify-end">
                <div className="flex flex-col mb-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-serif text-4xl font-bold text-red-400 whitespace-nowrap">R$ 27</span>
                    <span className="font-serif text-xl text-muted/60 line-through whitespace-nowrap">R$ 47</span>
                    <span className="inline-block bg-red-400/15 text-red-400 text-[10px] font-mono font-bold tracking-wide rounded px-1.5 py-0.5 whitespace-nowrap">-43%</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-red-400/80 mt-1">Promoção de Lançamento</span>
                  <span className="text-sm text-muted mt-1">por caso · acesso completo e imediato</span>
                </div>
                <p className="font-mono text-xs text-muted tracking-wide mt-3 mb-5">
                  Ideal para 2–6 pessoas · date, amigos ou família<br />Tempo médio: 1h - 2h
                </p>
                <a
                  href="https://pay.kiwify.com.br/LfosEmV"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handlePurchaseClick("wendel_jr")}
                  className="block w-full bg-primary/90 hover:bg-primary text-background rounded p-4 font-serif text-lg font-bold text-center transition-all duration-300 ease-out shadow-[0_0_20px_rgba(255,250,205,0.1)] hover:shadow-[0_0_30px_rgba(255,250,205,0.2)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >Começar Investigação</a>
              </div>
            </div>

            {/* Card 2 */}
            <div ref={case2CardRef} className="group relative bg-white/5 border border-primary/15 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />

              <div className="p-6 pb-4">
                <div className="font-mono text-[10px] tracking-widest text-muted mb-3 flex justify-between items-center">
                  <span>Caso 002 - ARQUIVO CONFIDENCIAL</span>
                  <span className="inline-block border border-primary/25 rounded px-2 py-0.5 text-[9px] text-primary/55 -rotate-2">
                    Em aberto
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-muted/70">Dificuldade</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={`block w-3 h-1.5 rounded-sm ${
                          n <= 3 ? "bg-secondary/80" : "bg-primary/15 border border-primary/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-muted/70">3/5</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-2">O Caso Universitário</h3>
                <p className="text-sm text-muted mb-4">
                  Dentro do campus, ninguém é inocente. Cada pista leva a outro suspeito.
                </p>
                <img src={case2Image} alt="Caso 002 archive" className="w-full h-32 object-cover rounded border border-primary/10 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-6 pt-4 border-t border-primary/10 flex flex-col flex-1 justify-end">
                <div className="flex flex-col mb-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-serif text-4xl font-bold text-red-400 whitespace-nowrap">R$ 27</span>
                    <span className="font-serif text-xl text-muted/60 line-through whitespace-nowrap">R$ 47</span>
                    <span className="inline-block bg-red-400/15 text-red-400 text-[10px] font-mono font-bold tracking-wide rounded px-1.5 py-0.5 whitespace-nowrap">-43%</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-red-400/80 mt-1">Promoção de Lançamento</span>
                  <span className="text-sm text-muted mt-1">por caso · acesso completo e imediato</span>
                </div>
                <p className="font-mono text-xs text-muted tracking-wide mt-3 mb-5">
                  Ideal para 2–6 pessoas · date, amigos ou família<br />Tempo médio: 1h - 2h
                </p>
                <a
                  href="https://pay.kiwify.com.br/ZG3gabG"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handlePurchaseClick("universitario")}
                  className="block w-full bg-primary/90 hover:bg-primary text-background rounded p-4 font-serif text-lg font-bold text-center transition-all duration-300 ease-out shadow-[0_0_20px_rgba(255,250,205,0.1)] hover:shadow-[0_0_30px_rgba(255,250,205,0.2)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >Começar Investigação</a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            Para quem é isso?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { text: "Pessoas que amam mistério e investigação", Icon: Search },
              { text: "Amigos em busca de desafios", Icon: Users },
              { text: "Casais que querem algo diferente", Icon: Heart },
              { text: "Dates fora da caixinha", Icon: Compass },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-center text-muted text-base md:text-lg font-medium">
                <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded border border-primary/20 bg-white/5 text-primary/70 -rotate-2">
                  <item.Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                </span>
                <span className="text-primary/80 text-lg font-serif shrink-0">›</span>
                <span className="leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSlider />

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            Como funciona
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            {[
              { n: "01", title: "Compre", desc: "Receba seu caso investigativo." },
              { n: "02", title: "Investigue", desc: "Analise documentos, evidências, depoimentos, áudios e vídeos." },
              { n: "03", title: "Descubra", desc: "Monte sua teoria e descubra se você conseguiu solucionar o caso." },
            ].map((step, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${
                  i > 0 ? "sm:pl-4 sm:border-l sm:border-primary/10 pt-4 sm:pt-0 border-t sm:border-t-0 border-primary/10" : ""
                }`}
              >
                <span className="font-serif text-2xl font-bold text-primary/70">{step.n}</span>
                <h3 className="font-serif text-base font-bold">{step.title}</h3>
                <p className="text-sm text-muted leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-800 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            O kit de evidências
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Dossiê", Icon: Folder },
              { label: "Fotografias", Icon: ImageIcon },
              { label: "Laudos", Icon: ClipboardList },
              { label: "Conversas", Icon: MessageSquare },
              { label: "Áudios", Icon: Mic },
              { label: "Vídeos", Icon: Video },
              { label: "Trilha sonora", Icon: Music },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-2 bg-white/5 border border-primary/15 rounded-lg py-4 px-2 text-center transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07]"
              >
                <span className="w-9 h-9 flex items-center justify-center rounded border border-primary/25 bg-white/5 text-primary/80 -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  <item.Icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="font-mono text-[9px] tracking-widest uppercase text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 animate-in fade-in duration-1000 delay-1000">
          <p className="text-[10px] md:text-xs text-primary/45 text-center font-mono tracking-widest uppercase">
            Entrega digital imediata &nbsp;&middot;&nbsp; Sem assinatura &nbsp;&middot;&nbsp; Compatível com qualquer dispositivo
          </p>
          {showStats && (
            <p className="mt-4 text-[10px] md:text-xs text-primary/40 text-center font-mono tracking-widest uppercase">
              Cliques no botão: {purchaseClicks ?? "carregando"}
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

function Router() {
  const investigacao = (
    <Suspense fallback={<div style={{ minHeight: "100dvh", background: "#060409" }} />} >
      <InvestigacaoPage />
    </Suspense>
  );
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/investigacao">{investigacao}</Route>
      <Route path="/investigacao/:slug">{investigacao}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
