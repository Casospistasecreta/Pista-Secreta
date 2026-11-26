const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const artifactDir = path.resolve(__dirname, "..");
const outputDir = path.join(artifactDir, "dist", "public");
const translationsPath = path.join(outputDir, "upsell", "i18n.js");
const translationsSource = fs.readFileSync(translationsPath, "utf8");

const routes = {
  upsell: {
    file: path.join(outputDir, "upsell", "index.html"),
    kiwifyId: "GsjGxdn",
  },
  upsell2: {
    file: path.join(outputDir, "upsell2", "index.html"),
    kiwifyId: "rHmD3pb",
  },
};

const languages = ["pt-BR", "en", "es"];
const expectedLabels = {
  "pt-BR": {
    accept: "Evoluir para Kit Premium Impresso",
    decline: "Manter Digitalmente",
  },
  en: {
    accept: "Upgrade to the Premium Printed Kit",
    decline: "Keep the Digital Version",
  },
  es: {
    accept: "Pasar al Kit Premium Impreso",
    decline: "Conservar la versión digital",
  },
};

function createPageHarness(html, routeName) {
  const controls = new Map();
  const buttonPattern =
    /<(button|div)\b[^>]*\bid="(kiwify-upsell-(?:trigger|cancel-trigger)-[^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;

  for (const match of html.matchAll(buttonPattern)) {
    controls.set(match[2], {
      id: match[2],
      tagName: match[1],
      innerHTML: match[3].trim(),
    });
  }

  const languageSelect = {
    value: "pt-BR",
    attributes: new Map(),
    listeners: new Map(),
    addEventListener(name, listener) {
      this.listeners.set(name, listener);
    },
    setAttribute(name, value) {
      this.attributes.set(name, value);
    },
  };
  const documentListeners = new Map();
  const documentElement = { lang: "" };
  const description = { content: "" };

  const document = {
    documentElement,
    addEventListener(name, listener) {
      documentListeners.set(name, listener);
    },
    querySelector(selector) {
      if (selector === ".language-select") return languageSelect;
      if (selector === 'meta[name="description"]') return description;
      if (selector === ".case-bar__id") return { textContent: "" };

      const idPrefix = selector.match(/^\[id\^="([^"]+)"\]$/)?.[1];
      if (idPrefix) {
        return (
          [...controls.values()].find((control) =>
            control.id.startsWith(idPrefix),
          ) ?? null
        );
      }
      return null;
    },
    querySelectorAll(selector) {
      if (selector === ".section[data-pin]") return [];
      return [];
    },
  };

  const storage = new Map();
  const window = {
    dispatchEvent() {},
  };

  vm.runInNewContext(
    translationsSource,
    {
      document,
      window,
      localStorage: {
        getItem(key) {
          return storage.get(key) ?? null;
        },
        setItem(key, value) {
          storage.set(key, value);
        },
      },
      Event: class Event {
        constructor(type) {
          this.type = type;
        }
      },
    },
    { filename: translationsPath },
  );

  const expectedIds = {
    accept: `kiwify-upsell-trigger-${routes[routeName].kiwifyId}`,
    decline: `kiwify-upsell-cancel-trigger-${routes[routeName].kiwifyId}`,
  };

  for (const [action, id] of Object.entries(expectedIds)) {
    assert.ok(
      controls.has(id),
      `/${routeName} is missing the ${action} Kiwify control with ID "${id}"`,
    );
  }

  const unchangedIds = [...controls.keys()];
  const onReady = documentListeners.get("DOMContentLoaded");
  assert.equal(
    typeof onReady,
    "function",
    "upsell translations must initialize on DOMContentLoaded",
  );
  onReady();

  for (const language of languages) {
    languageSelect.value = language;
    languageSelect.listeners.get("change")();

    assert.equal(
      documentElement.lang,
      language,
      `/${routeName} must apply ${language}`,
    );
    for (const action of ["accept", "decline"]) {
      const id = expectedIds[action];
      const control = controls.get(id);
      const label = expectedLabels[language][action];
      assert.equal(
        control.innerHTML,
        label,
        `/${routeName} ${language} ${action} translation did not reach its Kiwify control "${id}"`,
      );
      assert.equal(
        control.id,
        id,
        `/${routeName} ${language} must preserve the ${action} Kiwify ID`,
      );
    }
    assert.deepEqual(
      [...controls.keys()],
      unchangedIds,
      `/${routeName} ${language} must not add, remove, or replace Kiwify control IDs`,
    );
  }
}

for (const [routeName, route] of Object.entries(routes)) {
  assert.ok(
    fs.existsSync(route.file),
    `production page for /${routeName} must exist`,
  );
  createPageHarness(fs.readFileSync(route.file, "utf8"), routeName);
}

console.log(
  "Upsell i18n checks passed: accept/decline labels reach the correct Kiwify controls on both routes in pt-BR, en, and es.",
);
