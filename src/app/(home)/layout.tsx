import NavBar from "../../ui/components/not-game/nav";
export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex md:flex-row flex-col gap-10 h-full">
			<NavBar />
			<main className="mt-70 md:ml-50 md:mt-0">{children}</main>
		</main>
	);
}
