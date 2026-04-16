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
          alt="Classified files on a dark desk" 
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
          <p className="text-lg text-muted leading-relaxed max-w-lg">Você terá acesso às mesmas provas que um investigador teria: interrogatórios, arquivos ocultos e pistas do crime. Uma experiência investigativa imersiva para grupos de 2 a 6 pessoas. Provas reais, interrogatórios gravados, envelopes lacrados e um assassinato que precisa ser resolvido.</p>
        </header>

        <div className="h-px ultraviolet-gradient my-12 opacity-50 animate-in fade-in duration-1000 delay-300 fill-mode-both" />

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            Casos disponíveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative bg-white/5 border border-primary/15 rounded-md p-6 overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-12 scale-150 w-32 h-32 blur-xl bg-secondary rounded-full mix-blend-screen pointer-events-none" />
              
              <div className="font-mono text-[10px] tracking-widest text-muted mb-3 flex justify-between items-center">
                <span>Caso 001 - ARQUIVO CONFIDENCIAL</span>
                <span className="inline-block border border-primary/25 rounded px-2 py-0.5 text-[9px] text-primary/40 -rotate-2">
                  Em aberto
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">O Caso Wendel Jr</h3>
              <p className="text-sm text-muted mb-4 line-clamp-2">
                Uma morte cercada de segredos. Quem tinha motivo? Quem estava lá naquela noite?
              </p>
              <img src={case1Image} alt="Caso 001 envelope" className="w-full h-32 object-cover rounded border border-primary/10 grayscale group-hover:grayscale-0 transition-all opacity-80" />
            </div>

            <a
              href="https://pay.kiwify.com.br/ZG3gabG"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePurchaseClick}
              className="relative bg-white/5 border border-primary/15 rounded-md p-6 overflow-hidden group hover:border-primary/30 transition-colors block"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] card-gradient-top opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-12 scale-150 w-32 h-32 blur-xl bg-secondary rounded-full mix-blend-screen pointer-events-none" />
              
              <div className="font-mono text-[10px] tracking-widest text-muted mb-3 flex justify-between items-center">
                <span>Caso 002 - ARQUIVO CONFIDENCIAL</span>
                <span className="inline-block border border-primary/25 rounded px-2 py-0.5 text-[9px] text-primary/40 -rotate-2">
                  Em aberto
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">O Caso Universitário</h3>
              <p className="text-sm text-muted mb-4 line-clamp-2">
                Dentro do campus, ninguém é inocente. Cada pista leva a outro suspeito.
              </p>
              <img src={case2Image} alt="Caso 002 archive" className="w-full h-32 object-cover rounded border border-primary/10 grayscale group-hover:grayscale-0 transition-all opacity-80" />
            </a>
          </div>
        </section>

        <div className="h-px ultraviolet-gradient my-12 opacity-50 animate-in fade-in duration-1000 delay-400 fill-mode-both" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 fill-mode-both">
          <section className="bg-white/5 border border-primary/15 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="relative z-10">
              <h2 className="font-serif text-lg font-bold text-primary mb-4">O Caso Wendel Jr</h2>
              <div className="flex flex-col mb-1">
                <span className="font-serif text-4xl md:text-5xl font-bold text-primary whitespace-nowrap">R$ 47</span>
                <span className="text-sm text-muted mt-1">por caso · acesso completo e imediato</span>
              </div>
              <p className="font-mono text-xs text-muted tracking-wide mb-8">
                Ideal para 2–6 pessoas · date, amigos ou família
                <br />
                <br />
                Tempo médio: 1h - 2h
              </p>
              <a
                href="https://pay.kiwify.com.br/LfosEmV"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePurchaseClick}
                className="block w-full bg-primary/90 hover:bg-primary text-background border-none rounded p-4 font-serif text-lg font-bold text-center mb-8 transition-colors shadow-[0_0_20px_rgba(255,250,205,0.1)] hover:shadow-[0_0_30px_rgba(255,250,205,0.2)]"
              >Começar Investigação</a>
              <div className="border-t border-primary/10 pt-6">
                <p className="text-xs text-muted text-center italic mb-4">
                  ou entre na lista — seja o primeiro a saber dos novos casos
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-white/5 border-${error ? 'destructive' : 'primary/20'} focus-visible:ring-primary/30 h-12 font-serif text-base placeholder:text-primary/30`}
                  />
                  <Button
                    onClick={handleSignup}
                    variant="outline"
                    className="h-12 font-mono text-xs tracking-wider uppercase border-primary/25 hover:border-primary/40 hover:bg-white/5 hover:text-primary whitespace-nowrap"
                  >
                    Entrar na lista
                  </Button>
                </div>
                {success && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded text-sm text-primary text-center italic animate-in fade-in slide-in-from-top-2">
                    Anotado. Você será avisado quando o próximo caso chegar.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white/5 border border-primary/15 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="relative z-10">
              <h2 className="font-serif text-lg font-bold text-primary mb-4">O Caso Universitário</h2>
              <div className="flex flex-col mb-1">
                <span className="font-serif text-4xl md:text-5xl font-bold text-primary whitespace-nowrap">R$ 47</span>
                <span className="text-sm text-muted mt-1">por caso · acesso completo e imediato</span>
              </div>
              <p className="font-mono text-xs text-muted tracking-wide mb-8">
                Ideal para 2–6 pessoas · date, amigos ou família
                <br />
                <br />
                Tempo médio: 1h - 2h
              </p>
              <a
                href="https://pay.kiwify.com.br/ZG3gabG"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handlePurchaseClick}
                className="block w-full bg-primary/90 hover:bg-primary text-background border-none rounded p-4 font-serif text-lg font-bold text-center mb-8 transition-colors shadow-[0_0_20px_rgba(255,250,205,0.1)] hover:shadow-[0_0_30px_rgba(255,250,205,0.2)]"
              >Começar Investigação</a>
              <div className="border-t border-primary/10 pt-6">
                <p className="text-xs text-muted text-center italic mb-4">
                  ou entre na lista — seja o primeiro a saber dos novos casos
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`bg-white/5 border-${error ? 'destructive' : 'primary/20'} focus-visible:ring-primary/30 h-12 font-serif text-base placeholder:text-primary/30`}
                  />
                  <Button
                    onClick={handleSignup}
                    variant="outline"
                    className="h-12 font-mono text-xs tracking-wider uppercase border-primary/25 hover:border-primary/40 hover:bg-white/5 hover:text-primary whitespace-nowrap"
                  >
                    Entrar na lista
                  </Button>
                </div>
                {success && (
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded text-sm text-primary text-center italic animate-in fade-in slide-in-from-top-2">
                    Anotado. Você será avisado quando o próximo caso chegar.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <h2 className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-6">
            O que está no arquivo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "3 envelopes com pistas impressas",
              "Documentos e fotos do caso",
              "Áudios de interrogatório",
              "Vídeos ambientados na trama",
              "Playlist temática exclusiva",
              "PDF completo para imprimir"
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start text-sm text-muted">
                <span className="text-primary/80 mt-0.5 text-lg font-serif">›</span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <ProductSlider />

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
              <div key={i} className="flex gap-3 items-start text-sm text-muted">
                <span className="text-primary/80 mt-0.5 text-lg font-serif">›</span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSlider />

        <footer className="mt-12 animate-in fade-in duration-1000 delay-1000">
          <p className="text-[10px] md:text-xs text-primary/25 text-center font-mono tracking-widest uppercase">
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
