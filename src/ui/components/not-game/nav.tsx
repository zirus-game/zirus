"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
	return (
		<nav className="p-5 rounded-4xl border border-blue-500/30 bg-blue-500/10 md:w-30 w-full flex flex-col items-center fixed gap-4 text-center h-11/12">
			<Image
				src="/vercel.svg" // TODO: Replace with actual logo
				alt="Logo"
				width={50}
				height={50}
				className="mt-4"
			/>
			<ul className="flex flex-row gap-4 items-center md:flex-col md:flex-1 justify-center w-full">
				<li>
					<Link href={"/"}>Home</Link>
				</li>
				<li>
					<Link href={"/login"}>Log In</Link>
				</li>
				<li>
					<Link href={"/signup"}>Sign Up</Link>
				</li>
				<li>
					<Link href={"/about"}>About</Link>
				</li>
			</ul>
			<p>Zirus v1.0.0</p>
		</nav>
	);
}
