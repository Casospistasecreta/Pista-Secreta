import { SignInButton, SignUpButton, useAuth } from "@clerk/react";
import { PERSONALIZED_PRODUCTS, PERSONALIZED_UPLOAD_LIMITS } from "@workspace/personalizados-core";
import { Check, ChevronLeft, ChevronRight, FileUp, ShieldCheck, X } from "lucide-react";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import { updatePageMetadata } from "@/i18n/metadata";
import { useLanguage, useT, type TranslationKey } from "@/i18n/LanguageProvider";

type Product = keyof typeof PERSONALIZED_PRODUCTS;
type UploadedReference = { uploadId: string; name: string; size: number };
type BriefingFields = {
  purpose: string;
  storyIdea: string;
  storyTransform: string;
  storyReal: string;
  storyFeeling: string;
  storyMustInclude: string;
  charactersCount: string;
  charactersNames: string;
  charactersTraits: string;
  charactersProtagonist: string;
  charactersExclude: string;
  styles: string[];
  deadline: string;
  budgetRange: string;
  digitalAddonInterest: boolean;
  additionalInfo: string;
  name: string;
  email: string;
  whatsapp: string;
  consentProject: boolean;
  consentPrivacy: boolean;
  consentPortfolio: boolean;
};

type SavedDraft = {
  draftId: string;
  product: Product;
  fields: BriefingFields;
  uploads: UploadedReference[];
  step: number;
};

const DRAFT_STORAGE_KEY = "pista-secreta:personalized-draft";
const ACCEPTED_STYLES: Array<{ id: string; label: TranslationKey }> = [
  { id: "murder", label: "personalized.styleMurder" },
  { id: "disappearance", label: "personalized.styleDisappearance" },
  { id: "crime", label: "personalized.styleCrime" },
  { id: "psychological", label: "personalized.stylePsychological" },
  { id: "suspense", label: "personalized.styleSuspense" },
  { id: "conspiracy", label: "personalized.styleConspiracy" },
  { id: "family", label: "personalized.styleFamily" },
  { id: "romance", label: "personalized.styleRomance" },
  { id: "supernatural", label: "personalized.styleSupernatural" },
  { id: "other", label: "personalized.styleOther" },
];
const PURPOSES: Array<{ id: string; label: TranslationKey }> = [
  { id: "gift", label: "personalized.purposeGift" },
  { id: "surprise", label: "personalized.purposeSurprise" },
  { id: "real", label: "personalized.purposeReal" },
  { id: "fiction", label: "personalized.purposeFiction" },
  { id: "idea", label: "personalized.purposeIdea" },
  { id: "other", label: "personalized.purposeOther" },
];
const STEPS: TranslationKey[] = [
  "personalized.stepPurpose",
  "personalized.stepStory",
  "personalized.stepCharacters",
  "personalized.stepStyle",
  "personalized.stepReferences",
  "personalized.stepContact",
  "personalized.stepConsent",
];
const EMPTY_FIELDS: BriefingFields = {
  purpose: "",
  storyIdea: "",
  storyTransform: "",
  storyReal: "",
  storyFeeling: "",
  storyMustInclude: "",
  charactersCount: "",
  charactersNames: "",
  charactersTraits: "",
  charactersProtagonist: "",
  charactersExclude: "",
  styles: [],
  deadline: "",
  budgetRange: "",
  digitalAddonInterest: false,
  additionalInfo: "",
  name: "",
  email: "",
  whatsapp: "",
  consentProject: false,
  consentPrivacy: false,
  consentPortfolio: false,
};

function readSavedDraft(): SavedDraft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedDraft>;
    if (
      parsed.product !== "digital" &&
      parsed.product !== "physical" &&
      parsed.product !== "exclusive"
    ) return null;
    if (!parsed.draftId || !parsed.fields || !Array.isArray(parsed.uploads)) return null;
    return {
      draftId: parsed.draftId,
      product: parsed.product,
      fields: { ...EMPTY_FIELDS, ...parsed.fields },
      uploads: parsed.uploads,
      step: Math.min(Math.max(parsed.step ?? 0, 0), STEPS.length - 1),
    };
  } catch {
    return null;
  }
}

function getApiPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, "/");
}

function formatCurrency(cents: number, lang: "pt-BR" | "en" | "es"): string {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function formatAmount(cents: number, lang: "pt-BR" | "en" | "es"): string {
  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function saveDraftForAuthentication(draft: SavedDraft) {
  try {
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Signing in still works; only the temporary browser copy may be unavailable.
  }
}

function Field({
  id,
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
  maxLength = 300,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
}) {
  const controlClass =
    "mt-2 w-full rounded-md border border-primary/25 bg-black/20 px-3 py-3 text-sm text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
  return (
    <label htmlFor={id} className="block text-sm text-foreground">
      <span>{label}{required ? " *" : ""}</span>
      {multiline ? (
        <textarea
          id={id}
          className={`${controlClass} min-h-28 resize-y`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          id={id}
          className={controlClass}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
        />
      )}
    </label>
  );
}

function PersonalizedForm({
  product,
  onBack,
  initialDraft,
}: {
  product: Product;
  onBack: () => void;
  initialDraft: SavedDraft | null;
}) {
  const t = useT();
  const { lang } = useLanguage();
  const { isLoaded, isSignedIn } = useAuth();
  const [draftId] = useState(() => initialDraft?.draftId ?? crypto.randomUUID());
  const [fields, setFields] = useState<BriefingFields>(() =>
    initialDraft?.product === product ? initialDraft.fields : EMPTY_FIELDS,
  );
  const [uploads, setUploads] = useState<UploadedReference[]>(() =>
    initialDraft?.product === product ? initialDraft.uploads : [],
  );
  const [step, setStep] = useState(() =>
    initialDraft?.product === product ? initialDraft.step : 0,
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [result, setResult] = useState<{ customerEmailSent: boolean } | null>(null);

  const productNameKey: TranslationKey =
    product === "digital"
      ? "personalized.digital.name"
      : product === "physical"
        ? "personalized.physical.name"
        : "personalized.exclusive.name";
  const priceLabel =
    product === "digital"
      ? formatCurrency(PERSONALIZED_PRODUCTS.digital.priceCents, lang)
      : product === "physical"
        ? t("personalized.physical.price", {
            price: formatAmount(PERSONALIZED_PRODUCTS.physical.priceCents, lang),
          })
        : t("personalized.exclusive.price", {
            minimum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.minimumPriceCents, lang),
            maximum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.maximumPriceCents, lang),
          });

  useEffect(() => {
    updatePageMetadata(
      `${t(productNameKey)} | Pista Secreta`,
      t("personalized.pageDescription"),
      lang,
    );
  }, [lang, productNameKey, t]);

  function updateField<Key extends keyof BriefingFields>(key: Key, value: BriefingFields[Key]) {
    setFormError(null);
    setFields((current) => ({ ...current, [key]: value }));
  }

  function saveForAuth() {
    saveDraftForAuthentication({ draftId, product, fields, uploads, step });
  }

  async function addFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError(false);

    const maxFiles = PERSONALIZED_UPLOAD_LIMITS.maxFiles;
    const maxSize = PERSONALIZED_UPLOAD_LIMITS.maxFileBytes;
    const maxTotal = PERSONALIZED_UPLOAD_LIMITS.maxTotalBytes;
    const currentTotal = uploads.reduce((sum, upload) => sum + upload.size, 0);
    if (
      uploads.length >= maxFiles ||
      file.size > maxSize ||
      currentTotal + file.size > maxTotal
    ) {
      setUploadError(true);
      return;
    }
    if (!isSignedIn) {
      setUploadError(true);
      return;
    }

    setUploading(true);
    try {
      const metadataResponse = await fetch(getApiPath("api/personalizados/uploads/request-url"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          draftId,
          name: file.name,
          size: file.size,
          contentType: file.type || "application/octet-stream",
        }),
      });
      if (!metadataResponse.ok) throw new Error("upload_url_failed");
      const metadata = (await metadataResponse.json()) as {
        uploadId: string;
        uploadURL: string;
        name: string;
      };

      const binaryResponse = await fetch(metadata.uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      if (!binaryResponse.ok) throw new Error("upload_failed");

      const completeResponse = await fetch(
        getApiPath(`api/personalizados/uploads/${metadata.uploadId}/complete`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ draftId }),
        },
      );
      if (!completeResponse.ok) throw new Error("upload_validation_failed");
      setUploads((current) => [
        ...current,
        { uploadId: metadata.uploadId, name: metadata.name, size: file.size },
      ]);
    } catch {
      setUploadError(true);
    } finally {
      setUploading(false);
    }
  }

  async function removeFile(uploadId: string) {
    try {
      const response = await fetch(getApiPath(`api/personalizados/uploads/${uploadId}`), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ draftId }),
      });
      if (!response.ok) throw new Error("remove_failed");
      setUploads((current) => current.filter((upload) => upload.uploadId !== uploadId));
    } catch {
      setUploadError(true);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    if (!fields.name.trim() || !fields.email.trim() || fields.whatsapp.trim().length < 6) {
      setFormError("personalized.contactRequired");
      setStep(5);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      setFormError("personalized.emailInvalid");
      setStep(5);
      return;
    }
    if (!fields.consentProject || !fields.consentPrivacy) {
      setFormError("personalized.invalidRequest");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(getApiPath("api/personalizados/briefings"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          draftId,
          language: lang,
          product,
          ...fields,
          uploadIds: uploads.map((upload) => upload.uploadId),
          honeypot,
        }),
      });
      if (!response.ok) {
        if (response.status === 429) {
          setFormError("personalized.rateLimited");
        } else if (response.status === 401) {
          setFormError("personalized.referencesLogin");
        } else {
          setFormError("personalized.submitError");
        }
        return;
      }
      const saved = (await response.json()) as { customerEmailSent?: boolean };
      setResult({ customerEmailSent: saved.customerEmailSent === true });
      try {
        window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // No action needed if storage is disabled.
      }
    } catch {
      setFormError("personalized.submitError");
    } finally {
      setSubmitting(false);
    }
  }

  const textFields: Array<{
    key: keyof BriefingFields;
    label: TranslationKey;
    multiline?: boolean;
    maxLength?: number;
  }> = [
    { key: "storyIdea", label: "personalized.storyIdea", multiline: true, maxLength: 6000 },
    { key: "storyTransform", label: "personalized.storyTransform", multiline: true, maxLength: 3000 },
    { key: "storyReal", label: "personalized.storyReal", multiline: true, maxLength: 3000 },
    { key: "storyFeeling", label: "personalized.storyFeeling", multiline: true, maxLength: 2000 },
    { key: "storyMustInclude", label: "personalized.storyMustInclude", multiline: true, maxLength: 3000 },
  ];
  const characterFields: Array<{
    key: keyof BriefingFields;
    label: TranslationKey;
    multiline?: boolean;
    maxLength?: number;
  }> = [
    { key: "charactersCount", label: "personalized.charactersCount", maxLength: 80 },
    { key: "charactersNames", label: "personalized.charactersNames", multiline: true, maxLength: 3000 },
    { key: "charactersTraits", label: "personalized.charactersTraits", multiline: true, maxLength: 3000 },
    { key: "charactersProtagonist", label: "personalized.charactersProtagonist", maxLength: 1000 },
    { key: "charactersExclude", label: "personalized.charactersExclude", maxLength: 1000 },
  ];

  function renderFreeTextField(item: {
    key: keyof BriefingFields;
    label: TranslationKey;
    multiline?: boolean;
    maxLength?: number;
  }): ReactNode {
    const current = fields[item.key];
    if (typeof current !== "string") return null;
    return (
      <Field
        key={item.key}
        id={`briefing-${item.key}`}
        label={t(item.label)}
        value={current}
        multiline={item.multiline}
        maxLength={item.maxLength}
        onChange={(value) => updateField(item.key, value as BriefingFields[typeof item.key])}
      />
    );
  }

  function renderStep() {
    if (step === 0) {
      return (
        <fieldset>
          <legend className="mb-4 font-serif text-xl font-bold">{t("personalized.choosePurpose")}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {PURPOSES.map((purpose) => (
              <label
                key={purpose.id}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm hover:border-primary/45"
              >
                <input
                  type="radio"
                  name="purpose"
                  value={purpose.id}
                  checked={fields.purpose === purpose.id}
                  onChange={() => updateField("purpose", purpose.id)}
                  className="accent-primary"
                />
                {t(purpose.label)}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    if (step === 1) {
      return <div className="grid gap-5">{textFields.map(renderFreeTextField)}</div>;
    }
    if (step === 2) {
      return <div className="grid gap-5">{characterFields.map(renderFreeTextField)}</div>;
    }
    if (step === 3) {
      return (
        <fieldset>
          <legend className="mb-4 text-sm leading-6">{t("personalized.stylesLabel")}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ACCEPTED_STYLES.map((style) => {
              const checked = fields.styles.includes(style.id);
              return (
                <label
                  key={style.id}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm hover:border-primary/45"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      updateField(
                        "styles",
                        checked
                          ? fields.styles.filter((value) => value !== style.id)
                          : [...fields.styles, style.id],
                      )
                    }
                    className="accent-primary"
                  />
                  {t(style.label)}
                </label>
              );
            })}
          </div>
        </fieldset>
      );
    }
    if (step === 4) {
      return (
        <div className="space-y-5">
          <div>
            <h3 className="font-serif text-xl font-bold">{t("personalized.referencesTitle")}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{t("personalized.referencesDescription")}</p>
            <p className="mt-2 text-xs leading-5 text-muted">{t("personalized.referencesTypes")}</p>
            <p className="mt-3 flex items-start gap-2 text-xs text-primary/80">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{t("personalized.privacyDetails")}</span>
            </p>
          </div>

          {!isLoaded ? (
            <p className="text-sm text-muted">{t("personalized.referencesLogin")}</p>
          ) : !isSignedIn ? (
            <div className="rounded-lg border border-primary/20 bg-white/[0.03] p-4">
              <p className="mb-4 text-sm leading-6">{t("personalized.referencesLogin")}</p>
              <div className="flex flex-wrap gap-3">
                <SignInButton mode="modal" forceRedirectUrl={window.location.href}>
                  <button type="button" onClick={saveForAuth} className="min-h-11 rounded bg-primary px-4 py-2 text-sm font-bold text-background">
                    {t("personalized.signIn")}
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl={window.location.href}>
                  <button type="button" onClick={saveForAuth} className="min-h-11 rounded border border-primary/40 px-4 py-2 text-sm font-bold">
                    {t("personalized.signUp")}
                  </button>
                </SignUpButton>
              </div>
            </div>
          ) : (
            <div>
              <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded border border-primary/40 px-4 py-2 text-sm font-bold hover:bg-primary/10">
                <FileUp className="size-4" aria-hidden="true" />
                {uploading ? t("personalized.uploading") : t("personalized.uploadButton")}
                <input
                  type="file"
                  className="sr-only"
                  accept={PERSONALIZED_UPLOAD_LIMITS.acceptedExtensions.join(",")}
                  disabled={uploading || uploads.length >= PERSONALIZED_UPLOAD_LIMITS.maxFiles}
                  onChange={addFile}
                />
              </label>
              {uploadError && <p className="mt-2 text-sm text-red-300">{t("personalized.uploadError")} {t("personalized.uploadLimit")}</p>}
              <ul className="mt-4 space-y-2">
                {uploads.map((upload) => (
                  <li key={upload.uploadId} className="flex items-center justify-between gap-3 rounded border border-primary/15 px-3 py-2 text-sm">
                    <span className="min-w-0 break-all">{upload.name} <span className="text-xs text-muted">({(upload.size / (1024 * 1024)).toFixed(1)} MB)</span></span>
                    <button
                      type="button"
                      onClick={() => removeFile(upload.uploadId)}
                      aria-label={t("personalized.removeFile", { filename: upload.name })}
                      className="flex size-10 shrink-0 items-center justify-center rounded hover:bg-white/10"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    if (step === 5) {
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="briefing-deadline"
            label={t("personalized.deadline")}
            value={fields.deadline}
            onChange={(value) => updateField("deadline", value)}
            placeholder={t("personalized.deadlinePlaceholder")}
          />
          {product === "exclusive" && (
            <Field
              id="briefing-budget"
              label={t("personalized.exclusive.budget")}
              value={fields.budgetRange}
              onChange={(value) => updateField("budgetRange", value)}
              placeholder={t("personalized.exclusive.budgetPlaceholder")}
            />
          )}
          <Field
            id="briefing-name"
            label={t("personalized.contactName")}
            value={fields.name}
            onChange={(value) => updateField("name", value)}
            required
            autoComplete="name"
            maxLength={120}
          />
          <Field
            id="briefing-email"
            label={t("personalized.contactEmail")}
            value={fields.email}
            onChange={(value) => updateField("email", value)}
            type="email"
            required
            autoComplete="email"
            maxLength={254}
          />
          <Field
            id="briefing-whatsapp"
            label={t("personalized.contactWhatsapp")}
            value={fields.whatsapp}
            onChange={(value) => updateField("whatsapp", value)}
            type="tel"
            required
            autoComplete="tel"
            maxLength={32}
          />
          {product === "physical" && (
            <label className="flex items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-3 text-sm sm:col-span-2">
              <input
                type="checkbox"
                checked={fields.digitalAddonInterest}
                onChange={(event) => updateField("digitalAddonInterest", event.target.checked)}
                className="mt-1 accent-primary"
              />
              <span>
                {t("personalized.physical.digitalAddon")}
                <span className="mt-1 block text-xs text-muted">{t("personalized.physical.digitalAddonPrice")}</span>
              </span>
            </label>
          )}
          <div className="sm:col-span-2">
            <Field
              id="briefing-additional-info"
              label={t("personalized.additionalInfo")}
              value={fields.additionalInfo}
              onChange={(value) => updateField("additionalInfo", value)}
              multiline
            />
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6">
          <input
            type="checkbox"
            checked={fields.consentProject}
            onChange={(event) => updateField("consentProject", event.target.checked)}
            className="mt-1 accent-primary"
          />
          <span>{t("personalized.consentProject")}</span>
        </label>
        <details className="rounded-md border border-primary/20 bg-white/[0.03] px-4 py-3">
          <summary className="cursor-pointer text-sm font-semibold">{t("personalized.privacyLink")}</summary>
          <p className="mt-2 text-sm leading-6 text-muted">{t("personalized.privacyDetails")}</p>
        </details>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6">
          <input
            type="checkbox"
            checked={fields.consentPrivacy}
            onChange={(event) => updateField("consentPrivacy", event.target.checked)}
            className="mt-1 accent-primary"
          />
          <span>{t("personalized.consentPrivacy")}</span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 bg-white/[0.03] p-4 text-sm leading-6">
          <input
            type="checkbox"
            checked={fields.consentPortfolio}
            onChange={(event) => updateField("consentPortfolio", event.target.checked)}
            className="mt-1 accent-primary"
          />
          <span>{t("personalized.consentPortfolio")}</span>
        </label>
      </div>
    );
  }

  if (result) {
    return (
      <section className="rounded-xl border border-primary/20 bg-white/[0.04] p-6 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">{t("personalized.pageEyebrow")}</p>
        <h2 className="mt-4 font-serif text-3xl font-bold">{t("personalized.successTitle")}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">{t("personalized.successBody")}</p>
        {!result.customerEmailSent && (
          <p role="status" className="mt-5 rounded-lg border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            {t("personalized.emailFailed")}
          </p>
        )}
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center rounded bg-primary px-5 py-3 font-bold text-background">
          {t("personalized.backHome")}
        </Link>
      </section>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="relative rounded-xl border border-primary/20 bg-white/[0.04] p-5 md:p-9">
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px opacity-0"
      />
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <button type="button" onClick={onBack} className="mb-4 inline-flex min-h-10 items-center gap-2 text-sm text-muted hover:text-foreground">
            <ChevronLeft className="size-4" aria-hidden="true" />
            {t("personalized.previous")}
          </button>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80">{t("personalized.briefingEyebrow")}</p>
          <h2 className="mt-2 font-serif text-2xl font-bold">{t(productNameKey)}</h2>
          <p className="mt-1 text-sm font-semibold text-primary">{priceLabel}</p>
          <p className="mt-2 text-xs leading-5 text-muted">{t("personalized.currencyNote")}</p>
          {product === "physical" && (
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              {t(PERSONALIZED_PRODUCTS.physical.shippingNoteKey)}
            </p>
          )}
        </div>
        <span className="rounded-full border border-primary/25 px-3 py-1 text-xs text-muted">
          {t("personalized.stepOf", { current: step + 1, total: STEPS.length })}
        </span>
      </div>

      <div className="mb-7 flex gap-1.5" aria-hidden="true">
        {STEPS.map((_, index) => (
          <span key={index} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-primary" : "bg-white/10"}`} />
        ))}
      </div>
      <h3 className="mb-5 font-serif text-lg font-bold">{t(STEPS[step])}</h3>
      {renderStep()}

      {formError && <p role="alert" className="mt-5 rounded-md border border-red-300/25 bg-red-400/10 p-3 text-sm text-red-200">{t(formError as TranslationKey)}</p>}
      <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          disabled={step === 0 || uploading || submitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary/30 px-5 py-3 text-sm font-semibold disabled:invisible"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          {t("personalized.previous")}
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))}
            disabled={uploading || submitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background disabled:opacity-60"
          >
            {t("personalized.next")}
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting || uploading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background disabled:opacity-60"
          >
            {submitting ? t("personalized.submitting") : t("personalized.submit")}
            {!submitting && <Check className="size-4" aria-hidden="true" />}
          </button>
        )}
      </div>
    </form>
  );
}

export default function PersonalizedPage() {
  const t = useT();
  const { lang } = useLanguage();
  const [restored, setRestored] = useState(readSavedDraft);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(restored?.product ?? null);

  useEffect(() => {
    if (!restored) return;
    try {
      window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // The in-memory copy remains available for this render.
    }
    setRestored(null);
  }, [restored]);

  useEffect(() => {
    updatePageMetadata(
      `${t("personalized.pageTitle")} | Pista Secreta`,
      t("personalized.pageDescription"),
      lang,
    );
  }, [lang, t]);

  const products: Array<{
    id: Product;
    name: TranslationKey;
    summary: TranslationKey;
    button: TranslationKey;
    includesTitle?: TranslationKey;
    includes?: TranslationKey;
    note?: TranslationKey;
    price: string;
  }> = [
    {
      id: "digital",
      name: "personalized.digital.name",
      summary: "personalized.digital.summary",
      includesTitle: "personalized.digital.includesTitle",
      includes: "personalized.digital.includes",
      note: "personalized.digital.scope",
      button: "personalized.selectDigital",
      price: formatCurrency(PERSONALIZED_PRODUCTS.digital.priceCents, lang),
    },
    {
      id: "physical",
      name: "personalized.physical.name",
      summary: "personalized.physical.summary",
      includesTitle: "personalized.physical.includesTitle",
      includes: "personalized.physical.includes",
      note: PERSONALIZED_PRODUCTS.physical.shippingNoteKey,
      button: "personalized.selectPhysical",
      price: t("personalized.physical.price", {
        price: formatAmount(PERSONALIZED_PRODUCTS.physical.priceCents, lang),
      }),
    },
    {
      id: "exclusive",
      name: "personalized.exclusive.name",
      summary: "personalized.exclusive.summary",
      includes: "personalized.exclusive.includes",
      button: "personalized.selectExclusive",
      price: "",
    },
  ];

  if (selectedProduct) {
    return (
      <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8 flex items-center justify-between gap-4">
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground">
              {t("personalized.backHome")}
            </Link>
            <LanguageSwitcher className="shrink-0" />
          </header>
          <PersonalizedForm
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            initialDraft={restored}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground">
            {t("personalized.backHome")}
          </Link>
          <LanguageSwitcher className="shrink-0" />
        </header>

        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary/80">{t("personalized.pageEyebrow")}</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">{t("personalized.pageTitle")}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">{t("personalized.pageDescription")}</p>
          <p className="mt-4 text-sm text-primary/80">{t("personalized.currencyNote")}</p>
        </div>

        <section aria-label={t("personalized.pageEyebrow")} className="grid items-stretch gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="flex flex-col rounded-xl border border-primary/20 bg-white/[0.04] p-5 md:p-6">
              <h2 className="font-serif text-xl font-bold leading-tight">{t(product.name)}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{t(product.summary)}</p>
              <div className="mt-5 min-h-8 font-serif text-2xl font-bold text-primary">
                {product.id === "exclusive"
                  ? t("personalized.exclusive.price", {
                      minimum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.minimumPriceCents, lang),
                      maximum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.maximumPriceCents, lang),
                    })
                  : product.price}
              </div>
              {product.includesTitle && (
                <h3 className="mt-5 text-xs font-bold uppercase tracking-widest text-foreground">{t(product.includesTitle)}</h3>
              )}
              {product.includes && <p className="mt-2 text-sm leading-6 text-muted">{t(product.includes)}</p>}
              {product.note && (
                <p className="mt-4 text-xs leading-5 text-muted">
                  {product.id === "exclusive"
                    ? t(product.note, {
                        minimum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.minimumPriceCents, lang),
                        maximum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.maximumPriceCents, lang),
                      })
                    : t(product.note)}
                </p>
              )}
              {product.id === "physical" && (
                <p className="mt-3 text-xs leading-5 text-muted">{t("personalized.physical.digitalAddonPrice")}</p>
              )}
              <button
                type="button"
                onClick={() => setSelectedProduct(product.id)}
                className="mt-auto inline-flex min-h-12 items-center justify-center rounded bg-primary px-4 py-3 text-sm font-bold text-background hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t(product.button)}
              </button>
            </article>
          ))}
        </section>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-muted">{t("personalized.privacyDetails")}</p>
      </div>
    </main>
  );
}
