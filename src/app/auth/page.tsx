import { ElementClass } from "@/lib/types";
import AuthForm from "../../ui/components/auth/form";

export default function AuthPage() {
	const sectionClass: ElementClass = "";
	const sectionHeadingClass: ElementClass = "justify-self-center";

	return (
		<main>
			<h1 className="justify-self-center mb-1">Auth Page</h1>
			<hr className="mb-10 w-20 justify-self-center" />
			<main className="flex gap-20 justify-center items-start w-full">
				<section className={sectionClass}>
					<h2 className={sectionHeadingClass}>Log In</h2>
					<AuthForm
						act={async () => {
							"use server";
						}}
						login
					/>
				</section>
				<section className={sectionClass}>
					<h2 className={sectionHeadingClass}>Sign Up</h2>
					<AuthForm
						act={async () => {
							"use server";
						}}
					/>
				</section>
			</main>
		</main>
	);
}
