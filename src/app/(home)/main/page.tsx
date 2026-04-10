import logout from "@/actions/auth/logout";
import db from "@/db";
import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import getCurrentUser from "@/lib/funcs/auth/user";
import getCurrentGame from "@/lib/funcs/game/getGame";
import HomeButtons from "../../ui/components/home/buttons";

export const metadata = {
	title: "Main | Zirus",
	description: "Welcome to the main page of Zirus.",
};

export default async function MainPage() {
	await hasTokenOrUnauthorized();
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
	return (
		<main className="px-6 py-8">
			<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
				<div />
				<h1 className="text-center font-bold">Main Page</h1>
				<form action={logout} className="justify-self-end">
					<button
						className="body text-xl p-3 bg-red-400 hover:bg-red-500"
						type="submit"
					>
						Logout
					</button>
				</form>
			</div>
			<hr className="mt-8 border-white" />
			<h2 className="body w-fit rounded-b-2xl border border-gray-600/50 px-4 py-3 text-2xl justify-self-center mb-7">
				Welcome to your Home Page!
			</h2>
			<p className="justify-self-center body max-w-2xl text-center text-lg text-blue-100/85">
				Create a fresh run, reopen one of your saved games, or jump back
				into the active game you already have in progress.
			</p>
			{!hasSavedGames && !hasCurrentGame && (
				<p className="body rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-center text-sm text-blue-100/85 max-w-fit justify-self-center mt-5">
					You do not have any saved games yet. Start with a new game.
				</p>
			)}
			<HomeButtons
				hasSavedGames={hasSavedGames}
				hasCurrentGame={hasCurrentGame}
			/>
		</main>
	);
}
