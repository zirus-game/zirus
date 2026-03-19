"use client";

import createGame from "@/actions/game/new";
import {
	initialGameActionState,
	type GameActionState,
} from "@/lib/types/game-action";
import { useActionState } from "react";

export default function NewGameForm() {
	const [state, action, pending] = useActionState<GameActionState, FormData>(
		createGame,
		initialGameActionState,
	);

	return (
		<form action={action} className="flex w-full max-w-lg flex-col gap-4">
			<fieldset
				disabled={pending}
				className="flex flex-col gap-4 disabled:opacity-70"
			>
				<label className="body flex flex-col gap-2 text-sm text-blue-50">
					<span className="text-base font-semibold">Game name</span>
					<input
						name="gameName"
						type="text"
						placeholder="Enter a game name"
						required
						maxLength={80}
						className="body rounded-2xl border border-gray-500/50 bg-black px-4 py-3 text-base"
					/>
				</label>
				{state.errors.gameName && (
					<p className="body text-sm text-red-400">
						{state.errors.gameName}
					</p>
				)}
				{state.errors.auth && (
					<p className="body text-sm text-red-400">
						{state.errors.auth}
					</p>
				)}
				{state.errors.game && (
					<p className="body text-sm text-red-400">
						{state.errors.game}
					</p>
				)}
				<button
					type="submit"
					disabled={pending}
					className="body rounded-2xl px-4 py-3 text-lg font-semibold text-black disabled:opacity-60"
				>
					{pending ? "Creating game..." : "Create game"}
				</button>
			</fieldset>
		</form>
	);
}
