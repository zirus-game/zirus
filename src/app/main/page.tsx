import { hasValidToken } from "@/lib/funcs/auth/session";
import { unauthorized } from "next/navigation";

export const metadata = {
	title: "Main | Zirus",
	description: "Welcome to the main page of Zirus.",
};

export default async function MainPage() {
	const tokenValid = await hasValidToken();
	if (!tokenValid) unauthorized();
	return (
		<main>
			<h1 className="justify-self-center">Main Page</h1>
		</main>
	);
}
