import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import type { Metadata } from "next";
import NewGameForm from "@/ui/components/game/new-form";
import Link from "next/link";
import BackToMainLink from "../../../ui/components/new-and-continue/back-to-main-link";
import Heading from "../../../ui/components/new-and-continue/heading";
import ActionText from "../../../ui/components/new-and-continue/action-txt";

export const metadata: Metadata = {
	title: "New Game | Zirus",
	description: "Create a new Zirus game.",
};

export default async function NewGamePage() {
	await hasTokenOrUnauthorized();
	return (
		<main className="px-6 py-12 flex flex-col items-center gap-6">
			<BackToMainLink />
			<Heading new />
			<ActionText new />
			<p className="body max-w-xl text-center text-sm text-blue-200">
				TIP: Choose a name you will recognize later from your saved-game
				list.
			</p>
			<NewGameForm />
		</main>
	);
}
