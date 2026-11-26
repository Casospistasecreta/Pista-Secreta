# Analytics and privacy

## Architecture

The React app uses `AnalyticsManager` as the single entry point for site-wide tracking. It observes Wouter route changes, updates page views after route metadata settles, and listens for navigation, first interaction, scroll depth, and active time. Investigation screens are tracked through `DeviceProvider` and the final-answer state; quiz events go through the same analytics wrapper; the personalized-request form sends only fixed event fields.

The existing GA4 measurement ID (`G-B0XBC8S41V`) and Meta Pixel ID (`1011646405221720`) were retained. The static installs were removed from the app shell:

- GA4 loads only after analytics consent. Automatic page views are disabled; route page views are sent manually once.
- Meta Pixel loads only after marketing consent.
- Consent Mode receives the corresponding allowed/denied states. Revoking consent stops later events and updates the providers.
- The visitor can reopen privacy settings from the shield button at the bottom-left.
- The consent choice is stored in `localStorage`; attribution is stored only after analytics consent.
- The app also keeps functional first-party state such as the selected language, investigation progress, and personalized-form drafts. These values are not read or sent by the analytics layer; the privacy notice should describe the app's local storage separately from optional analytics.

The standalone upsell pages and their vendor tracking scripts were intentionally left unchanged. They are separate static pages and still need their own consent/legal review.

## Routes and page views

The router base path is included in `page_location` and `page_path`, but removed when classifying the route. Query strings and fragments are excluded from page URLs.

| Route pattern | `page_name` | `page_category` |
| --- | --- | --- |
| `/` | `home` | `marketing` |
| `/personalizados` | `personalized_request` | `form` |
| `/sign-in` | `sign_in` | `authentication` |
| `/sign-up` | `sign_up` | `authentication` |
| `/investigacao` | `investigation_catalog` | `investigation` |
| `/investigacao/:slug` | `investigation_case` | `investigation` |
| `/caso-rasputin` | `investigation_case` | `investigation` |
| Other paths | `not_found` | `other` |

`page_view` includes the page name/category, current language, case slug when applicable, sanitized page title, timestamp, device class, session and first-touch source, landing path, and a referrer host. Route changes create a page view; language changes create a separate `language_change` event and do not create a duplicate page view.

## Attribution

The first page load captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`, plus a referrer host and landing path. UTM values are kept separate from inferred sources such as organic search or referral. Click IDs (`fbclid`, `gclid`, `msclkid`, `ttclid`) are never sent; analytics records only whether one was present.

- Session attribution is in `sessionStorage` until the tab session ends.
- First-touch attribution is in `localStorage` for at most 90 days, and only when analytics consent is granted.
- Email-like and phone-like campaign values are discarded.
- Page URL query strings, fragments, referrer paths, and referrer query strings are not sent.
- Link events contain only a recognized internal destination path or an external hostname, never the full URL or its query string.

## Event catalogue

Unless marked otherwise, these events are sent to GA4 and as Meta custom events only when the matching consent is granted. The event wrapper drops objects, arrays, email/phone-looking values, and known private parameter names. Do not add free-text values, contact details, passcodes, answer choices, or evidence identifiers to events.

| Event | Trigger and safe fields |
| --- | --- |
| `page_view` | SPA route view; page category/name, language, case slug, safe attribution, title, device class. |
| `language_change` | Actual language selection; previous and new language codes. |
| `navigation_click` | Internal link; source page, recognized destination page/path. |
| `external_link_click` | External link; source page and destination hostname only. |
| `first_interaction` | First content interaction per page; page name and active seconds to interaction. Consent controls are excluded. |
| `scroll_depth` | First crossing of 25%, 50%, 75%, and 90%; page/container category and threshold. Investigation scroll containers are tracked separately from page scroll. |
| `page_engagement` | Route exit or page hide; active seconds, maximum scroll percentage, and whether an interaction occurred. Hidden-tab time is excluded. |
| `view_case` | A case card is at least half visible; stable product/case name and displayed price/currency. Meta also receives `ViewContent`. |
| `click_buy` | Checkout link intent only; stable product/case name and displayed price/currency. Meta also receives `InitiateCheckout`. This is **not** a purchase. |
| `product_content_view`, `product_content_navigation` | Product slider slide viewed or changed; slide index and content type only. |
| `newsletter_submit_attempt`, `newsletter_validation_error` | Landing email form attempt/validation only; form ID or fixed error category, never the email. The current form does not send data to a backend, so its client-side success state is not reported as a lead. |
| `quiz_view`, `quiz_popup_impression`, `quiz_open_cta` | Quiz open/popup/CTA; source only. |
| `quiz_start`, `quiz_question_view`, `quiz_question_answered`, `quiz_step_complete` | Quiz progress; source, question number, and fixed option ID. No answer text or selected recommendation text. |
| `quiz_complete`, `quiz_result_view`, `quiz_primary_case_click`, `quiz_secondary_case_click`, `quiz_result_click` | Quiz completion/result actions; stable case IDs, result position, and duration. |
| `quiz_abandon`, `quiz_restart` | Quiz exit before completion or restart; question number and duration. |
| `personalized_product_select` | Product choice; fixed product type only. |
| `personalized_form_start`, `personalized_form_step_view`, `personalized_form_step_complete`, `personalized_form_step_back` | Form progress; product type and step number. |
| `personalized_form_field_interaction` | First interaction with each broad field category (`contact`, `creative_brief`, `consent`, or `preferences`); no field value or exact text. |
| `personalized_form_validation_error`, `personalized_form_submit_error` | Validation/API failure; product type and fixed error category only. |
| `personalized_form_abandon` | Form unmounted before a successful server response; product type and step number. |
| `personalized_form_submit`, `generate_lead` | A successful API response to a submitted briefing; product type, language, and attachment count. GA4 receives `generate_lead`; Meta receives standard `Lead`. Neither receives contact details or briefing content. |
| `investigation_start` | Correct device passcode; case slug only, once per case per tab session. The passcode is never sent. |
| `investigation_navigation` | App/view open, back, home, or view replacement; case slug, app ID, action, and view type. |
| `investigation_clue_unlocked` | Correct clue code or automatic clue unlock; case slug and app ID only. |
| `investigation_evidence_toggle` | Evidence saved/removed; case slug, app ID, and action. Evidence IDs and titles are not sent. |
| `investigation_completed` | Final-answer result is reached; case slug only. Answer values, score, and narrative are not sent. |
| `investigation_abandon` | Investigation exits after a successful device unlock and before completion; case slug and current app ID. |

Meta standard events are limited to `PageView`, `ViewContent`, `InitiateCheckout`, and `Lead`. No `Purchase` event is emitted.

## Server-side checkout-click counter

The existing `POST /api/analytics/purchase-click` counter remains in place and the Kiwify destinations are unchanged. The browser calls it only after analytics consent. New rows keep the checkout destination, store at most the referring origin, and leave `user_agent` empty. Existing rows are not deleted or rewritten.

The core digital-case checkout has no payment-confirmation webhook in this project. A click, redirect, or checkout initiation cannot be treated as a confirmed sale. Purchase reporting must wait for a verified payment callback or a trusted provider integration.

## Consent and legal review

The banner has separate analytics and marketing choices, with optional tools disabled until permission. Necessary storage keeps the visitor's choice. The banner copy is implementation text, not a legal determination.

No privacy-policy page or approved retention schedule was found during the audit. Before production use, the business should have its privacy notice, lawful basis/consent wording, cookie disclosures, vendor terms, data-subject requests, and retention/deletion schedule reviewed by a qualified privacy professional. The provider dashboards have their own retention settings and are outside this code's control.

## Suggested reports

1. **Acquisition:** sessions and first-touch source/medium/campaign, landing page, and consent rate.
2. **Site-to-investigation funnel:** `page_view` → `view_case` → `click_buy` or `investigation_start`, segmented by case, language, and device class.
3. **Investigation funnel:** `investigation_start` → `investigation_navigation` → `investigation_clue_unlocked` → `investigation_completed`; use `app_id` and `view_type` to identify friction without collecting clue content.
4. **Quiz funnel:** `quiz_start` → `quiz_question_answered` → `quiz_complete` → `quiz_result_click`; compare primary and secondary results.
5. **Personalized requests:** `personalized_form_start` → step views/completions → `generate_lead`, with fixed error categories and no submitted content.
6. **Engagement:** `scroll_depth`, `first_interaction`, and `page_engagement` by page category and device class.

## Validation

Run:

```sh
pnpm --filter @workspace/pista-secreta run test:analytics
pnpm --filter @workspace/pista-secreta run typecheck
pnpm --filter @workspace/pista-secreta run build
```

The automated analytics smoke test uses fake browser storage and provider queues; it does not contact Google or Meta. Confirming live delivery requires access to GA4 DebugView and Meta Events Manager after the app is published. This implementation does not publish the app.
