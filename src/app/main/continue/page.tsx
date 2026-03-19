import db from "@/db";
import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import getCurrentUser from "@/lib/funcs/auth/user";
import ContinueGameForm from "@/ui/components/game/continue-form";
import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Continue Game | Zirus",
	description: "Resume one of your saved Zirus games.",
};

export default async function ContinueGamePage() {
	await hasTokenOrUnauthorized();
	const user = await getCurrentUser();
	if (!user) {
		return null;
	}
	const savedGames = await db.query.games.findMany({
		where: (games, { eq }) => eq(games.userId, user.id),
		orderBy: (games, { desc }) => [desc(games.updatedAt)],
		columns: {
			id: true,
			name: true,
			updatedAt: true,
		},
	});

	return (
		<main className="px-6 py-12 flex flex-col items-center gap-6">
			<h1 className="font-bold text-center w-full">Continue Game</h1>
			<hr className="border border-white w-30" />
			<p className="body max-w-2xl text-center text-lg text-blue-100/85">
				Pick one of your saved games and make it the active session.
			</p>
			{savedGames.length === 0 ? (
				<p className="body rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-center text-sm text-blue-100/85">
					You do not have any saved games yet.{" "}
					<Link href="/main/new" className="text-blue-400">
						Create one first
					</Link>
					.
				</p>
			) : (
				<ContinueGameForm games={savedGames} />
			)}
		</main>
	);
}
