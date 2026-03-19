"use server";

import db from "@/db";
import { games } from "@/db/schemas/game";
import { users } from "@/db/schemas/user";
import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import getCurrentUser from "@/lib/funcs/auth/user";
import type { GameActionState } from "@/lib/types/game-action";
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

export default async function createGame(
	_prevState: GameActionState | null,
	payload: FormData,
) {
	const gameName = payload.get("gameName");
	const errors: Record<string, string> = {};
	const normalizedGameName =
		typeof gameName === "string" ? gameName.trim() : "";

	if (!normalizedGameName) {
		errors.gameName = "Game name is required";
	}
	if (normalizedGameName.length > 80) {
		errors.gameName = "Game name must be 80 characters or fewer";
	}

	if (Object.keys(errors).length > 0) {
		return { success: false, errors } satisfies GameActionState;
	}

	await hasTokenOrUnauthorized();
	const user = await getCurrentUser();
	if (!user) {
		return {
			success: false,
			errors: { auth: "User not found" },
		} satisfies GameActionState;
	}

	const existingGame = await db.query.games.findFirst({
		where: (game, { and, eq }) =>
			and(eq(game.userId, user.id), eq(game.name, normalizedGameName)),
		columns: {
			id: true,
		},
	});

	if (existingGame) {
		return gameActionError(
			"gameName",
			"You already have a game with that name",
		);
	}

	const [newGame] = await db
		.insert(games)
		.values({
			name: normalizedGameName,
			userId: user.id,
		})
		.returning({
			id: games.id,
		});

	if (!newGame) {
		return gameActionError("game", "Unable to create game");
	}

	await db
		.update(users)
		.set({ currentGameId: newGame.id })
		.where(eq(users.id, user.id));

	redirect("/game");
}
