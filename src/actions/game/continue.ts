"use server";

import db from "@/db";
import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import getCurrentUser from "@/lib/funcs/auth/user";
import type { GameActionState } from "@/lib/types/game-action";
import { users } from "@/db/schemas/user";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

function gameActionError(field: string, message: string): GameActionState {
	return {
		success: false,
		errors: {
			[field]: message,
		},
	};
}

export default async function continueGame(
	_prevState: GameActionState | null,
	payload: FormData,
) {
	const selectedGameId = payload.get("gameName") as string | null;
	if (!selectedGameId) {
		return gameActionError("gameName", "Game ID is required");
	}
	const parsedGameId = Number(selectedGameId);
	if (!Number.isInteger(parsedGameId)) {
		return gameActionError("gameName", "Invalid game ID");
	}
	await hasTokenOrUnauthorized();
	const user = await getCurrentUser();
	if (!user) {
		return gameActionError("auth", "User not found");
	}
	const selectedGame = await db.query.games.findFirst({
		where: (game, { eq, and }) =>
			and(eq(game.id, parsedGameId), eq(game.userId, user.id)),
	});
	if (!selectedGame) {
		return gameActionError("game", "Game not found");
	}
	await db
		.update(users)
		.set({ currentGameId: selectedGame.id })
		.where(eq(users.id, user.id));
	redirect(`/game`);
}
