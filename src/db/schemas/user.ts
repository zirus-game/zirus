import { relations } from "drizzle-orm";
import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql/sql";
import { sessions } from "./session";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email").unique(),
	password: text("password").notNull(),
	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
}));
