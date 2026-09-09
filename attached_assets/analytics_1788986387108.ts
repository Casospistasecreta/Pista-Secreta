/**
 * Centralized analytics tracking helpers.
 *
 * This module does NOT install or initialize Google Analytics 4 or the Meta
 * Pixel — both are already installed and running in `index.html` (gtag.js /
 * fbq.js). These helpers only send additional events through those existing
 * instances, so there is no duplicate GA4 tag and no duplicate Meta Pixel.
 *
 * - GA4: uses the global `gtag` function already defined in index.html.
 * - Meta: uses the global `fbq` function already defined in index.html.
 *
 * Both `gtag` and `fbq` queue calls internally before their scripts finish
 * loading, so it's safe to call them as soon as the page/component mounts.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type CaseName = "wendel_jr" | "universitario";

export interface CaseEventParams {
  /** Stable identifier for the case/product, e.g. "wendel_jr" */
  case_name: CaseName;
  /** Human readable product name, e.g. "O Caso Wendel Jr" */
  product_name?: string;
  value?: number;
  currency?: string;
}

function sendGA4Event(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

function sendMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params);
}

/**
 * Case/product viewed (e.g. its card scrolled into view).
 * GA4: custom event `view_case`.
 * Meta: standard event `ViewContent` (the closest standard equivalent).
 */
export function trackViewCase({
  case_name,
  product_name,
  value,
  currency = "BRL",
}: CaseEventParams) {
  sendGA4Event("view_case", {
    case_name,
    product_name: product_name ?? case_name,
    ...(value !== undefined ? { value, currency } : {}),
  });

  sendMetaEvent("ViewContent", {
    content_name: product_name ?? case_name,
    content_ids: [case_name],
    content_type: "product",
    ...(value !== undefined ? { value, currency } : {}),
  });
}

/**
 * User clicked a buy/checkout button ("Começar a Investigação" / "Escolher
 * este caso"). This is a click, NOT a confirmed purchase.
 * GA4: custom event `click_buy`.
 * Meta: standard event `InitiateCheckout` (purchase-intent, not Purchase).
 */
export function trackClickBuy({
  case_name,
  product_name,
  value,
  currency = "BRL",
}: CaseEventParams) {
  sendGA4Event("click_buy", {
    case_name,
    product_name: product_name ?? case_name,
    ...(value !== undefined ? { value, currency } : {}),
  });

  sendMetaEvent("InitiateCheckout", {
    content_name: product_name ?? case_name,
    content_ids: [case_name],
    content_type: "product",
    ...(value !== undefined ? { value, currency } : {}),
  });
}
