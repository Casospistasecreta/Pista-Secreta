import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

const upsellTemplatePath = path.resolve(
  import.meta.dirname,
  "public/upsell/index.html",
);

const upsellVariants = {
  upsell: { basePath: "/upsell/", kiwifyId: "GsjGxdn" },
  // Kiwify issues a separate identifier for each checkout offer.
  upsell2: { basePath: "/upsell2/", kiwifyId: "rHmD3pb" },
} as const;

function renderUpsellPage(variant: keyof typeof upsellVariants): string {
  const template = fs.readFileSync(upsellTemplatePath, "utf8");
  const config = upsellVariants[variant];

  if (
    !template.includes('<base href="/upsell/">') ||
    !template.includes("GsjGxdn")
  ) {
    throw new Error("The shared upsell page is missing its route or checkout marker.");
  }

  return template
    .replace('<base href="/upsell/">', `<base href="${config.basePath}">`)
    .replaceAll("GsjGxdn", config.kiwifyId);
}

// Serve the shared offer template in development and emit the second
// Kiwify-specific route in the production build.
function staticHtmlPlugin(): import("vite").Plugin {
  const staticRoutes: Record<string, keyof typeof upsellVariants> = {
    "/upsell/": "upsell",
    "/upsell": "upsell",
    "/upsell2/": "upsell2",
    "/upsell2": "upsell2",
  };

  return {
    name: "static-html-pages",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        const variant = staticRoutes[url];
        if (variant) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(renderUpsellPage(variant));
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "upsell2/index.html",
        source: renderUpsellPage("upsell2"),
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    staticHtmlPlugin(),
    react(),
    tailwindcss({ optimize: false }),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
