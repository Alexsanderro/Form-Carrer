import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

/* ENUM */

export const roleEnum = pgEnum("role", ["user", "admin"]);

/* USERS */

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  openId: varchar("openId", { length: 64 })
    .notNull()
    .unique(),

  name: text("name"),

  email: varchar("email", { length: 320 }),

  loginMethod: varchar("loginMethod", { length: 64 }),

  role: roleEnum("role")
    .default("user")
    .notNull(),

  createdAt: timestamp("createdAt")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull(),

  lastSignedIn: timestamp("lastSignedIn")
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/* REGISTROS */

export const registros = pgTable("registros", {
  id: serial("id").primaryKey(),

  curso: varchar("curso", { length: 100 })
    .notNull(),

  periodo: varchar("periodo", { length: 50 })
    .notNull(),

  createdAt: timestamp("createdAt")
    .defaultNow()
    .notNull(),
});

export type Registro = typeof registros.$inferSelect;
export type InsertRegistro = typeof registros.$inferInsert;