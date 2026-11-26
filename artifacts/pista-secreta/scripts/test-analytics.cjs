const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");

class MemoryStorage {
  #values = new Map();
  getItem(key) { return this.#values.get(key) ?? null; }
  setItem(key, value) { this.#values.set(String(key), String(value)); }
  removeItem(key) { this.#values.delete(key); }
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pista-secreta-analytics-"));
const localStorage = new MemoryStorage();
const sessionStorage = new MemoryStorage();
const dataLayer = [];
const documentListeners = new Map();
const location = {
  origin: "https://pista.example",
  hostname: "pista.example",
  pathname: "/investigacao/caso-odete",
  search: "?utm_source=Instagram&utm_medium=Paid_Social&utm_campaign=campaign-17&fbclid=private-click-id",
};

global.window = {
  location,
  localStorage,
  sessionStorage,
  dataLayer,
  matchMedia: () => ({ matches: false }),
  addEventListener: (name, handler) => documentListeners.set(name, handler),
  removeEventListener: (name) => documentListeners.delete(name),
};
global.document = {
  referrer: "https://l.instagram.com/some/path?private=value",
  title: "Pista Secreta",
  querySelector: () => ({}),
  createElement: () => ({ dataset: {} }),
  head: { appendChild() {} },
};

function compileModule(name) {
  const sourcePath = path.resolve(__dirname, "../src/lib", `${name}.ts`);
  const source = fs.readFileSync(sourcePath, "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: sourcePath,
  });
  fs.writeFileSync(path.join(tempDir, `${name}.js`), result.outputText);
}

try {
  compileModule("analytics");
  compileModule("analyticsAttribution");
  const analytics = require(path.join(tempDir, "analytics.js"));
  const attribution = require(path.join(tempDir, "analyticsAttribution.js"));

  attribution.captureEntryAttribution();
  analytics.setAnalyticsConsent({ analytics: false, marketing: false });
  analytics.trackEvent("blocked_before_consent", { safe: "value" });
  assert.equal(dataLayer.some((entry) => entry[0] === "event"), false, "events stay blocked without consent");

  analytics.setAnalyticsConsent({ analytics: true, marketing: false });
  analytics.trackEvent("privacy_test", {
    case_id: "caso-odete",
    email: "visitor@example.com",
    phone: "+55 11 99999-9999",
    answer_text: "private answer",
    passcode: "1234",
    timestamp: "2026-11-26T12:00:00.000Z",
  });
  const privacyEvent = dataLayer.find((entry) => entry[0] === "event" && entry[1] === "privacy_test");
  assert.ok(privacyEvent, "analytics event is sent after analytics consent");
  assert.deepEqual(privacyEvent[2], { case_id: "caso-odete", timestamp: "2026-11-26T12:00:00.000Z" });

  attribution.persistAttributionAfterConsent();
  const page = attribution.getPageViewParams({
    path: "/pista-secreta/investigacao/caso-odete?utm_source=discarded",
    routePath: "/investigacao/caso-odete",
    title: "Investigação Digital — Caso Dona Odete",
    language: "pt-BR",
  });
  assert.equal(page.page_category, "investigation");
  assert.equal(page.case_id, "caso-odete");
  assert.equal(page.page_path, "/pista-secreta/investigacao/caso-odete");
  assert.equal(page.page_referrer, "https://l.instagram.com/");
  assert.equal(page.utm_source, "instagram");
  assert.equal(page.utm_medium, "paid_social");
  assert.equal(page.utm_campaign, "campaign-17");
  assert.equal(page.ad_click_id_present, true);
  assert.equal(JSON.stringify(page).includes("private-click-id"), false);
  assert.equal(attribution.safeNavigationPath("/investigacao/caso-odete?email=private@example.com"), "/investigacao/caso-odete");

  analytics.setAnalyticsConsent({ analytics: false, marketing: true });
  analytics.trackEvent("marketing_only_test", { case_id: "caso-odete" });
  assert.equal(dataLayer.some((entry) => entry[0] === "event" && entry[1] === "marketing_only_test"), false);
  assert.ok(window.fbq.queue.some((entry) => entry[0] === "trackCustom" && entry[1] === "marketing_only_test"));
  analytics.trackPageView(page, { analytics: false, marketing: true });
  assert.ok(window.fbq.queue.some((entry) => entry[0] === "track" && entry[1] === "PageView"));

  const eventCountBeforeRevoke = dataLayer.filter((entry) => entry[0] === "event").length;
  analytics.setAnalyticsConsent({ analytics: false, marketing: false });
  analytics.trackEvent("blocked_after_revoke", { safe: "value" });
  assert.equal(dataLayer.filter((entry) => entry[0] === "event").length, eventCountBeforeRevoke);
  assert.equal(analytics.getAnalyticsConsent().analytics, false);
  assert.equal(analytics.getAnalyticsConsent().marketing, false);

  console.log("Analytics smoke checks passed: consent gating, PII filtering, route/UTM attribution, referrer minimization, and provider separation.");
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
