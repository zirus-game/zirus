import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import getCurrentGame from "@/lib/funcs/game/getGame";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Game | Zirus",
    description: "Continue your last game or start a new one.",
};

export default async function GamePage() {
    await hasTokenOrUnauthorized();
    const currentGame = await getCurrentGame();
    return (
        <main>
            <h1 className="text-3xl">Game Page</h1>
            <p className="mt-5 text-xl">
                This is where the game will be. It is currently under
                development.
            </p>
            <p className="mt-3 text-lg">
                {currentGame
                    ? `Current game: ${currentGame.name}`
                    : "No active game found."}
            </p>
        </main>
    );
}
