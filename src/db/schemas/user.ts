import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sessions } from "./session";
import { games } from "./game";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    email: text("email").unique(),
    password: text("password").notNull(),
    currentGameId: integer("current_game_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
    sessions: many(sessions),
    games: many(games),
    currentGame: one(games, {
        fields: [users.currentGameId],
        references: [games.id],
    }),
}));

export type UserType = typeof users.$inferSelect;
