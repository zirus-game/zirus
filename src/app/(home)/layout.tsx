import { hasValidToken } from "@/lib/funcs/auth/session";
import NavBar from "../../ui/components/not-game/nav";
import getCurrentGame from "@/lib/funcs/game/getGame";
export default async function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col gap-8 md:grid md:grid-cols-[10rem_minmax(0,1fr)] md:items-start">
            <aside className="md:sticky md:top-10">
                <NavBar
                    isLoggedIn={await hasValidToken()}
                    hasCurrentGame={Boolean(await getCurrentGame())}
                />
            </aside>
            <main className="flex min-w-0 items-center justify-center text-center">
                <div className="flex w-full max-w-4xl flex-col items-center justify-center">
                    {children}
                </div>
            </main>
        </div>
    );
}
