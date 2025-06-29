import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const artworks = pgTable("artworks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  year: integer("year"),
  medium: text("medium"),
  dimensions: text("dimensions"),
  description: text("description"),
  imageUrl: text("image_url"),
  qrCode: text("qr_code").unique(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ownerships = pgTable("ownerships", {
  id: serial("id").primaryKey(),
  artworkId: integer("artwork_id").references(() => artworks.id).notNull(),
  ownerId: integer("owner_id").references(() => users.id).notNull(),
  ownerName: text("owner_name").notNull(),
  ownerType: text("owner_type").notNull(), // "artist", "gallery", "private_collector", etc.
  acquisitionDate: timestamp("acquisition_date").defaultNow(),
  acquisitionDetails: text("acquisition_details"),
  isCurrentOwner: boolean("is_current_owner").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transferRequests = pgTable("transfer_requests", {
  id: serial("id").primaryKey(),
  artworkId: integer("artwork_id").references(() => artworks.id).notNull(),
  fromOwnerId: integer("from_owner_id").references(() => users.id).notNull(),
  toOwnerId: integer("to_owner_id").references(() => users.id),
  toOwnerEmail: text("to_owner_email"),
  transferCode: text("transfer_code").unique().notNull(),
  status: text("status").default("pending"), // "pending", "confirmed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
  confirmedAt: timestamp("confirmed_at"),
});

export const scanLogs = pgTable("scan_logs", {
  id: serial("id").primaryKey(),
  artworkId: integer("artwork_id").references(() => artworks.id).notNull(),
  scannedBy: integer("scanned_by").references(() => users.id),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  scannedAt: timestamp("scanned_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertArtworkSchema = createInsertSchema(artworks).omit({
  id: true,
  createdAt: true,
  qrCode: true,
});

export const updateArtworkSchema = createInsertSchema(artworks).omit({
  id: true,
  createdAt: true,
}).partial();

export const insertOwnershipSchema = createInsertSchema(ownerships).omit({
  id: true,
  createdAt: true,
});

export const insertTransferRequestSchema = createInsertSchema(transferRequests).omit({
  id: true,
  createdAt: true,
  confirmedAt: true,
});

export const insertScanLogSchema = createInsertSchema(scanLogs).omit({
  id: true,
  scannedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Artwork = typeof artworks.$inferSelect;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
export type UpdateArtwork = z.infer<typeof updateArtworkSchema>;

export type Ownership = typeof ownerships.$inferSelect;
export type InsertOwnership = z.infer<typeof insertOwnershipSchema>;

export type TransferRequest = typeof transferRequests.$inferSelect;
export type InsertTransferRequest = z.infer<typeof insertTransferRequestSchema>;

export type ScanLog = typeof scanLogs.$inferSelect;
export type InsertScanLog = z.infer<typeof insertScanLogSchema>;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  ownerships: many(ownerships),
  transfersFrom: many(transferRequests, { relationName: "fromOwner" }),
  transfersTo: many(transferRequests, { relationName: "toOwner" }),
  scanLogs: many(scanLogs),
}));

export const artworksRelations = relations(artworks, ({ many }) => ({
  ownerships: many(ownerships),
  transferRequests: many(transferRequests),
  scanLogs: many(scanLogs),
}));

export const ownershipsRelations = relations(ownerships, ({ one }) => ({
  artwork: one(artworks, {
    fields: [ownerships.artworkId],
    references: [artworks.id],
  }),
  owner: one(users, {
    fields: [ownerships.ownerId],
    references: [users.id],
  }),
}));

export const transferRequestsRelations = relations(transferRequests, ({ one }) => ({
  artwork: one(artworks, {
    fields: [transferRequests.artworkId],
    references: [artworks.id],
  }),
  fromOwner: one(users, {
    fields: [transferRequests.fromOwnerId],
    references: [users.id],
    relationName: "fromOwner",
  }),
  toOwner: one(users, {
    fields: [transferRequests.toOwnerId],
    references: [users.id],
    relationName: "toOwner",
  }),
}));

export const scanLogsRelations = relations(scanLogs, ({ one }) => ({
  artwork: one(artworks, {
    fields: [scanLogs.artworkId],
    references: [artworks.id],
  }),
  scannedByUser: one(users, {
    fields: [scanLogs.scannedBy],
    references: [users.id],
  }),
}));
