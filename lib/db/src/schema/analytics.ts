import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const purchaseClickEventsTable = pgTable("purchase_click_events", {
  id: serial("id").primaryKey(),
  destination: text("destination").notNull(),
  referrer: text("referrer"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PurchaseClickEvent = typeof purchaseClickEventsTable.$inferSelect;
