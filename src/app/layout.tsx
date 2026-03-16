import type { Metadata } from "next";
import "./globals.css";
import fonts from "@/ui/fonts";

export const metadata: Metadata = {
	title: "Zirus",
	description: "Infect. Solve. Conquer.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning
				className={`${fonts.text.variable} ${fonts.display.variable} ${fonts.fallback.variable} ${fonts.text.className} antialiased justify-center p-10`}
			>
				{children}
			</body>
		</html>
	);
}
