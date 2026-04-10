"use server";

import { eq } from "drizzle-orm";
import { games } from "@/db/schemas/game";
import { getSessionToken } from "../auth/session";
import db from "@/db";

export default async function getCurrentGame() {
    const session = await getSessionToken();
    if (!session) return null;
    const { user } = (await db.query.sessions.findFirst({
        where: (sessions, { eq }) => eq(sessions.token, session),
        with: {
            user: true,
        },
    })) || { user: null };
    if (!user) return null;
    const currentGame = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, user.id),
        columns: {
            currentGameId: true,
        },
    });
    if (!currentGame?.currentGameId) return null;

    const [game] = await db
        .select()
        .from(games)
        .where(eq(games.id, currentGame.currentGameId))
        .limit(1);

    return game ?? null;
}
