import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import case1Image from "@assets/1.png";
import case2Image from "@assets/2.png";
import { ProductSlider } from "@/components/ProductSlider";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";

const queryClient = new QueryClient();
const purchaseUrl = "https://kiwify.app/CzueX7E";

function getApiPath(path: string) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, "/");
}

function LandingPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [purchaseClicks, setPurchaseClicks] = useState<number | null>(null);
  const showStats = new URLSearchParams(window.location.search).get("stats") === "1";

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

  const handleSignup = () => {
    if (!email || !email.includes("@")) {
      setError(true);
      return;
    }
    setError(false);
    setSuccess(true);
    setEmail("");
  };

  const handlePurchaseClick = () => {
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
          <a
            href="https://pay.kiwify.com.br/LfosEmV"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handlePurchaseClick}
            className="bg-primary/90 hover:bg-primary text-background rounded px-8 py-4 font-serif text-lg font-bold transition-all duration-300 ease-out shadow-[0_0_24px_rgba(255,250,205,0.2)] hover:shadow-[0_0_42px_rgba(255,250,205,0.38)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Comece a Investigação
          </a>
        </div>

        <div className="h-px ultraviolet-gradient my-12 opacity-50 animate-in fade-in duration-1000 delay-300 fill-mode-both" />

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            Casos disponíveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="group relative bg-white/5 border border-primary/15 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />

              <div className="p-6 pb-4">
                <div className="font-mono text-[10px] tracking-widest text-muted mb-3 flex justify-between items-center">
                  <span>Caso 001 - ARQUIVO CONFIDENCIAL</span>
                  <span className="inline-block border border-primary/25 rounded px-2 py-0.5 text-[9px] text-primary/55 -rotate-2">
                    Em aberto
                  </span>
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
                  onClick={handlePurchaseClick}
                  className="block w-full bg-primary/90 hover:bg-primary text-background rounded p-4 font-serif text-lg font-bold text-center transition-all duration-300 ease-out shadow-[0_0_20px_rgba(255,250,205,0.1)] hover:shadow-[0_0_30px_rgba(255,250,205,0.2)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >Começar Investigação</a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white/5 border border-primary/15 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />

              <div className="p-6 pb-4">
                <div className="font-mono text-[10px] tracking-widest text-muted mb-3 flex justify-between items-center">
                  <span>Caso 002 - ARQUIVO CONFIDENCIAL</span>
                  <span className="inline-block border border-primary/25 rounded px-2 py-0.5 text-[9px] text-primary/55 -rotate-2">
                    Em aberto
                  </span>
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
                  onClick={handlePurchaseClick}
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
              "Pessoas que amam mistério e investigação",
              "Amigos em busca de desafios",
              "Casais que querem algo diferente",
              "Dates fora da caixinha"
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-center text-muted text-base md:text-lg font-medium">
                <span className="text-primary/80 text-lg font-serif shrink-0">›</span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSlider />

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
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
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
