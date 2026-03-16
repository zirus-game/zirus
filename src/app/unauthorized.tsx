import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Unauthorized",
	description: "You are not authorized to view this page",
};

export default function UnauthorizedPage() {
	return (
		<main className="justify-center p-10">
			<h1 className="justify-self-center">Unauthorized</h1>
			<p>You are not authorized to view this page</p>
			<Link href="/">Go back to home</Link>
			<Link href="/auth">Log In / Sign Up</Link>
		</main>
	);
}
