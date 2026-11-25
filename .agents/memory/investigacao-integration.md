---
name: Investigação Digital integration
description: Durable constraints for the investigation experience inside the Pista Secreta web artifact.
---

The investigation experience is intentionally isolated under the `inv-*` CSS namespace and lazy-loaded from the main router, so the existing landing page styling and initial bundle stay independent.

**Why:** The product has two distinct surfaces: the marketing landing page and a device-like investigation flow. Cross-surface CSS or eager imports would make later case work more likely to regress the landing page.

**How to apply:** Add future cases through the case registry and keep new investigation UI inside the investigation directory; preserve the default demo codes and local evidence/unlock persistence contract unless the product requirements change.

Keep evidence IDs language-neutral. When displaying saved evidence, derive titles and subtitles from the active locale and case data instead of relying on translated text captured when the evidence was first saved.

**Why:** Evidence persists locally across language changes, so stored display strings can otherwise stay in the language that was active when they were created.

**How to apply:** Preserve evidence IDs and unlock keys when localizing investigation apps; remap any displayed evidence labels from the current case data and translation dictionary.