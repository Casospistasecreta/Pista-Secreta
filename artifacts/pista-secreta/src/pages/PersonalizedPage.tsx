import { SignInButton, SignUpButton, useAuth } from "@clerk/react";
import { PERSONALIZED_PRODUCTS, PERSONALIZED_UPLOAD_LIMITS } from "@workspace/personalizados-core";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  FileUp,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
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
  const amount = new Intl.NumberFormat(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
  return `R$\u00a0${amount}`;
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
          data-testid={`textarea-${id}`}
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
          data-testid={`input-${id}`}
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
            <div className="rounded-lg border border-primary/20 bg-white/[0.03] p-4 md:p-5">
              <p className="mb-4 text-sm leading-6">{t("personalized.referencesLogin")}</p>
              <div className="flex flex-wrap gap-3">
                <SignInButton mode="modal" forceRedirectUrl={window.location.href}>
                  <button data-testid="button-sign-in-attachments" type="button" onClick={saveForAuth} className="min-h-11 rounded bg-primary px-4 py-2 text-sm font-bold text-background transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    {t("personalized.signIn")}
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl={window.location.href}>
                  <button data-testid="button-sign-up-attachments" type="button" onClick={saveForAuth} className="min-h-11 rounded border border-primary/40 px-4 py-2 text-sm font-bold transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    {t("personalized.signUp")}
                  </button>
                </SignUpButton>
              </div>
            </div>
          ) : (
            <div>
              <label data-testid="label-upload-reference" className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded border border-primary/40 px-4 py-2 text-sm font-bold transition hover:bg-primary/10 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/70">
                <FileUp className="size-4" aria-hidden="true" />
                {uploading ? t("personalized.uploading") : t("personalized.uploadButton")}
                <input
                  data-testid="input-reference-file"
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
                      data-testid={`button-remove-upload-${upload.uploadId}`}
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
      <section data-testid="status-briefing-success" className="rounded-xl border border-primary/20 bg-white/[0.04] p-6 md:p-10">
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
    <form noValidate onSubmit={submit} className="relative overflow-hidden rounded-xl border border-primary/20 bg-white/[0.035] p-5 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.8)] md:p-9">
      <div className="absolute inset-x-0 top-0 h-px ultraviolet-gradient opacity-70" aria-hidden="true" />
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
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <button data-testid="button-briefing-back-to-products" type="button" onClick={onBack} className="mb-4 inline-flex min-h-10 items-center gap-2 text-sm text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70">
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
        <span data-testid="status-briefing-step" className="rounded-full border border-primary/25 bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
          {t("personalized.stepOf", { current: step + 1, total: STEPS.length })}
        </span>
      </div>

      <div
        className="mb-7 flex gap-1.5"
        role="progressbar"
        aria-label={t("personalized.stepOf", { current: step + 1, total: STEPS.length })}
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
      >
        {STEPS.map((_, index) => (
          <span key={index} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${index <= step ? "bg-primary" : "bg-white/10"}`} />
        ))}
      </div>
      <div className="rounded-lg border border-primary/10 bg-black/[0.12] p-4 md:p-6">
        <h3 className="mb-5 font-serif text-lg font-bold">{t(STEPS[step])}</h3>
        {renderStep()}
      </div>

      {formError && <p data-testid="status-briefing-error" role="alert" className="mt-5 rounded-md border border-red-300/25 bg-red-400/10 p-3 text-sm text-red-200">{t(formError as TranslationKey)}</p>}
      <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          data-testid="button-briefing-previous"
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          disabled={step === 0 || uploading || submitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 disabled:invisible"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          {t("personalized.previous")}
        </button>
        {step < STEPS.length - 1 ? (
          <button
            data-testid="button-briefing-next"
            type="button"
            onClick={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))}
            disabled={uploading || submitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
          >
            {t("personalized.next")}
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            data-testid="button-briefing-submit"
            type="submit"
            disabled={submitting || uploading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
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
            <Link data-testid="link-personalized-home" href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition hover:text-foreground">
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
        <header className="mb-8 flex items-center justify-between gap-4 md:mb-12">
          <Link data-testid="link-personalized-home" href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition hover:text-foreground">
            {t("personalized.backHome")}
          </Link>
          <LanguageSwitcher className="shrink-0" />
        </header>

        <section
          aria-labelledby="personalized-page-title"
          className="relative isolate mb-16 overflow-hidden rounded-2xl border border-primary/20 bg-white/[0.035] px-5 py-7 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.9)] md:px-10 md:py-11"
        >
          <div className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-secondary/15 blur-[100px]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-px ultraviolet-gradient opacity-70" aria-hidden="true" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80">
                {t("personalized.pageEyebrow")}
              </p>
              <h1 id="personalized-page-title" data-testid="heading-personalized-title" className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight md:text-5xl">
                {t("personalized.pageTitle")}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                {t("personalized.pageDescription")}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  data-testid="link-personalized-choose-format"
                  href="#personalized-products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-sm font-bold text-background transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t("personalized.finalCta")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <p className="inline-flex items-center gap-2 text-xs leading-5 text-primary/75">
                  <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                  {t("personalized.currencyNote")}
                </p>
              </div>
            </div>
            <aside className="rounded-xl border border-primary/15 bg-black/15 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.06] text-primary">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold">{t("personalized.trustPrivacyTitle")}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{t("personalized.trustPrivacyBody")}</p>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-3 border-t border-primary/10 pt-4">
                <LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary/80" aria-hidden="true" />
                <p className="text-xs leading-5 text-muted">{t("personalized.referencesLogin")}</p>
              </div>
            </aside>
          </div>
        </section>

        <section id="personalized-process" aria-labelledby="personalized-process-title" className="mb-16 scroll-mt-8">
          <div className="mb-6 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
              {t("personalized.pageEyebrow")}
            </p>
            <h2 id="personalized-process-title" className="mt-2 font-serif text-2xl font-bold md:text-3xl">
              {t("personalized.processTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">{t("personalized.processDescription")}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {[
              { title: "personalized.processStep1Title", body: "personalized.processStep1Body" },
              { title: "personalized.processStep2Title", body: "personalized.processStep2Body" },
              { title: "personalized.processStep3Title", body: "personalized.processStep3Body" },
            ].map((step, index) => (
              <article
                data-testid={`card-process-step-${index + 1}`}
                key={step.title}
                className="rounded-xl border border-primary/15 bg-white/[0.025] p-5 transition-colors hover:border-primary/25 hover:bg-white/[0.04] md:p-6"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-primary/70">0{index + 1}</span>
                <h3 className="mt-4 font-serif text-lg font-bold">{t(step.title as TranslationKey)}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{t(step.body as TranslationKey)}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="personalized-products" aria-labelledby="personalized-products-title" className="mb-16 scroll-mt-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
                {t("personalized.pageEyebrow")}
              </p>
              <h2 id="personalized-products-title" className="mt-2 font-serif text-2xl font-bold md:text-3xl">
                {t("personalized.productsTitle")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">{t("personalized.productsDescription")}</p>
          </div>
          <div className="grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
            {products.map((product, index) => (
              <article
                data-testid={`card-product-${product.id}`}
                key={product.id}
                className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05] md:p-6 ${
                  product.id === "digital"
                    ? "border-primary/30 shadow-[0_18px_60px_-45px_rgba(240,217,151,0.32)]"
                    : "border-primary/15 hover:border-primary/25"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px ultraviolet-gradient opacity-50" aria-hidden="true" />
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted/80">0{index + 1} / 03</span>
                </div>
                <h3 className="font-serif text-xl font-bold leading-tight">{t(product.name)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{t(product.summary)}</p>
                <div className="mt-5 border-y border-primary/10 py-4">
                  <p className="font-serif text-xl font-bold leading-tight text-primary md:text-2xl">
                    {product.id === "exclusive"
                      ? t("personalized.exclusive.price", {
                          minimum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.minimumPriceCents, lang),
                          maximum: formatCurrency(PERSONALIZED_PRODUCTS.exclusive.maximumPriceCents, lang),
                        })
                      : product.price}
                  </p>
                </div>
                {product.includesTitle && (
                  <h4 className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground">
                    {t(product.includesTitle)}
                  </h4>
                )}
                {product.includes && product.id !== "exclusive" && (
                  <ul className="mt-3 space-y-2.5 text-sm leading-5 text-muted">
                    {t(product.includes).split(/;\s*/).map((item, itemIndex) => (
                      <li key={`${product.id}-include-${itemIndex}`} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary/75" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {product.id === "exclusive" && product.includes && (
                  <p className="mt-3 text-sm leading-6 text-muted">{t(product.includes)}</p>
                )}
                {product.note && (
                  <p className="mt-4 rounded-md border border-primary/10 bg-black/[0.12] p-3 text-xs leading-5 text-muted">
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
                  data-testid={`button-select-product-${product.id}`}
                  type="button"
                  onClick={() => setSelectedProduct(product.id)}
                  className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-sm font-bold text-background transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t(product.button)}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="personalized-trust-title" className="mb-16 rounded-2xl border border-primary/15 bg-white/[0.025] p-5 md:p-8">
          <div className="mb-6 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
              {t("personalized.pageEyebrow")}
            </p>
            <h2 id="personalized-trust-title" className="mt-2 font-serif text-2xl font-bold md:text-3xl">
              {t("personalized.trustTitle")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "personalized.trustPrivacyTitle", body: "personalized.trustPrivacyBody", Icon: ShieldCheck },
              { title: "personalized.trustPaymentTitle", body: "personalized.trustPaymentBody", Icon: Check },
              { title: "personalized.trustPortfolioTitle", body: "personalized.trustPortfolioBody", Icon: LockKeyhole },
            ].map(({ title, body, Icon }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.05] text-primary/80">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-serif text-base font-bold">{t(title as TranslationKey)}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{t(body as TranslationKey)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 border-t border-primary/10 pt-5 text-xs leading-5 text-muted">
            {t("personalized.privacyDetails")}
          </p>
        </section>

        <section aria-labelledby="personalized-faq-title" className="mb-16">
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
              {t("personalized.pageEyebrow")}
            </p>
            <h2 id="personalized-faq-title" className="mt-2 font-serif text-2xl font-bold md:text-3xl">
              {t("personalized.faqTitle")}
            </h2>
          </div>
          <div className="divide-y divide-primary/10 rounded-xl border border-primary/15 bg-white/[0.025] px-4 md:px-6">
            {[
              ["personalized.faq.storyReadyQuestion", "personalized.faq.storyReadyAnswer"],
              ["personalized.faq.nextQuestion", "personalized.faq.nextAnswer"],
              ["personalized.faq.paymentQuestion", "personalized.faq.paymentAnswer"],
              ["personalized.faq.shippingQuestion", "personalized.faq.shippingAnswer"],
              ["personalized.faq.referencesQuestion", "personalized.faq.referencesAnswer"],
            ].map(([question, answer]) => (
              <details key={question} className="group py-4">
                <summary data-testid={`faq-${question.split(".").at(-1)}`} className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 font-semibold leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70">
                  <span>{t(question as TranslationKey)}</span>
                  <span className="font-mono text-lg text-primary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-2 pt-3 text-sm leading-6 text-muted">{t(answer as TranslationKey)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-primary/20 bg-primary/[0.045] px-5 py-7 text-center md:px-10 md:py-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/75">
            {t("personalized.pageEyebrow")}
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl font-serif text-2xl font-bold leading-tight md:text-3xl">
            {t("personalized.finalCtaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">
            {t("personalized.finalCtaBody")}
          </p>
          <a
            data-testid="link-personalized-final-cta"
            href="#personalized-products"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-primary px-6 py-3 text-sm font-bold text-background transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t("personalized.finalCta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </section>
      </div>
    </main>
  );
}
