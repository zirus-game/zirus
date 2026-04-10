import type { Metadata } from "next";
import "./globals.css";
import fonts from "@/ui/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import NextTopLoader from "nextjs-toploader";

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
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fonts.text.variable} ${fonts.display.variable} ${fonts.fallback.variable} ${fonts.text.className} justify-center p-10 antialiased`}
                suppressHydrationWarning
            >
                <NextTopLoader
                    color="lightblue"
                    height={3}
                    showSpinner={false}
                    zIndex={9999}
                />
                {children}
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
