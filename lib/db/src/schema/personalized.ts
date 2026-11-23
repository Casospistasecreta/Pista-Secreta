import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const personalizedBriefingsTable = pgTable(
  "personalized_briefings",
  {
    id: serial("id").primaryKey(),
    requestId: text("request_id").notNull(),
    product: text("product").notNull(),
    language: text("language").notNull(),
    contactName: text("contact_name").notNull(),
    contactEmail: text("contact_email").notNull(),
    contactWhatsapp: text("contact_whatsapp").notNull(),
    details: jsonb("details").$type<Record<string, unknown>>().notNull(),
    consentProject: boolean("consent_project").notNull(),
    consentPrivacy: boolean("consent_privacy").notNull(),
    consentPortfolio: boolean("consent_portfolio").notNull(),
    consentAcceptedAt: timestamp("consent_accepted_at", { withTimezone: true }).notNull(),
    privacyDisclosureVersion: text("privacy_disclosure_version").notNull(),
    customerEmailStatus: text("customer_email_status").notNull().default("pending"),
    adminEmailStatus: text("admin_email_status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    requestIdUnique: uniqueIndex("personalized_briefings_request_id_unique").on(table.requestId),
    createdAtIdx: index("personalized_briefings_created_at_idx").on(table.createdAt),
    contactEmailIdx: index("personalized_briefings_contact_email_idx").on(table.contactEmail),
  }),
);

export const personalizedUploadsTable = pgTable(
  "personalized_uploads",
  {
    uploadId: text("upload_id").primaryKey(),
    ownerUserId: text("owner_user_id").notNull(),
    draftId: text("draft_id").notNull(),
    objectPath: text("object_path").notNull(),
    originalName: text("original_name").notNull(),
    declaredContentType: text("declared_content_type").notNull(),
    detectedContentType: text("detected_content_type"),
    byteSize: integer("byte_size").notNull(),
    status: text("status").notNull().default("pending"),
    briefingId: integer("briefing_id").references(() => personalizedBriefingsTable.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    ownerDraftIdx: index("personalized_uploads_owner_draft_idx").on(
      table.ownerUserId,
      table.draftId,
      table.status,
    ),
    objectPathUnique: uniqueIndex("personalized_uploads_object_path_unique").on(table.objectPath),
    briefingIdx: index("personalized_uploads_briefing_idx").on(table.briefingId),
  }),
);
