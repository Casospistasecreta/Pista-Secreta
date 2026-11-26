export type AnalyticsConsent = {
  analytics: boolean;
  marketing: boolean;
};

export type AnalyticsValue = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsValue>;

type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: MetaPixel;
    __pistaGa4Configured?: boolean;
    __pistaMetaInitialized?: boolean;
  }
}

// Keep the project's existing IDs. Third-party scripts load only after consent.
const GA4_MEASUREMENT_ID = "G-B0XBC8S41V";
const META_PIXEL_ID = "1011646405221720";
const CONSENT_STORAGE_KEY = "pista-secreta:analytics-consent-v1";
const ANALYTICS_ATTRIBUTION_SESSION_KEY = "pista-secreta:analytics-session-attribution-v1";
const ANALYTICS_ATTRIBUTION_FIRST_KEY = "pista-secreta:analytics-first-attribution-v1";

const PRIVATE_PARAM_KEYS = new Set([
  "email",
  "phone",
  "telephone",
  "whatsapp",
  "full_name",
  "first_name",
  "last_name",
  "message",
  "free_text",
  "answer_text",
  "story",
  "input_value",
  "passcode",
  "token",
  "ip",
  "user_id",
  "client_id",
  "fbclid",
  "gclid",
]);
const EMAIL_VALUE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_VALUE = /^\+?\d[\d\s().-]{7,}\d$/;

let currentConsent: AnalyticsConsent | null = readConsent();
const consentListeners = new Set<() => void>();
const completedInvestigations = new Set<string>();

function readConsent(): AnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<AnalyticsConsent>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { analytics: parsed.analytics, marketing: parsed.marketing };
  } catch {
    return null;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  return currentConsent;
}

export function subscribeAnalyticsConsent(listener: () => void): () => void {
  consentListeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_STORAGE_KEY) return;
    currentConsent = readConsent();
    syncAnalyticsConsent();
    listener();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    consentListeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

export function hasAnalyticsConsent(): boolean {
  return currentConsent?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return currentConsent?.marketing === true;
}

function googleConsentParams(consent: AnalyticsConsent) {
  return {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  };
}

function loadGoogleTag(consent: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  if (!consent.analytics) {
    window.gtag?.("consent", "update", googleConsentParams(consent));
    return;
  }

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  if (!window.__pistaGa4Configured) {
    window.gtag("js", new Date());
    window.gtag("consent", "default", googleConsentParams(consent));
    window.gtag("config", GA4_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: consent.marketing,
      allow_ad_personalization_signals: consent.marketing,
    });
    window.__pistaGa4Configured = true;
  } else {
    window.gtag("consent", "update", googleConsentParams(consent));
  }

  if (!document.querySelector('script[data-pista-analytics="ga4"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    script.dataset.pistaAnalytics = "ga4";
    document.head.appendChild(script);
  }
}

function loadMetaPixel(consent: AnalyticsConsent) {
  if (typeof window === "undefined") return;
  if (!consent.marketing) {
    window.fbq?.("consent", "revoke");
    return;
  }

  if (!window.fbq) {
    const pixel = ((...args: unknown[]) => {
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue?.push(args);
    }) as MetaPixel;
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = "2.0";
    pixel.queue = [];
    window.fbq = pixel;
  }

  if (!window.__pistaMetaInitialized) {
    window.fbq("init", META_PIXEL_ID);
    window.__pistaMetaInitialized = true;
  }
  window.fbq("consent", "grant");

  if (!document.querySelector('script[data-pista-analytics="meta"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.pistaAnalytics = "meta";
    document.head.appendChild(script);
  }
}

export function setAnalyticsConsent(consent: AnalyticsConsent): void {
  currentConsent = { analytics: consent.analytics, marketing: consent.marketing };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(currentConsent));
    } catch {
      // Consent still applies for this tab even when browser storage is unavailable.
    }
  }
  loadGoogleTag(currentConsent);
  loadMetaPixel(currentConsent);
  consentListeners.forEach((listener) => listener());
}

export function syncAnalyticsConsent(): void {
  const consent = currentConsent ?? { analytics: false, marketing: false };
  loadGoogleTag(consent);
  loadMetaPixel(consent);
}

function sanitizedParams(params?: Record<string, unknown>): AnalyticsParams {
  const output: AnalyticsParams = {};
  if (!params) return output;
  for (const [key, value] of Object.entries(params)) {
    if (PRIVATE_PARAM_KEYS.has(key.toLowerCase())) continue;
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") continue;
    if (typeof value === "string") {
      if (value.length > 180 || EMAIL_VALUE.test(value) || PHONE_VALUE.test(value)) continue;
      output[key] = value;
    } else if (Number.isFinite(value)) {
      output[key] = value;
    } else {
      output[key] = value;
    }
  }
  return output;
}

function sendGA4Event(eventName: string, params?: Record<string, unknown>) {
  if (!hasAnalyticsConsent() || typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, sanitizedParams(params));
  } catch {
    // Analytics failures must not interrupt the app.
  }
}

function sendMetaEvent(kind: "track" | "trackCustom", eventName: string, params?: Record<string, unknown>) {
  if (!hasMarketingConsent() || typeof window === "undefined" || typeof window.fbq !== "function") return;
  try {
    window.fbq(kind, eventName, sanitizedParams(params));
  } catch {
    // Analytics failures must not interrupt the app.
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!/^[a-z][a-z0-9_]{0,49}$/.test(eventName)) return;
  sendGA4Event(eventName, params);
  sendMetaEvent("trackCustom", eventName, params);
}

export function trackInvestigationCompleted(caseId: string): void {
  completedInvestigations.add(caseId);
  trackEvent("investigation_completed", { case_id: caseId });
}

export function wasInvestigationCompleted(caseId: string): boolean {
  return completedInvestigations.has(caseId);
}

export function trackStandardMetaEvent(eventName: string, params?: Record<string, unknown>): void {
  sendMetaEvent("track", eventName, params);
}

export type PageViewParams = {
  page_location: string;
  page_path: string;
  page_title: string;
  page_referrer?: string;
  page_name: string;
  page_category: string;
  language: string;
  case_id?: string;
  timestamp: string;
  session_source?: string;
  session_medium?: string;
  session_campaign?: string;
  first_visit_source?: string;
  landing_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer_host?: string;
  ad_click_id_present?: boolean;
  device_type?: string;
};

export function trackPageView(
  params: PageViewParams,
  targets: { analytics?: boolean; marketing?: boolean } = {},
): void {
  const safe = sanitizedParams(params);
  if ((targets.analytics ?? true) && hasAnalyticsConsent()) {
    sendGA4Event("page_view", safe);
  }
  if ((targets.marketing ?? true) && hasMarketingConsent()) {
    sendMetaEvent("track", "PageView", {
      page_path: params.page_path,
      page_title: params.page_title,
      page_category: params.page_category,
      language: params.language,
    });
  }
}

export type CaseName =
  | "wendel_jr"
  | "universitario"
  | "dona_odete"
  | "rasputin"
  | "peao_envenenado"
  | "justin_nobaind";

export interface CaseEventParams {
  case_name: CaseName;
  product_name?: string;
  value?: number;
  currency?: string;
}

export function trackViewCase({
  case_name,
  product_name,
  value,
  currency = "BRL",
}: CaseEventParams): void {
  const params = {
    case_name,
    product_name: product_name ?? case_name,
    ...(value !== undefined ? { value, currency } : {}),
  };
  trackEvent("view_case", params);
  trackStandardMetaEvent("ViewContent", {
    content_name: product_name ?? case_name,
    content_type: "product",
    ...(value !== undefined ? { value, currency } : {}),
  });
}

/** A checkout click signals intent, not a confirmed purchase. */
export function trackClickBuy({
  case_name,
  product_name,
  value,
  currency = "BRL",
}: CaseEventParams): void {
  const params = {
    case_name,
    product_name: product_name ?? case_name,
    ...(value !== undefined ? { value, currency } : {}),
  };
  trackEvent("click_buy", params);
  trackStandardMetaEvent("InitiateCheckout", {
    content_name: product_name ?? case_name,
    content_type: "product",
    ...(value !== undefined ? { value, currency } : {}),
  });
}