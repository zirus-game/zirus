"use client";

import continueGame from "@/actions/game/continue";
import {
    initialGameActionState,
    type GameActionState,
} from "@/lib/types/game-action";
import { useActionState, useState } from "react";

type ContinueGameFormProps = {
    games: Array<{
        id: number;
        name: string;
        updatedAt: Date;
    }>;
};

export default function ContinueGameForm({ games }: ContinueGameFormProps) {
    const [state, action, pending] = useActionState<GameActionState, FormData>(
        continueGame,
        initialGameActionState,
    );
    const [selectedGameId, setSelectedGameId] = useState(
        String(games[0]?.id ?? ""),
    );
    const selectedGame =
        games.find((game) => String(game.id) === selectedGameId) ?? games[0];

    return (
        <form action={action} className="flex w-full max-w-lg flex-col gap-4">
            <fieldset
                disabled={pending}
                className="flex flex-col gap-4 disabled:opacity-70"
            >
                <label className="body flex flex-col gap-2 text-sm text-blue-50">
                    <span className="text-base font-semibold">Saved games</span>
                    <div className="relative">
                        <select
                            name="gameName"
                            value={selectedGameId}
                            onChange={(event) =>
                                setSelectedGameId(event.target.value)
                            }
                            className="body w-full min-w-0 appearance-none rounded-2xl border border-blue-300/25 bg-black px-4 py-3 pr-10 text-sm text-blue-50 shadow-[0_0_18px_rgba(59,130,246,0.12)] transition-colors duration-200 outline-none hover:border-gray-500/50 focus:border-gray-400/50 sm:pr-12 sm:text-base"
                        >
                            {games.map((game) => (
                                <option
                                    key={game.id}
                                    value={game.id}
                                    className="bg-slate-950 text-blue-50"
                                >
                                    {game.name}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-blue-200/80">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 011.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </div>
                    <span
                        className="text-xs text-blue-200/65"
                        suppressHydrationWarning
                    >
                        {selectedGame
                            ? `Last updated ${new Date(selectedGame.updatedAt).toLocaleString()}`
                            : "No saved games available"}
                    </span>
                    <span className="text-xs text-blue-200/65">
                        {games.length} saved{" "}
                        {games.length === 1 ? "game" : "games"} available
                    </span>
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
                    disabled={pending || games.length === 0}
                    className="body rounded-2xl px-4 py-3 text-lg font-semibold text-black disabled:opacity-60"
                >
                    {pending ? "Loading game..." : "Continue game"}
                </button>
            </fieldset>
        </form>
    );
}
