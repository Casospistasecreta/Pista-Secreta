const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const artifactDir = path.resolve(__dirname, "..");
const outputDir = path.join(artifactDir, "dist", "public");

const build = spawnSync("pnpm", ["run", "build"], {
  cwd: artifactDir,
  env: {
    ...process.env,
    PORT: process.env.PORT || "23677",
    BASE_PATH: process.env.BASE_PATH || "/",
  },
  stdio: "inherit",
});

if (build.error) {
  throw build.error;
}
assert.equal(
  build.status,
  0,
  "the production build must succeed before checking upsell routes",
);

const routes = {
  upsell: {
    file: path.join(outputDir, "upsell", "index.html"),
    basePath: "/upsell/",
    kiwifyId: "GsjGxdn",
    otherKiwifyId: "rHmD3pb",
  },
  upsell2: {
    file: path.join(outputDir, "upsell2", "index.html"),
    basePath: "/upsell2/",
    kiwifyId: "rHmD3pb",
    otherKiwifyId: "GsjGxdn",
  },
};

function getResourceReference(html, tag, attribute, fileName) {
  const tagPattern = new RegExp(
    `<${tag}\\b[^>]*\\b${attribute}=["']([^"']+)["'][^>]*>`,
    "g",
  );
  const matches = [...html.matchAll(tagPattern)]
    .map((match) => match[1])
    .filter(
      (reference) =>
        path.posix.basename(
          new URL(reference, "https://example.test").pathname,
        ) === fileName,
    );

  assert.equal(matches.length, 1, `expected exactly one ${fileName} reference`);
  return matches[0];
}

const sharedResources = {
  styles: (html) => getResourceReference(html, "link", "href", "styles.css"),
  translation: (html) => getResourceReference(html, "script", "src", "i18n.js"),
  behavior: (html) => getResourceReference(html, "script", "src", "script.js"),
};

const builtPages = Object.entries(routes).map(([routeName, route]) => {
  assert.ok(
    fs.existsSync(route.file),
    `production page for /${routeName} must exist`,
  );
  const html = fs.readFileSync(route.file, "utf8");

  assert.ok(
    html.includes(`<base href="${route.basePath}">`),
    `/${routeName} must use its own base path`,
  );
  assert.ok(
    html.includes(route.kiwifyId),
    `/${routeName} must contain its expected Kiwify ID`,
  );
  assert.ok(
    !html.includes(route.otherKiwifyId),
    `/${routeName} must not contain the other offer's Kiwify ID`,
  );

  const resources = Object.fromEntries(
    Object.entries(sharedResources).map(([name, getReference]) => [
      name,
      getReference(html),
    ]),
  );
  return { routeName, resources };
});

assert.deepEqual(
  builtPages[0].resources,
  builtPages[1].resources,
  "both production routes must reference the same stylesheet, translation, and behavior files",
);

for (const reference of Object.values(builtPages[0].resources)) {
  const localPath = path.resolve(
    outputDir,
    `.${new URL(reference, "https://example.test").pathname}`,
  );
  assert.ok(
    fs.existsSync(localPath),
    `shared production asset must exist: ${reference}`,
  );
}

console.log(
  "Upsell production build checks passed: route-specific Kiwify IDs and shared assets.",
);

require("./test-upsell-i18n.cjs");
