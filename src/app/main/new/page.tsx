import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import type { Metadata } from "next";
import NewGameForm from "@/ui/components/game/new-form";

export const metadata: Metadata = {
	title: "New Game | Zirus",
	description: "Create a new Zirus game.",
};

export default async function NewGamePage() {
	await hasTokenOrUnauthorized();
	return (
		<main className="px-6 py-12 flex flex-col items-center gap-6">
			<h1 className="font-bold self-center justify-self-center text-center w-full">
				Create New Game
			</h1>
			<hr className="border border-white w-30" />
			<p className="body max-w-2xl text-center text-lg text-blue-100/85">
				Start a fresh run and make it your active game immediately.
			</p>
			<p className="body max-w-xl text-center text-sm text-blue-200">
				TIP: Choose a name you will recognize later from your saved-game
				list.
			</p>
			<NewGameForm />
		</main>
	);
}
