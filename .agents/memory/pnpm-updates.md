---
name: Atualizações do pnpm
description: Non-obvious behavior when updating catalog and transitive dependencies with the workspace's pnpm.
---

Updating catalog-managed packages can reserialize the workspace YAML, reorder settings, and remove comments.

**Why:** The installed pnpm rewrote the whole workspace configuration during a targeted catalog update, including removing explanatory security comments.

**How to apply:** Inspect the complete configuration diff after package updates. Preserve the one-day minimum release age, publisher exclusions, platform exclusions, and build-script allowlist.

A successful targeted recursive update is not evidence that every named nested dependency changed.

**Why:** Compatible parent updates retained old nested Babel and fast-copy resolutions despite requesting recursive updates.

**How to apply:** Inspect the resulting lockfile and rerun the dependency audit. If compatible parent updates retain vulnerable versions, use narrowly version-scoped overrides rather than assuming the update succeeded.
