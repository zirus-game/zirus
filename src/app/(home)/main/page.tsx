import db from "@/db";
import getCurrentUser from "@/lib/funcs/auth/user";
import getCurrentGame from "@/lib/funcs/game/getGame";
import type { Metadata } from "next";
import ContinueGameForm from "@/ui/components/game/continue-form";
import NewGameForm from "@/ui/components/game/new-form";
import LogoutButton from "@/ui/components/auth/logout-button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Main | Zirus",
    description: "Welcome to the main page of Zirus.",
};

export default async function MainPage() {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }
    const [savedGame, currentGame] = await Promise.all([
        db.query.games.findFirst({
            where: (games, { eq }) => eq(games.userId, user.id),
            columns: { id: true },
        }),
        getCurrentGame(),
    ]);
    const hasSavedGames = Boolean(savedGame);
    const hasCurrentGame = Boolean(currentGame);
    const games = await db.query.games.findMany({
        where: (games, { eq }) => eq(games.userId, user.id),
        orderBy: (games, { desc }) => [desc(games.updatedAt)],
        columns: {
            id: true,
            name: true,
            updatedAt: true,
        },
    });
    return (
        <main>
            <h1 className="mb-10">Main Page</h1>
            <main className="mb-20 flex w-full flex-wrap justify-center gap-20 text-center md:gap-40">
                <section>
                    <h2>Create a game</h2>
                    <NewGameForm />
                </section>
                {hasSavedGames && (
                    <section>
                        <h2>Continue a game</h2>
                        <ContinueGameForm games={games} />
                    </section>
                )}
            </main>
            {hasCurrentGame && <Link href="/game">Continue Last Game</Link>}
            <div className="mt-10 flex justify-center">
                <LogoutButton className="fixed right-10 bottom-10" />
            </div>
        </main>
    );
}
