import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { ShieldCheck } from "lucide-react";
import { useLanguage, useT } from "@/i18n/LanguageProvider";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
  syncAnalyticsConsent,
  trackEvent,
  trackPageView,
  type AnalyticsConsent,
} from "@/lib/analytics";
import {
  captureEntryAttribution,
  getPageContext,
  getPageViewParams,
  persistAttributionAfterConsent,
  safeNavigationPath,
  safePagePath,
} from "@/lib/analyticsAttribution";

function routePath(path: string): string {
  const clean = safePagePath(path);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base && base !== "/" && clean.startsWith(base) ? clean.slice(base.length) || "/" : clean;
}

function publicPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const route = path.startsWith("/") ? path : `/${path}`;
  return `${base}${route}` || "/";
}

function ConsentPanel({
  consent,
  onSave,
}: {
  consent: AnalyticsConsent | null;
  onSave: (next: AnalyticsConsent) => void;
}) {
  const t = useT();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<AnalyticsConsent>({ analytics: false, marketing: false });
  const panelVisible = consent === null || settingsOpen;

  function openSettings() {
    setDraft(consent ?? { analytics: false, marketing: false });
    setSettingsOpen(true);
  }

  function save(next: AnalyticsConsent) {
    onSave(next);
    setSettingsOpen(false);
  }

  return (
    <>
      {panelVisible ? (
        <section
          data-analytics-exclude
          aria-labelledby="analytics-consent-title"
          className="fixed bottom-3 left-3 z-[100] max-h-[82dvh] w-[min(34rem,calc(100vw-1.5rem))] overflow-y-auto rounded-xl border border-primary/25 bg-background/95 p-4 text-foreground shadow-2xl backdrop-blur-md sm:bottom-4 sm:left-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div className="min-w-0">
              <h2 id="analytics-consent-title" className="font-serif text-lg font-bold">
                {t("analytics.consent.title")}
              </h2>
              <p className="mt-1 text-sm leading-5 text-muted">{t("analytics.consent.description")}</p>
            </div>
          </div>

          {settingsOpen && (
            <div className="mt-4 space-y-3 rounded-lg border border-primary/15 bg-white/[0.03] p-3">
              <p className="text-xs leading-5 text-muted">{t("analytics.consent.settingsDescription")}</p>
              <div className="flex items-start gap-3">
                <input type="checkbox" checked disabled aria-label={t("analytics.consent.necessary")} className="mt-1 accent-primary" />
                <div>
                  <p className="text-sm font-semibold">{t("analytics.consent.necessary")}</p>
                  <p className="text-xs leading-5 text-muted">{t("analytics.consent.necessaryDescription")}</p>
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="block text-sm font-semibold">{t("analytics.consent.analytics")}</span>
                  <span className="block text-xs leading-5 text-muted">{t("analytics.consent.analyticsDescription")}</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(event) => setDraft((current) => ({ ...current, marketing: event.target.checked }))}
                  className="mt-1 accent-primary"
                />
                <span>
                  <span className="block text-sm font-semibold">{t("analytics.consent.marketing")}</span>
                  <span className="block text-xs leading-5 text-muted">{t("analytics.consent.marketingDescription")}</span>
                </span>
              </label>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
            {settingsOpen ? (
              <button
                type="button"
                onClick={() => save(draft)}
                className="min-h-10 rounded border border-primary/40 px-3 py-2 text-xs font-semibold hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("analytics.consent.save")}
              </button>
            ) : (
              <button
                type="button"
                onClick={openSettings}
                className="min-h-10 rounded border border-primary/40 px-3 py-2 text-xs font-semibold hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t("analytics.consent.customize")}
              </button>
            )}
            <button
              type="button"
              onClick={() => save({ analytics: false, marketing: false })}
              className="min-h-10 rounded border border-primary/25 px-3 py-2 text-xs font-semibold hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("analytics.consent.rejectOptional")}
            </button>
            <button
              type="button"
              onClick={() => save({ analytics: true, marketing: true })}
              className="min-h-10 rounded bg-primary px-3 py-2 text-xs font-bold text-background hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("analytics.consent.acceptAll")}
            </button>
          </div>
        </section>
      ) : (
        <button
          data-analytics-exclude
          type="button"
          onClick={openSettings}
          aria-label={t("analytics.consent.manage")}
          title={t("analytics.consent.manage")}
          className="fixed bottom-3 left-3 z-[100] flex size-11 items-center justify-center rounded-full border border-primary/35 bg-background/95 text-primary shadow-lg backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-4 sm:left-4"
        >
          <ShieldCheck size={19} aria-hidden="true" />
        </button>
      )}
    </>
  );
}

export function AnalyticsManager() {
  const [location] = useLocation();
  const { lang } = useLanguage();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(getAnalyticsConsent);
  const pageState = useRef<{
    path: string | null;
    previousPath: string | null;
    analyticsSent: boolean;
    marketingSent: boolean;
  }>({ path: null, previousPath: null, analyticsSent: false, marketingSent: false });
  const previousLanguage = useRef<string | null>(null);
  const path = routePath(location);

  useEffect(() => subscribeAnalyticsConsent(() => setConsent(getAnalyticsConsent())), []);

  useEffect(() => {
    syncAnalyticsConsent();
    captureEntryAttribution();
    persistAttributionAfterConsent();
  }, []);

  useEffect(() => {
    if (!previousLanguage.current) {
      previousLanguage.current = lang;
      return;
    }
    if (previousLanguage.current === lang) return;
    trackEvent("language_change", {
      previous_language: previousLanguage.current,
      language: lang,
    });
    previousLanguage.current = lang;
  }, [lang]);

  useEffect(() => {
    const state = pageState.current;
    if (state.path !== path) {
      state.previousPath = state.path;
      state.path = path;
      state.analyticsSent = false;
      state.marketingSent = false;
    }
    const sendAnalytics = consent?.analytics === true && !state.analyticsSent;
    const sendMarketing = consent?.marketing === true && !state.marketingSent;
    if (!sendAnalytics && !sendMarketing) return;

    const frame = window.requestAnimationFrame(() => {
      const params = getPageViewParams({
        path: publicPath(path),
        routePath: path,
        title: document.title,
        language: lang,
        referrer: state.previousPath ? publicPath(state.previousPath) : undefined,
      });
      trackPageView(params, { analytics: sendAnalytics, marketing: sendMarketing });
      state.analyticsSent ||= sendAnalytics;
      state.marketingSent ||= sendMarketing;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location, path, consent?.analytics, consent?.marketing, lang]);

  useEffect(() => {
    if (!consent?.analytics) return;
    let activeMs = 0;
    let activeSince = document.visibilityState === "visible" ? performance.now() : null;
    let hadInteraction = false;
    let firstInteractionSent = false;
    let maxScrollPercent = 0;
    let exitSent = false;
    const scrollThresholds = new Set<string>();

    const activeElapsed = () =>
      activeMs + (activeSince === null ? 0 : Math.max(0, performance.now() - activeSince));

    const pauseActiveTime = () => {
      if (activeSince === null) return;
      activeMs += Math.max(0, performance.now() - activeSince);
      activeSince = null;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") pauseActiveTime();
      else if (activeSince === null) activeSince = performance.now();
    };

    const onInteraction = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-analytics-exclude]")) return;
      hadInteraction = true;
      if (firstInteractionSent) return;
      firstInteractionSent = true;
      trackEvent("first_interaction", {
        page_name: getPageContext(path).pageName,
        time_to_first_interaction_seconds: Math.round(activeElapsed() / 1000),
      });
    };

    const recordScroll = (scrollTop: number, scrollHeight: number, clientHeight: number, container: string) => {
      const scrollable = Math.max(1, scrollHeight - clientHeight);
      const percent = Math.min(100, Math.max(0, Math.round((scrollTop / scrollable) * 100)));
      maxScrollPercent = Math.max(maxScrollPercent, percent);
      for (const threshold of [25, 50, 75, 90]) {
        const key = `${container}:${threshold}`;
        if (percent < threshold || scrollThresholds.has(key)) continue;
        scrollThresholds.add(key);
        trackEvent("scroll_depth", {
          page_name: getPageContext(path).pageName,
          page_category: getPageContext(path).pageCategory,
          container,
          scroll_percent: threshold,
        });
      }
    };

    const onPageScroll = () => {
      const root = document.documentElement;
      recordScroll(window.scrollY, root.scrollHeight, window.innerHeight, "page");
    };

    const onContainerScroll = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains("inv-scroll")) return;
      recordScroll(target.scrollTop, target.scrollHeight, target.clientHeight, "investigation");
    };

    const sendEngagement = () => {
      if (exitSent) return;
      exitSent = true;
      pauseActiveTime();
      trackEvent("page_engagement", {
        page_name: getPageContext(path).pageName,
        active_time_seconds: Math.round(activeMs / 1000),
        max_scroll_percent: maxScrollPercent,
        had_interaction: hadInteraction,
      });
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("pointerdown", onInteraction, { capture: true, passive: true });
    document.addEventListener("keydown", onInteraction, true);
    document.addEventListener("scroll", onContainerScroll, { capture: true, passive: true });
    window.addEventListener("scroll", onPageScroll, { passive: true });
    window.addEventListener("pagehide", sendEngagement);
    onPageScroll();

    return () => {
      sendEngagement();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("pointerdown", onInteraction, true);
      document.removeEventListener("keydown", onInteraction, true);
      document.removeEventListener("scroll", onContainerScroll, true);
      window.removeEventListener("scroll", onPageScroll);
      window.removeEventListener("pagehide", sendEngagement);
    };
  }, [path, consent?.analytics]);

  useEffect(() => {
    const onLinkClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest("[data-analytics-exclude]")) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute("download")) return;

      let destination: URL;
      try {
        destination = new URL(anchor.href);
      } catch {
        return;
      }
      if (destination.protocol !== "http:" && destination.protocol !== "https:") return;
      const sourcePage = getPageContext(routePath(window.location.pathname)).pageName;
      if (destination.origin === window.location.origin) {
        trackEvent("navigation_click", {
          source_page: sourcePage,
          destination_page: getPageContext(routePath(destination.pathname)).pageName,
          destination_path: safeNavigationPath(routePath(destination.pathname)),
        });
      } else {
        trackEvent("external_link_click", {
          source_page: sourcePage,
          destination_domain: destination.hostname.toLowerCase().replace(/^www\./, ""),
        });
      }
    };
    document.addEventListener("click", onLinkClick, true);
    return () => document.removeEventListener("click", onLinkClick, true);
  }, []);

  function saveConsent(next: AnalyticsConsent) {
    setAnalyticsConsent(next);
    persistAttributionAfterConsent();
  }

  return <ConsentPanel consent={consent} onSave={saveConsent} />;
}
