import {
    integer,
    json,
    pgTable,
    serial,
    text,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { GameStateType } from "@/lib/types/game";

export const games = pgTable(
    "games",
    {
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
        name: text("name").notNull(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        id: serial("id").primaryKey().unique(),
        state: json("state").$type<GameStateType>().notNull().default({}),
    },
    (table) => [
        unique("games_user_id_name_unique").on(table.userId, table.name),
    ],
);
