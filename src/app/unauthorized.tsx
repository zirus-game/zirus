import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Unauthorized | Zirus",
	description: "You are not authorized to view this page",
};

export default function UnauthorizedPage() {
	return (
		<main className="justify-center p-10">
			<h1 className="justify-self-center">Unauthorized</h1>
			<main className="justify-self-center text-lg">
				<p className="mb-5">You are not authorized to view this page</p>
				<Link href="/">Go back to home</Link>
				<br />
				or
				<br />
				<Link href="/auth">Log In / Sign Up</Link>
			</main>
		</main>
	);
}
