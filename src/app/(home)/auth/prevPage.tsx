import signin from "@/actions/auth/signin";
import signup from "@/actions/auth/signup";
import { ElementClass } from "@/lib/types";
import AuthForm from "@/ui/components/auth/form";
import Link from "next/link";
import { hasValidToken } from "@/lib/funcs/auth/session";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auth | Zirus",
	description: "Log in or sign up to Zirus.",
};

export default async function AuthPage() {
	const sectionClass: ElementClass = "";
	const sectionHeadingClass: ElementClass = "justify-self-center";
	if (await hasValidToken()) redirect("/main");

	return (
		<main className="flex flex-col items-center">
			<h1 className="justify-self-center mb-1">Auth Page</h1>
			<hr className="mb-10 w-20 justify-self-center" />
			<main className="flex gap-20 justify-center items-start w-full flex-wrap">
				<section className={sectionClass}>
					<h2 className={sectionHeadingClass}>Log In</h2>
					<AuthForm act={signin} login />
				</section>
				<section className={sectionClass}>
					<h2 className={sectionHeadingClass}>Sign Up</h2>
					<AuthForm act={signup} />
				</section>
			</main>
			<Link href="/" className="mt-10">
				Home
			</Link>
		</main>
	);
}
