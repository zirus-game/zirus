import { ElementClass } from "@/lib/types/";
import Link from "next/link";
import { hasValidToken } from "../lib/funcs/auth/session";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const buttonClasses: ElementClass =
		"p-8 border-2 border-gray-600 bg-blue-500 text-2xl text-black rounded-4xl hover:shadow-lg hover:shadow-blue-900 hover:-translate-y-1 transition-all duration-500";
	if (await hasValidToken()) redirect("/main");
	return (
		<main>
			<h1 className="text-4xl font-bold text-blue-100">
				Welcome to Zirus!
			</h1>

			<p className="mt-2 text-xl">
				Please share this website with friends or family whom you think
				might be interested in this very new startup game.
			</p>
			<p className="mt-4 text-lg font-bold italic text-blue-200">
				Under active development from March 2026.
			</p>
			<div className="flex flex-col gap-2 mt-4">
				<span className="flex gap-2 items-baseline flex-wrap">
					<Link
						href="https://github.com/zirus-game/zirus"
						target="_blank"
						className="text-blue-500 hover:underline text-2xl"
					>
						Repo
					</Link>
					<p className="text-red-300 text-lg rounded-xl border-2 border-gray-400 p-3 m-2">
						Please star this repository - It will tell me that
						someone cares about this project
					</p>
				</span>
				<span>
					Email me at{" "}
					<Link
						href="mailto:zirus.game@gmail.com"
						className="text-blue-500 hover:underline"
					>
						zirus.game@gmail.com
					</Link>{" "}
					For any questions or suggestions!
				</span>
			</div>
			<section className="mt-10 flex gap-5 flex-wrap">
				<Link href={"/auth"} className={buttonClasses}>
					Login/Sign Up
				</Link>
				<Link href={"https://dev.zirus.io"} className={buttonClasses}>
					Developer Page
				</Link>
			</section>
		</main>
	);
}
