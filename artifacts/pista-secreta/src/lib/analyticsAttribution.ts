import type { AnalyticsParams, PageViewParams } from "./analytics";
import { hasAnalyticsConsent } from "./analytics";

const SESSION_KEY = "pista-secreta:analytics-session-attribution-v1";
const FIRST_TOUCH_KEY = "pista-secreta:analytics-first-attribution-v1";
const FIRST_TOUCH_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const SENSITIVE_VALUE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_VALUE = /^\+?\d[\d\s().-]{7,}\d$/;

type Attribution = {
  source: string;
  medium: string;
  utmSource?: string;
  utmMedium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrerHost?: string;
  landingPage: string;
  adClickIdPresent: boolean;
  capturedAt: number;
};

let initialAttribution: Attribution | null = null;

function safeCampaignValue(value: string | null): string | undefined {
  if (!value || value.length > 100 || SENSITIVE_VALUE.test(value) || PHONE_VALUE.test(value)) return undefined;
  const clean = value.trim().replace(/[^\p{L}\p{N}_.: -]/gu, "");
  return clean || undefined;
}

export function safePagePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  return pathname.length > 180 ? pathname.slice(0, 180) : pathname;
}

function hostFromUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (typeof window !== "undefined" && host === window.location.hostname.toLowerCase().replace(/^www\./, "")) {
      return undefined;
    }
    return host;
  } catch {
    return undefined;
  }
}

function sourceFromHost(host?: string): string | undefined {
  if (!host) return undefined;
  if (/(^|\.)instagram\.com$/.test(host)) return "instagram";
  if (/(^|\.)facebook\.com$/.test(host) || host === "fb.com") return "facebook";
  if (/(^|\.)tiktok\.com$/.test(host)) return "tiktok";
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
  if (/(^|\.)bing\.com$/.test(host)) return "bing";
  if (/(^|\.)duckduckgo\.com$/.test(host)) return "duckduckgo";
  return host;
}

function mediumFromSignals(source: string, host?: string, hasClickId = false): string {
  if (hasClickId && ["facebook", "instagram", "tiktok"].includes(source)) return "paid_social";
  if (hasClickId && ["google", "bing"].includes(source)) return "paid_search";
  if (["facebook", "instagram", "tiktok"].includes(source)) return "organic_social";
  if (["google", "bing", "duckduckgo"].includes(source)) return "organic_search";
  return host ? "referral" : "(none)";
}

function deriveAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { source: "direct", medium: "(none)", landingPage: "/", adClickIdPresent: false, capturedAt: Date.now() };
  }
  const params = new URLSearchParams(window.location.search);
  const referrerHost = hostFromUrl(document.referrer);
  const utmSource = safeCampaignValue(params.get("utm_source"));
  const utmMedium = safeCampaignValue(params.get("utm_medium"));
  const hasClickId = ["fbclid", "gclid", "msclkid", "ttclid"].some((key) => params.has(key));
  const source = utmSource?.toLowerCase() ?? sourceFromHost(referrerHost) ?? "direct";
  const medium = utmMedium?.toLowerCase() ?? mediumFromSignals(source, referrerHost, hasClickId);

  return {
    source,
    medium,
    utmSource: utmSource?.toLowerCase(),
    utmMedium: utmMedium?.toLowerCase(),
    campaign: safeCampaignValue(params.get("utm_campaign")),
    content: safeCampaignValue(params.get("utm_content")),
    term: safeCampaignValue(params.get("utm_term")),
    referrerHost,
    landingPage: safePagePath(window.location.pathname),
    adClickIdPresent: hasClickId,
    capturedAt: Date.now(),
  };
}

export function captureEntryAttribution(): void {
  if (!initialAttribution) initialAttribution = deriveAttribution();
}

function readStored(key: string): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<Attribution>;
    if (typeof parsed.source !== "string" || typeof parsed.medium !== "string") return null;
    if (
      key === FIRST_TOUCH_KEY &&
      (typeof parsed.capturedAt !== "number" || Date.now() - parsed.capturedAt > FIRST_TOUCH_TTL_MS)
    ) {
      window.localStorage.removeItem(FIRST_TOUCH_KEY);
      return null;
    }
    return {
      source: parsed.source,
      medium: parsed.medium,
      utmSource: typeof parsed.utmSource === "string" ? parsed.utmSource : undefined,
      utmMedium: typeof parsed.utmMedium === "string" ? parsed.utmMedium : undefined,
      campaign: typeof parsed.campaign === "string" ? parsed.campaign : undefined,
      content: typeof parsed.content === "string" ? parsed.content : undefined,
      term: typeof parsed.term === "string" ? parsed.term : undefined,
      referrerHost: typeof parsed.referrerHost === "string" ? parsed.referrerHost : undefined,
      landingPage: typeof parsed.landingPage === "string" ? safePagePath(parsed.landingPage) : "/",
      adClickIdPresent: parsed.adClickIdPresent === true,
      capturedAt: typeof parsed.capturedAt === "number" ? parsed.capturedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export function persistAttributionAfterConsent(): void {
  if (!hasAnalyticsConsent() || typeof window === "undefined") return;
  captureEntryAttribution();
  const attribution = initialAttribution ?? deriveAttribution();
  try {
    if (!window.sessionStorage.getItem(SESSION_KEY)) {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(attribution));
    }
    if (!readStored(FIRST_TOUCH_KEY)) {
      window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(attribution));
    }
  } catch {
    // Attribution remains available in memory for this page if storage is unavailable.
  }
}

export function getPageContext(path: string): {
  pageName: string;
  pageCategory: string;
  caseId?: string;
} {
  const cleanPath = safePagePath(path).replace(/\/+$/, "") || "/";
  if (cleanPath === "/") return { pageName: "home", pageCategory: "marketing" };
  if (cleanPath === "/personalizados") return { pageName: "personalized_request", pageCategory: "form" };
  if (cleanPath.startsWith("/sign-in")) return { pageName: "sign_in", pageCategory: "authentication" };
  if (cleanPath.startsWith("/sign-up")) return { pageName: "sign_up", pageCategory: "authentication" };
  if (cleanPath === "/investigacao") return { pageName: "investigation_catalog", pageCategory: "investigation" };
  const caseMatch = cleanPath.match(/^\/investigacao\/([a-z0-9-]+)$/i);
  if (caseMatch) {
    return { pageName: "investigation_case", pageCategory: "investigation", caseId: caseMatch[1] };
  }
  if (cleanPath === "/caso-rasputin") {
    return { pageName: "investigation_case", pageCategory: "investigation", caseId: "caso-rasputin" };
  }
  return { pageName: "not_found", pageCategory: "other" };
}

export function getPageViewParams({
  path,
  routePath,
  title,
  language,
  referrer,
}: {
  path: string;
  routePath?: string;
  title: string;
  language: string;
  referrer?: string;
}): PageViewParams {
  captureEntryAttribution();
  const pagePath = safePagePath(path);
  const pageContext = getPageContext(routePath ?? pagePath);
  const session = readStored(SESSION_KEY) ?? initialAttribution ?? deriveAttribution();
  const first = readStored(FIRST_TOUCH_KEY) ?? session;
  const referrerHost = hostFromUrl(referrer ?? document.referrer);
  const pageReferrer = referrer
    ? `${window.location.origin}${safePagePath(referrer)}`
    : referrerHost
      ? `https://${referrerHost}/`
      : undefined;
  const params: PageViewParams = {
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_title: title.slice(0, 180),
    page_name: pageContext.pageName,
    page_category: pageContext.pageCategory,
    language,
    timestamp: new Date().toISOString(),
    session_source: session.source,
    session_medium: session.medium,
    first_visit_source: first.source,
    landing_page: first.landingPage,
    device_type:
      typeof window.matchMedia === "function" && window.matchMedia("(max-width: 767px)").matches
        ? "mobile"
        : "desktop",
    ad_click_id_present: session.adClickIdPresent,
  };
  if (pageContext.caseId) params.case_id = pageContext.caseId;
  if (session.campaign) params.session_campaign = session.campaign;
  if (session.utmSource) params.utm_source = session.utmSource;
  if (session.utmMedium) params.utm_medium = session.utmMedium;
  if (session.campaign) params.utm_campaign = session.campaign;
  if (session.content) params.utm_content = session.content;
  if (session.term) params.utm_term = session.term;
  if (session.referrerHost) params.referrer_host = session.referrerHost;
  if (pageReferrer) params.page_referrer = pageReferrer;
  return params;
}

export function safeNavigationPath(path: string): string {
  const context = getPageContext(path);
  if (context.pageCategory === "investigation" && context.caseId) {
    return context.caseId === "caso-rasputin" && path === "/caso-rasputin"
      ? "/caso-rasputin"
      : `/investigacao/${context.caseId}`;
  }
  if (context.pageName === "home") return "/";
  if (context.pageName === "personalized_request") return "/personalizados";
  if (context.pageName === "sign_in") return "/sign-in";
  if (context.pageName === "sign_up") return "/sign-up";
  return "other";
}
