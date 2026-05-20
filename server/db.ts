import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  InsertRegistro,
  InsertUser,
  registros,
  users,
} from "../drizzle/schema";

import { ENV } from "./_core/env";

/* DATABASE CONNECTION */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

/* USERS */

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };

    const updateSet: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    const textFields = ["name", "email", "loginMethod"] as const;

    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];

      if (value === undefined) return;

      const normalized = value ?? null;

      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }

    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (!values.updatedAt) {
      values.updatedAt = new Date();
    }

    await db
      .insert(users)
      .values(values)
      .onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });

  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.openId, openId))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;

  } catch (error) {
    console.error("[Database] Failed to get user:", error);
    throw error;
  }
}

/* REGISTROS */

export async function insertRegistro(
  data: InsertRegistro
): Promise<void> {
  try {
    await db.insert(registros).values(data);

  } catch (error) {
    console.error("[Database] Failed to insert registro:", error);
    throw error;
  }
}

export async function listRegistros() {
  try {
    return await db
      .select()
      .from(registros)
      .orderBy(desc(registros.createdAt));

  } catch (error) {
    console.error("[Database] Failed to list registros:", error);
    throw error;
  }
}