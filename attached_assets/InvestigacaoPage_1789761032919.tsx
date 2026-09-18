import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { DeviceProvider, useDevice } from "./state/DeviceProvider";
import { DeviceFrame } from "./components/DeviceFrame";
import { LockScreen } from "./components/LockScreen";
import { HomeScreen } from "./components/HomeScreen";
import { getApp } from "./apps/registry";
import { getCase } from "./cases/registry";
import "./investigacao.css";

/** Conteúdo do aparelho: bloqueio → home → aplicativo. */
function DeviceContent() {
  const { deviceUnlocked, current, stack, back } = useDevice();
  const stackRef = useRef(stack);
  const ignorePop = useRef(false);
  const fromPop = useRef(false);
  const prevLength = useRef(0);

  stackRef.current = stack;

  /* Integra a pilha interna com o botão "voltar" do navegador/celular. */
  useEffect(() => {
    const length = stack.length;
    if (length > prevLength.current) {
      for (let i = prevLength.current; i < length; i += 1) {
        window.history.pushState({ investigacao: true }, "");
      }
    } else if (length < prevLength.current) {
      const diff = prevLength.current - length;
      if (fromPop.current) {
        fromPop.current = false;
      } else {
        ignorePop.current = true;
        window.history.go(-diff);
      }
    }
    prevLength.current = length;
  }, [stack.length]);

  useEffect(() => {
    function onPopState() {
      if (ignorePop.current) {
        ignorePop.current = false;
        return;
      }
      if (stackRef.current.length > 0) {
        fromPop.current = true;
        back();
      }
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [back]);

  /* Atalho de teclado no desktop. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && stackRef.current.length > 0) back();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [back]);

  if (!deviceUnlocked) return <LockScreen />;
  if (!current) return <HomeScreen />;

  const app = getApp(current.app);
  if (!app) return <HomeScreen />;

  const AppComponent = app.component;
  return <AppComponent />;
}

function CaseNotFound({ slug }: { slug: string }) {
  return (
    <div className="inv-root inv-stage flex min-h-[100dvh] flex-col items-center justify-center gap-3 px-8 text-center">
      <p className="inv-mono text-[10px] uppercase tracking-[0.3em] text-[var(--inv-dim-2)]">
        Investigação Digital
      </p>
      <h1 className="inv-display text-[26px]">Caso não encontrado</h1>
      <p className="max-w-[420px] text-[14px] text-[var(--inv-dim)]">
        Nenhum dispositivo registrado para “{slug}”. Verifique o registro de casos em
        <span className="inv-mono"> src/investigacao/cases/registry.ts</span>.
      </p>
      <a
        href="/investigacao"
        className="inv-press inv-mono mt-2 rounded-full border border-[var(--inv-line-strong)] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--inv-chiffon)]"
      >
        Abrir caso padrão
      </a>
    </div>
  );
}

export default function InvestigacaoPage() {
  const [, params] = useRoute<{ slug: string }>("/investigacao/:slug");
  const slug = params?.slug;
  const caseData = getCase(slug);

  useEffect(() => {
    const previous = document.title;
    document.title = caseData
      ? `Investigação Digital — ${caseData.title} | Pista Secreta`
      : "Investigação Digital | Pista Secreta";
    return () => {
      document.title = previous;
    };
  }, [caseData]);

  /* O aparelho ocupa a viewport inteira: trava o scroll da página enquanto
     a experiência estiver aberta e devolve o estado original ao sair. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!caseData) return <CaseNotFound slug={slug ?? ""} />;

  return (
    <DeviceProvider caseData={caseData}>
      <DeviceFrame>
        <DeviceContent />
      </DeviceFrame>
    </DeviceProvider>
  );
}
