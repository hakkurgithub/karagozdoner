// db/schema.ts
import { pgTable, serial, text, varchar, integer, timestamp, pgEnum, primaryKey, numeric } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from "next-auth/adapters"

// Kullanıcı rolleri için bir enum tanımlıyoruz
export const userRoleEnum = pgEnum('user_role', ['b2b', 'manager']);

// Kullanıcılar tablosu (NextAuth uyumlu ama role ile genişletilmiş)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: userRoleEnum('role').default('b2b').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// NextAuth için gerekli accounts tablosu
export const accounts = pgTable(
  "accounts",
  {
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

// NextAuth için gerekli sessions tablosu
export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

// NextAuth için gerekli verification tokens tablosu
export const verificationTokens = pgTable(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

// Ürünler (Menü) tablosu
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(), // TL cinsinden (örn: 450.00)
  category: varchar('category', { length: 100 }),
  image: varchar('image', { length: 500 }),
  isActive: integer('is_active').default(1).notNull(), // 1: aktif, 0: pasif
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Siparişler tablosu
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  customerName: varchar('customer_name', { length: 255 }),
  customerPhone: varchar('customer_phone', { length: 20 }),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  orderType: varchar('order_type', { length: 50 }).default('dine-in').notNull(), // dine-in, takeaway, delivery
  total: integer('total').notNull(), // Toplam fiyat (kuruş)
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Sipariş kalemleri tablosu
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(), // O anki ürün fiyatı (kuruş)
});

// Rezervasyonlar tablosu
export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }),
  reservationDate: timestamp('reservation_date').notNull(),
  partySize: integer('party_size').notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript tip tanımları
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
export type OrderItem = typeof orderItems.$inferSelect
export type NewOrderItem = typeof orderItems.$inferInsert
export type Reservation = typeof reservations.$inferSelect
export type NewReservation = typeof reservations.$inferInsert