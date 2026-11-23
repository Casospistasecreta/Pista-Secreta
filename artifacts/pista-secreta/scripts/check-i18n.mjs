import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(packageRoot, "src");
const languages = ["pt-BR", "en", "es"];
const groups = ["site", "ui"];
const errors = [];
const dictionaries = new Map();
const sharedTranslationsPath = path.resolve(
  packageRoot,
  "../../lib/personalizados-core/src/translations.ts",
);

function readSharedKeys(language) {
  const source = fs.readFileSync(sharedTranslationsPath, "utf8");
  const marker = language === "pt-BR" ? `"pt-BR": {` : `${language}: {`;
  const start = source.indexOf(marker);
  if (start === -1) {
    errors.push(`shared personalized translations: missing language "${language}"`);
    return new Set();
  }
  const bodyStart = start + marker.length;
  const blockEnd = source.indexOf("\n  },", bodyStart);
  if (blockEnd === -1) {
    errors.push(`shared personalized translations: malformed "${language}" dictionary`);
    return new Set();
  }
  const block = source.slice(bodyStart, blockEnd);
  const keys = [...block.matchAll(/^\s*["']([^"']+)["']\s*:/gm)].map((match) => match[1]);
  return new Set(keys);
}

const sharedKeys = Object.fromEntries(languages.map((language) => [language, readSharedKeys(language)]));

function readKeys(group, language) {
  const file = path.join(sourceRoot, "i18n", group, `${language}.ts`);
  const source = fs.readFileSync(file, "utf8");
  const keys = [...source.matchAll(/^\s*["']([^"']+)["']\s*:/gm)].map((match) => match[1]);
  const duplicates = keys.filter((key, index) => keys.indexOf(key) !== index);
  for (const key of duplicates) errors.push(`${group}/${language}: duplicate key "${key}"`);
  return new Set(keys);
}

for (const group of groups) {
  const byLanguage = Object.fromEntries(languages.map((language) => {
    const keys = readKeys(group, language);
    if (group === "site") {
      for (const key of sharedKeys[language]) {
        if (keys.has(key)) errors.push(`site/${language}: duplicate shared key "${key}"`);
        keys.add(key);
      }
    }
    return [language, keys];
  }));
  dictionaries.set(group, byLanguage);
  const base = byLanguage["pt-BR"];
  for (const language of ["en", "es"]) {
    for (const key of base) {
      if (!byLanguage[language].has(key)) errors.push(`${group}/${language}: missing "${key}"`);
    }
    for (const key of byLanguage[language]) {
      if (!base.has(key)) errors.push(`${group}/${language}: unexpected "${key}"`);
    }
  }
}

const allKeys = new Set([...dictionaries.get("site")["pt-BR"], ...dictionaries.get("ui")["pt-BR"]]);
const translationCalls = new Set();

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "i18n" && entry.name !== "cases") walk(file);
      continue;
    }
    if (!/\.(ts|tsx)$/.test(entry.name) || entry.name.endsWith(".d.ts")) continue;
    const source = fs.readFileSync(file, "utf8");
    for (const match of source.matchAll(/\b(?:t|tr|tText)\s*\(\s*["']([^"']+)["']/g)) {
      const key = match[1];
      translationCalls.add(key);
      if (!allKeys.has(key)) {
        const line = source.slice(0, match.index).split("\n").length;
        errors.push(`${path.relative(packageRoot, file)}:${line}: unknown key "${key}"`);
      }
    }
  }
}

walk(sourceRoot);

if (errors.length) {
  console.error("i18n audit failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  for (const group of groups) {
    const base = dictionaries.get(group)["pt-BR"].size;
    console.log(`[i18n] ${group}: ${base} keys present in pt-BR, en, and es.`);
  }
  console.log(`[i18n] ${translationCalls.size} literal translation keys referenced by source; all exist.`);
}
