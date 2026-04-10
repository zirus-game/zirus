import Link from "next/link";
export default function NotFound() {
	return (
		<main className="flex items-center justify-center h-full">
			<h1>404 Not Found</h1>
			<Link href={"/"}>Go back to Home</Link>
		</main>
	);
}
