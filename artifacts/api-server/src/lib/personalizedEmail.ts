import {
  PERSONALIZED_PRODUCTS,
  personalizedCopy,
} from "@workspace/personalizados-core";
import type { PersonalizedBriefingRequest } from "@workspace/api-zod";
import { PrivateObjectStorage } from "./objectStorage";
import { getPersonalizedAdminEmail, sendMail, type MailMessage } from "./mailer";

type Briefing = PersonalizedBriefingRequest;
type Product = Briefing["product"];
type Lang = Briefing["language"];
type Copy = (typeof personalizedCopy)["pt-BR"];
type UploadForEmail = {
  originalName: string;
  objectPath: string;
};

const storage = new PrivateObjectStorage();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 180);
}

function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

function productName(product: Product, lang: Lang): string {
  const copy = personalizedCopy[lang];
  if (product === "digital") return copy["personalized.digital.name"];
  if (product === "physical") return copy["personalized.physical.name"];
  return copy["personalized.exclusive.name"];
}

function referencePrice(product: Product): string {
  const format = (cents: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
  if (product === "digital") return format(PERSONALIZED_PRODUCTS.digital.priceCents);
  if (product === "physical") return `${format(PERSONALIZED_PRODUCTS.physical.priceCents)} + frete`;
  return `${format(PERSONALIZED_PRODUCTS.exclusive.minimumPriceCents)}–${format(PERSONALIZED_PRODUCTS.exclusive.maximumPriceCents)}`;
}

function value(details: Record<string, unknown>, key: string, fallback: string): string {
  const entry = details[key];
  if (typeof entry === "string" && entry.trim()) return entry.trim();
  if (Array.isArray(entry)) return entry.map((part) => String(part)).join(", ") || fallback;
  if (typeof entry === "boolean") return entry ? "Sim" : "Não";
  return fallback;
}

function htmlSection(title: string, rows: Array<[string, string]>): string {
  return `<section><h2>${escapeHtml(title)}</h2><dl>${rows
    .map(([label, content]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(content).replace(/\n/g, "<br>")}</dd>`)
    .join("")}</dl></section>`;
}

function plainSection(title: string, rows: Array<[string, string]>): string {
  return `${title}\n${rows
    .map(([label, content]) => `${label}: ${content || "—"}`)
    .join("\n")}`;
}

export async function sendPersonalizedEmails({
  briefing,
  requestId,
  uploads,
}: {
  briefing: Briefing;
  requestId: string;
  uploads: UploadForEmail[];
}): Promise<{
  emailStatus: "sent" | "partial" | "failed";
  adminEmailSent: boolean;
  customerEmailSent: boolean;
}> {
  const copyPt = personalizedCopy["pt-BR"] as Copy;
  const copyCustomer = personalizedCopy[briefing.language];
  const name = briefing.name.trim();
  const clientProduct = productName(briefing.product, briefing.language);
  const adminProduct = productName(briefing.product, "pt-BR");
  const details = briefing as unknown as Record<string, unknown>;
  const fallback = copyPt["personalized.email.notProvided"];

  const contactRows: Array<[string, string]> = [
    [copyPt["personalized.email.name"], name],
    [copyPt["personalized.email.email"], briefing.email],
    [copyPt["personalized.email.whatsapp"], briefing.whatsapp],
    [copyPt["personalized.email.language"], briefing.language],
  ];
  const storyRows: Array<[string, string]> = [
    [copyPt["personalized.email.purpose"], value(details, "purpose", fallback)],
    [copyPt["personalized.email.story"], [
      value(details, "storyIdea", fallback),
      value(details, "storyTransform", fallback),
      value(details, "storyReal", fallback),
      value(details, "storyFeeling", fallback),
      value(details, "storyMustInclude", fallback),
    ].filter((entry) => entry !== fallback).join("\n\n") || fallback],
    [copyPt["personalized.email.characters"], [
      value(details, "charactersCount", fallback),
      value(details, "charactersNames", fallback),
      value(details, "charactersTraits", fallback),
      value(details, "charactersProtagonist", fallback),
      value(details, "charactersExclude", fallback),
    ].filter((entry) => entry !== fallback).join("\n") || fallback],
    [
      copyPt["personalized.email.styles"],
      (briefing.styles ?? []).map((style) => {
        const labels: Record<string, string> = {
          murder: copyPt["personalized.styleMurder"],
          disappearance: copyPt["personalized.styleDisappearance"],
          crime: copyPt["personalized.styleCrime"],
          psychological: copyPt["personalized.stylePsychological"],
          suspense: copyPt["personalized.styleSuspense"],
          conspiracy: copyPt["personalized.styleConspiracy"],
          family: copyPt["personalized.styleFamily"],
          romance: copyPt["personalized.styleRomance"],
          supernatural: copyPt["personalized.styleSupernatural"],
          other: copyPt["personalized.styleOther"],
        };
        return labels[style] ?? style;
      }).join(", ") || fallback,
    ],
    [copyPt["personalized.email.deadline"], value(details, "deadline", fallback)],
  ];
  const optionRows: Array<[string, string]> = [];
  if (briefing.product === "physical") {
    optionRows.push([
      copyPt["personalized.email.digitalAddon"],
      briefing.digitalAddonInterest ? copyPt["personalized.email.yes"] : copyPt["personalized.email.no"],
    ]);
  }
  if (briefing.product === "exclusive") {
    optionRows.push([
      copyPt["personalized.email.budget"],
      value(details, "budgetRange", fallback),
    ]);
  }
  optionRows.push([
    copyPt["personalized.email.additionalInfo"],
    value(details, "additionalInfo", fallback),
  ]);

  const consentRows: Array<[string, string]> = [
    [copyPt["personalized.email.consentProject"], copyPt["personalized.email.yes"]],
    [copyPt["personalized.email.consentPrivacy"], copyPt["personalized.email.yes"]],
    [
      copyPt["personalized.email.portfolio"],
      briefing.consentPortfolio ? copyPt["personalized.email.yes"] : copyPt["personalized.email.no"],
    ],
  ];

  const fileRows: Array<[string, string]> = [];
  for (const upload of uploads) {
    const signedUrl = await storage.createTemporaryDownloadUrl(upload.objectPath);
    fileRows.push([upload.originalName, signedUrl]);
  }
  const checkoutRows: Array<[string, string]> = [];
  const checkoutUrl = PERSONALIZED_PRODUCTS[briefing.product].checkoutUrl;
  if (checkoutUrl) checkoutRows.push([copyPt["personalized.email.checkout"], checkoutUrl]);
  if (briefing.product === "physical" && PERSONALIZED_PRODUCTS.physical.freightCheckoutUrl) {
    checkoutRows.push(["Checkout do frete", PERSONALIZED_PRODUCTS.physical.freightCheckoutUrl]);
  }

  const adminRows: Array<[string, string]> = [
    [copyPt["personalized.email.product"], adminProduct],
    [copyPt["personalized.email.price"], referencePrice(briefing.product)],
  ];

  const adminSections = [
    htmlSection("Produto e preço de referência", adminRows),
    htmlSection("Contato", contactRows),
    htmlSection("Objetivo, história e personagens", storyRows),
    htmlSection("Opções do produto", optionRows),
    htmlSection(copyPt["personalized.email.consents"], consentRows),
    ...(fileRows.length
      ? [`<section><h2>${escapeHtml(copyPt["personalized.email.attachments"])}</h2><ul>${fileRows
          .map(([label, url]) => `<li><a href="${escapeHtml(url)}">${escapeHtml(label)}</a> <small>(link válido por 24 horas)</small></li>`)
          .join("")}</ul></section>`]
      : []),
    ...(checkoutRows.length ? [htmlSection(copyPt["personalized.email.checkout"], checkoutRows)] : []),
    ...(briefing.product === "physical"
      ? [`<p><strong>${escapeHtml(copyPt["personalized.email.freightReminder"])}</strong></p>`]
      : []),
  ];

  const adminText = [
    copyPt["personalized.email.adminIntro"],
    "",
    plainSection("Produto e preço de referência", adminRows),
    plainSection("Contato", contactRows),
    plainSection("Objetivo, história e personagens", storyRows),
    plainSection("Opções do produto", optionRows),
    plainSection(copyPt["personalized.email.consents"], consentRows),
    ...(fileRows.length
      ? [plainSection(copyPt["personalized.email.attachments"], fileRows.map(([name, url]): [string, string] => [name, `${url} (link válido por 24 horas)`]))]
      : []),
    ...(checkoutRows.length
      ? [plainSection(copyPt["personalized.email.checkout"], checkoutRows)]
      : []),
    ...(briefing.product === "physical"
      ? [copyPt["personalized.email.freightReminder"]]
      : []),
    "",
    `Solicitação: ${requestId}`,
  ].join("\n\n");
  const adminSubjectTemplate = briefing.product === "exclusive"
    ? copyPt["personalized.email.adminSubjectExclusive"]
    : copyPt["personalized.email.adminSubject"];
  const adminSubject = formatSubject(interpolate(adminSubjectTemplate, {
    product: adminProduct,
    name,
  }));

  const customerSubject = copyCustomer["personalized.email.customerSubject"];
  const customerBodyTemplate = briefing.product === "exclusive"
    ? copyCustomer["personalized.email.customerBodyExclusive"]
    : copyCustomer["personalized.email.customerBody"];
  const customerBody = interpolate(customerBodyTemplate, {
    name,
    product: clientProduct,
  });
  const customerMessage: MailMessage = {
    to: briefing.email,
    subject: customerSubject,
    text: `${copyCustomer["personalized.email.customerGreeting"].replace("{name}", name)}\n\n${customerBody}`,
    html: `<p>${escapeHtml(copyCustomer["personalized.email.customerGreeting"].replace("{name}", name))}</p><p>${escapeHtml(customerBody)}</p>`,
  };

  const adminTo = getPersonalizedAdminEmail();
  if (!adminTo) throw new Error("Personalized admin email is not configured");
  const adminMessage: MailMessage = {
    to: adminTo,
    replyTo: briefing.email,
    subject: adminSubject,
    text: adminText,
    html: `<div style="font-family:Arial,sans-serif;color:#231e24;line-height:1.5"><p>${escapeHtml(copyPt["personalized.email.adminIntro"])}</p>${adminSections.join("")}<p><small>Solicitação: ${escapeHtml(requestId)}</small></p></div>`,
  };

  const results = await Promise.allSettled([
    sendMail(adminMessage),
    sendMail(customerMessage),
  ]);
  const adminSent = results[0].status === "fulfilled";
  const customerEmailSent = results[1].status === "fulfilled";
  const emailStatus = adminSent && customerEmailSent ? "sent" : adminSent || customerEmailSent ? "partial" : "failed";
  return { emailStatus, adminEmailSent: adminSent, customerEmailSent };
}
