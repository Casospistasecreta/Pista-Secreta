import { useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { DeviceProvider, useDevice } from "./state/DeviceProvider";
import { DeviceFrame } from "./components/DeviceFrame";
import { LockScreen } from "./components/LockScreen";
import { HomeScreen } from "./components/HomeScreen";
import { getApp } from "./apps/registry";
import { getCase } from "./cases/registry";
import { useLanguage, useT } from "@/i18n/LanguageProvider";
import { pick } from "@/i18n/types";
import { updatePageMetadata } from "@/i18n/metadata";
import { trackEvent, wasInvestigationCompleted } from "@/lib/analytics";
import { isFinalAnswerSolved } from "./state/useFinalAnswer";
import "./investigacao.css";

function DeviceContent() {
  const { deviceUnlocked, current, stack, back } = useDevice();
  const stackRef = useRef(stack); const ignorePop = useRef(false); const fromPop = useRef(false); const prevLength = useRef(0); stackRef.current = stack;
  useEffect(() => { const length = stack.length; if (length > prevLength.current) for (let i = prevLength.current; i < length; i += 1) window.history.pushState({ investigacao: true }, ""); else if (length < prevLength.current) { const diff = prevLength.current - length; if (fromPop.current) fromPop.current = false; else { ignorePop.current = true; window.history.go(-diff); } } prevLength.current = length; }, [stack.length]);
  useEffect(() => { const onPop = () => { if (ignorePop.current) { ignorePop.current = false; return; } if (stackRef.current.length > 0) { fromPop.current = true; back(); } }; window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, [back]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" && stackRef.current.length > 0) back(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [back]);
  if (!deviceUnlocked) return <LockScreen />; if (!current) return <HomeScreen />; const app = getApp(current.app); if (!app) return <HomeScreen />; const AppComponent = app.component; return <AppComponent />;
}
function CaseNotFound({ slug }: { slug: string }) {
  const t = useT();
  return <div className="inv-root inv-stage flex min-h-[100dvh] flex-col items-center justify-center gap-3 px-8 text-center"><p className="inv-mono text-[10px] uppercase tracking-[.3em] text-[var(--inv-dim-2)]">{t("investigation.digital")}</p><h1 className="inv-display text-[26px]">{t("investigation.caseNotFound")}</h1><p className="max-w-[420px] text-[14px] text-[var(--inv-dim)]">{t("investigation.deviceNotRegistered", { slug })}</p><a href="/investigacao" className="inv-press inv-mono mt-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[.18em] text-[var(--inv-chiffon)]">{t("investigation.openDefault")}</a></div>;
}

function InvestigationJourneyTracker() {
  const { caseData, deviceUnlocked, current } = useDevice();
  const started = useRef(false);
  const activeApp = useRef<string>("home");
  activeApp.current = current?.app ?? "home";

  useEffect(() => {
    started.current = deviceUnlocked;
  }, [caseData.slug]);

  useEffect(() => {
    if (deviceUnlocked) started.current = true;
  }, [deviceUnlocked]);

  useEffect(() => {
    let reported = false;
    const reportAbandonment = () => {
      if (
        reported ||
        !started.current ||
        isFinalAnswerSolved(caseData.slug) ||
        wasInvestigationCompleted(caseData.slug)
      ) return;
      reported = true;
      trackEvent("investigation_abandon", {
        case_id: caseData.slug,
        app_id: activeApp.current,
      });
    };

    window.addEventListener("pagehide", reportAbandonment);
    return () => {
      window.removeEventListener("pagehide", reportAbandonment);
      reportAbandonment();
    };
  }, [caseData.slug]);

  return null;
}

export default function InvestigacaoPage() {
  const [, params] = useRoute<{ slug: string }>("/investigacao/:slug"); const slug = params?.slug; const caseData = getCase(slug);
  const { lang } = useLanguage();
  const t = useT();
  useEffect(() => {
    const title = caseData
      ? `${t("investigation.digital")} — ${pick(typeof caseData.title === "string" ? { "pt-BR": caseData.title } : caseData.title, lang)} | Pista Secreta`
      : `${t("investigation.digital")} | Pista Secreta`;
    updatePageMetadata(title, t("investigation.metaDescription"), lang);
  }, [caseData, lang, t]);
  useEffect(() => { const previous = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = previous; }; }, []);
  if (!caseData) return <CaseNotFound slug={slug ?? ""} />;
  return (
    <DeviceProvider caseData={caseData}>
      <InvestigationJourneyTracker />
      <DeviceFrame><DeviceContent /></DeviceFrame>
    </DeviceProvider>
  );
}