import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { getAuth } from "@clerk/express";
import { Router, type IRouter } from "express";
import { and, eq, gt, inArray } from "drizzle-orm";
import { fileTypeFromBuffer } from "file-type";
import {
  CompletePersonalizedUploadBody,
  CompletePersonalizedUploadResponse,
  CreatePersonalizedBriefingBody,
  CreatePersonalizedBriefingResponse,
  DeletePersonalizedUploadBody,
  DeletePersonalizedUploadParams,
  RequestPersonalizedUploadUrlBody,
  RequestPersonalizedUploadUrlResponse,
} from "@workspace/api-zod";
import {
  db,
  personalizedBriefingsTable,
  personalizedUploadsTable,
} from "@workspace/db";
import {
  PERSONALIZED_UPLOAD_LIMITS,
} from "@workspace/personalizados-core";
import {
  newUploadId,
  ObjectNotFoundError,
  PrivateObjectStorage,
  readObject,
} from "../lib/objectStorage";
import { isMailerConfigured } from "../lib/mailer";
import { sendPersonalizedEmails } from "../lib/personalizedEmail";
import { applyRateLimit } from "../lib/rateLimit";

const router: IRouter = Router();
const storage = new PrivateObjectStorage();
router.use("/personalizados", (req, res, next) => {
  const origin = req.get("origin");
  if (!origin) {
    next();
    return;
  }
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const forwardedHost = req.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = (forwardedHost || req.get("host") || "").toLowerCase();
    if (originHost !== requestHost) {
      res.status(403).json({ error: "origin_not_allowed" });
      return;
    }
    next();
  } catch {
    res.status(403).json({ error: "origin_not_allowed" });
  }
});
const ALLOWED_STYLES = new Set([
  "murder",
  "disappearance",
  "crime",
  "psychological",
  "suspense",
  "conspiracy",
  "family",
  "romance",
  "supernatural",
  "other",
]);
const ALLOWED_PURPOSES = new Set([
  "gift",
  "surprise",
  "real",
  "fiction",
  "idea",
  "other",
]);
const MIME_BY_EXTENSION: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".rtf": "application/rtf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function cleanText(value: string | undefined, maxLength: number): string {
  return (value ?? "")
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function safeFilename(value: string): string {
  const basename = value.replace(/\\/g, "/").split("/").pop() ?? "";
  return cleanText(basename, 180).replace(/[<>:"|?*]/g, "_");
}

function declaredMimeIsCompatible(declared: string, expected: string): boolean {
  const normalized = declared.split(";")[0].trim().toLowerCase();
  if (normalized === "application/octet-stream" || normalized === expected) return true;
  return expected === "application/rtf" && normalized === "text/rtf";
}

async function detectVerifiedMime(buffer: Buffer, extension: string): Promise<string | null> {
  const expected = MIME_BY_EXTENSION[extension];
  if (!expected) return null;

  if (extension === ".rtf") {
    return buffer.subarray(0, 5).toString("utf8").toLowerCase() === "{\\rtf" ? expected : null;
  }
  if (extension === ".txt") {
    if (buffer.includes(0)) return null;
    try {
      new TextDecoder("utf-8", { fatal: true }).decode(buffer);
      return expected;
    } catch {
      return null;
    }
  }
  if (extension === ".docx") {
    const prefix = buffer.subarray(0, 256 * 1024);
    const names = prefix.toString("latin1");
    if (
      buffer[0] === 0x50 &&
      buffer[1] === 0x4b &&
      names.includes("[Content_Types].xml") &&
      names.includes("word/document.xml")
    ) {
      return expected;
    }
    return null;
  }

  const detected = await fileTypeFromBuffer(buffer);
  return detected?.mime === expected ? expected : null;
}

router.post("/personalizados/uploads/request-url", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "sign_in_required" });
    return;
  }
  if (!(await applyRateLimit(req, res, {
    key: "personalized-upload",
    subject: userId,
    limit: 30,
    windowMs: 60 * 60 * 1000,
  }))) return;

  const parsed = RequestPersonalizedUploadUrlBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_upload_metadata" });
    return;
  }

  const name = safeFilename(parsed.data.name);
  const extension = extname(name).toLowerCase();
  const expectedMime = MIME_BY_EXTENSION[extension];
  if (
    !name ||
    !expectedMime ||
    !PERSONALIZED_UPLOAD_LIMITS.acceptedExtensions.some((accepted) => accepted === extension) ||
    !declaredMimeIsCompatible(parsed.data.contentType, expectedMime) ||
    parsed.data.size > PERSONALIZED_UPLOAD_LIMITS.maxFileBytes
  ) {
    res.status(400).json({ error: "invalid_upload_metadata" });
    return;
  }

  try {
    const recentUploads = await db
      .select({ byteSize: personalizedUploadsTable.byteSize })
      .from(personalizedUploadsTable)
      .where(and(
        eq(personalizedUploadsTable.ownerUserId, userId),
        eq(personalizedUploadsTable.draftId, parsed.data.draftId),
        inArray(personalizedUploadsTable.status, ["pending", "verified"]),
        gt(personalizedUploadsTable.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000)),
      ));
    const currentBytes = recentUploads.reduce((sum, upload) => sum + upload.byteSize, 0);
    if (
      recentUploads.length >= PERSONALIZED_UPLOAD_LIMITS.maxFiles ||
      currentBytes + parsed.data.size > PERSONALIZED_UPLOAD_LIMITS.maxTotalBytes
    ) {
      res.status(400).json({ error: "upload_limit_exceeded" });
      return;
    }

    const uploadId = newUploadId();
    const { uploadURL, objectPath } = await storage.createUploadUrl(uploadId);
    await db.insert(personalizedUploadsTable).values({
      uploadId,
      ownerUserId: userId,
      draftId: parsed.data.draftId,
      objectPath,
      originalName: name,
      declaredContentType: parsed.data.contentType,
      byteSize: parsed.data.size,
      status: "pending",
    });

    const response = RequestPersonalizedUploadUrlResponse.parse({
      uploadId,
      uploadURL,
      objectPath,
      name,
    });
    res.status(201).json(response);
  } catch (error) {
    req.log.error({ errorCode: error instanceof Error ? error.name : "unknown" }, "Private upload URL could not be created");
    res.status(500).json({ error: "upload_unavailable" });
  }
});

router.post("/personalizados/uploads/:uploadId/complete", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "sign_in_required" });
    return;
  }
  if (!(await applyRateLimit(req, res, {
    key: "personalized-upload-complete",
    subject: userId,
    limit: 40,
    windowMs: 60 * 60 * 1000,
  }))) return;

  const parsed = CompletePersonalizedUploadBody.safeParse(req.body);
  const uploadId = String(req.params.uploadId ?? "");
  if (!parsed.success || !/^[0-9a-f-]{36}$/i.test(uploadId)) {
    res.status(400).json({ error: "invalid_upload" });
    return;
  }

  try {
    const [upload] = await db
      .select()
      .from(personalizedUploadsTable)
      .where(and(
        eq(personalizedUploadsTable.uploadId, uploadId),
        eq(personalizedUploadsTable.ownerUserId, userId),
        eq(personalizedUploadsTable.draftId, parsed.data.draftId),
      ))
      .limit(1);
    if (!upload) {
      res.status(404).json({ error: "upload_not_found" });
      return;
    }
    if (upload.status === "verified") {
      res.json(CompletePersonalizedUploadResponse.parse({
        uploadId,
        name: upload.originalName,
        size: upload.byteSize,
      }));
      return;
    }
    if (upload.status !== "pending") {
      res.status(400).json({ error: "upload_not_pending" });
      return;
    }

    const file = await storage.getPrivateFile(upload.objectPath);
    const [metadata] = await file.getMetadata();
    if (Number(metadata.size) !== upload.byteSize) {
      throw new Error("Uploaded size did not match the declared size");
    }
    const bytes = await readObject(file, PERSONALIZED_UPLOAD_LIMITS.maxFileBytes);
    const extension = extname(upload.originalName).toLowerCase();
    const detectedMime = await detectVerifiedMime(bytes, extension);
    if (!detectedMime || !declaredMimeIsCompatible(upload.declaredContentType, detectedMime)) {
      throw new Error("Uploaded content did not match the declared file type");
    }

    await file.setMetadata({
      contentType: detectedMime,
      cacheControl: "private, no-store",
      metadata: {
        ownerUserId: userId,
        uploadId,
        draftId: parsed.data.draftId,
      },
    });
    await db
      .update(personalizedUploadsTable)
      .set({ status: "verified", detectedContentType: detectedMime, updatedAt: new Date() })
      .where(eq(personalizedUploadsTable.uploadId, uploadId));

    res.json(CompletePersonalizedUploadResponse.parse({
      uploadId,
      name: upload.originalName,
      size: upload.byteSize,
    }));
  } catch (error) {
    try {
      const upload = await db.query.personalizedUploadsTable.findFirst({
        where: and(
          eq(personalizedUploadsTable.uploadId, uploadId),
          eq(personalizedUploadsTable.ownerUserId, userId),
        ),
      });
      if (upload) await storage.deletePrivateFile(upload.objectPath);
      await db
        .update(personalizedUploadsTable)
        .set({ status: "rejected", updatedAt: new Date() })
        .where(eq(personalizedUploadsTable.uploadId, uploadId));
    } catch {
      // A failed cleanup leaves the object private; it cannot be attached to a briefing.
    }
    req.log.warn({ errorCode: error instanceof Error ? error.name : "unknown" }, "Private upload failed content validation");
    res.status(400).json({ error: "invalid_file_content" });
  }
});

router.delete("/personalizados/uploads/:uploadId", async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "sign_in_required" });
    return;
  }
  if (!(await applyRateLimit(req, res, {
    key: "personalized-upload-delete",
    subject: userId,
    limit: 40,
    windowMs: 60 * 60 * 1000,
  }))) return;

  const params = DeletePersonalizedUploadParams.safeParse(req.params);
  const body = DeletePersonalizedUploadBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: "invalid_upload" });
    return;
  }

  try {
    const [upload] = await db
      .select()
      .from(personalizedUploadsTable)
      .where(and(
        eq(personalizedUploadsTable.uploadId, params.data.uploadId),
        eq(personalizedUploadsTable.ownerUserId, userId),
        eq(personalizedUploadsTable.draftId, body.data.draftId),
        inArray(personalizedUploadsTable.status, ["pending", "verified", "rejected"]),
      ))
      .limit(1);
    if (!upload) {
      res.status(404).json({ error: "upload_not_found" });
      return;
    }
    try {
      await storage.deletePrivateFile(upload.objectPath);
    } catch (error) {
      if (!(error instanceof ObjectNotFoundError)) throw error;
    }
    await db
      .delete(personalizedUploadsTable)
      .where(eq(personalizedUploadsTable.uploadId, upload.uploadId));
    res.status(204).end();
  } catch (error) {
    req.log.error({ errorCode: error instanceof Error ? error.name : "unknown" }, "Private upload could not be removed");
    res.status(500).json({ error: "upload_delete_failed" });
  }
});

router.post("/personalizados/briefings", async (req, res) => {
  if (!(await applyRateLimit(req, res, {
    key: "personalized-briefing",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  }))) return;

  const parsed = CreatePersonalizedBriefingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "invalid_request" });
    return;
  }
  const body = parsed.data;
  if (body.honeypot.trim()) {
    res.status(400).json({ error: "invalid_request" });
    return;
  }
  if (!body.consentProject || !body.consentPrivacy) {
    res.status(400).json({ error: "consent_required" });
    return;
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const whatsapp = cleanText(body.whatsapp, 32);
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !whatsapp ||
    whatsapp.length < 6
  ) {
    res.status(400).json({ error: "invalid_contact" });
    return;
  }
  if ((body.purpose && !ALLOWED_PURPOSES.has(body.purpose)) ||
      (body.styles ?? []).some((style) => !ALLOWED_STYLES.has(style))) {
    res.status(400).json({ error: "invalid_options" });
    return;
  }

  const uploadIds = body.uploadIds ?? [];
  if (new Set(uploadIds).size !== uploadIds.length) {
    res.status(400).json({ error: "invalid_uploads" });
    return;
  }
  const { userId } = getAuth(req);
  if (uploadIds.length > 0 && !userId) {
    res.status(401).json({ error: "sign_in_required_for_attachments" });
    return;
  }

  try {
    let uploads: typeof personalizedUploadsTable.$inferSelect[] = [];
    if (uploadIds.length) {
      uploads = await db
        .select()
        .from(personalizedUploadsTable)
        .where(and(
          inArray(personalizedUploadsTable.uploadId, uploadIds),
          eq(personalizedUploadsTable.ownerUserId, userId!),
          eq(personalizedUploadsTable.draftId, body.draftId),
          eq(personalizedUploadsTable.status, "verified"),
        ));
      const uploadedBytes = uploads.reduce((sum, upload) => sum + upload.byteSize, 0);
      if (
        uploads.length !== uploadIds.length ||
        uploads.length > PERSONALIZED_UPLOAD_LIMITS.maxFiles ||
        uploadedBytes > PERSONALIZED_UPLOAD_LIMITS.maxTotalBytes
      ) {
        res.status(400).json({ error: "invalid_uploads" });
        return;
      }
    }

    const sanitized = {
      ...body,
      name,
      email,
      whatsapp,
      purpose: cleanText(body.purpose, 120),
      storyIdea: cleanText(body.storyIdea, 6000),
      storyTransform: cleanText(body.storyTransform, 3000),
      storyReal: cleanText(body.storyReal, 3000),
      storyFeeling: cleanText(body.storyFeeling, 2000),
      storyMustInclude: cleanText(body.storyMustInclude, 3000),
      charactersCount: cleanText(body.charactersCount, 80),
      charactersNames: cleanText(body.charactersNames, 3000),
      charactersTraits: cleanText(body.charactersTraits, 3000),
      charactersProtagonist: cleanText(body.charactersProtagonist, 1000),
      charactersExclude: cleanText(body.charactersExclude, 1000),
      styles: body.styles ?? [],
      deadline: cleanText(body.deadline, 300),
      budgetRange: cleanText(body.budgetRange, 200),
      additionalInfo: cleanText(body.additionalInfo, 3000),
      uploadIds: undefined,
      honeypot: undefined,
    };
    const requestId = randomUUID();
    let briefingId = 0;

    await db.transaction(async (transaction) => {
      if (uploadIds.length) {
        const lockedUploads = await transaction
          .select()
          .from(personalizedUploadsTable)
          .where(and(
            inArray(personalizedUploadsTable.uploadId, uploadIds),
            eq(personalizedUploadsTable.ownerUserId, userId!),
            eq(personalizedUploadsTable.draftId, body.draftId),
            eq(personalizedUploadsTable.status, "verified"),
          ))
          .for("update");
        if (lockedUploads.length !== uploadIds.length) {
          throw new Error("Upload became unavailable before submission");
        }
      }

      const [created] = await transaction
        .insert(personalizedBriefingsTable)
        .values({
          requestId,
          product: body.product,
          language: body.language,
          contactName: name,
          contactEmail: email,
          contactWhatsapp: whatsapp,
          details: sanitized,
          consentProject: body.consentProject,
          consentPrivacy: body.consentPrivacy,
          consentPortfolio: body.consentPortfolio,
          consentAcceptedAt: new Date(),
          privacyDisclosureVersion: "personalized-intake-disclosure-v1",
          customerEmailStatus: "pending",
          adminEmailStatus: "pending",
        })
        .returning({ id: personalizedBriefingsTable.id });
      briefingId = created.id;

      if (uploadIds.length) {
        const attached = await transaction
          .update(personalizedUploadsTable)
          .set({ status: "attached", briefingId, updatedAt: new Date() })
          .where(and(
            inArray(personalizedUploadsTable.uploadId, uploadIds),
            eq(personalizedUploadsTable.status, "verified"),
          ))
          .returning({ uploadId: personalizedUploadsTable.uploadId });
        if (attached.length !== uploadIds.length) {
          throw new Error("Upload attachment was incomplete");
        }
      }
    });

    if (!isMailerConfigured()) {
      req.log.error({ reason: "smtp_not_configured", requestId }, "Personalized request saved but email delivery is not configured");
      await db
        .update(personalizedBriefingsTable)
        .set({ customerEmailStatus: "not_configured", adminEmailStatus: "not_configured" })
        .where(eq(personalizedBriefingsTable.requestId, requestId));
      res.status(202).json(CreatePersonalizedBriefingResponse.parse({
        requestId,
        emailStatus: "not_configured",
        customerEmailSent: false,
      }));
      return;
    }

    try {
      const delivery = await sendPersonalizedEmails({
        briefing: { ...body, name, email, whatsapp },
        requestId,
        uploads,
      });
      await db
        .update(personalizedBriefingsTable)
        .set({
          customerEmailStatus: delivery.customerEmailSent ? "sent" : "failed",
          adminEmailStatus: delivery.adminEmailSent ? "sent" : "failed",
        })
        .where(eq(personalizedBriefingsTable.requestId, requestId));
      if (delivery.emailStatus !== "sent") {
        req.log.error({ reason: "smtp_delivery_incomplete", requestId }, "Personalized request saved but email delivery was incomplete");
      }
      res.status(202).json(CreatePersonalizedBriefingResponse.parse({
        requestId,
        emailStatus: delivery.emailStatus,
        customerEmailSent: delivery.customerEmailSent,
      }));
    } catch (error) {
      req.log.error({ reason: "smtp_delivery_failed", errorCode: error instanceof Error ? error.name : "unknown", requestId }, "Personalized request saved but email delivery failed");
      await db
        .update(personalizedBriefingsTable)
        .set({ customerEmailStatus: "failed", adminEmailStatus: "failed" })
        .where(eq(personalizedBriefingsTable.requestId, requestId));
      res.status(202).json(CreatePersonalizedBriefingResponse.parse({
        requestId,
        emailStatus: "failed",
        customerEmailSent: false,
      }));
    }
  } catch (error) {
    req.log.error({ errorCode: error instanceof Error ? error.name : "unknown" }, "Personalized briefing could not be saved");
    res.status(500).json({ error: "request_unavailable" });
  }
});

export default router;
