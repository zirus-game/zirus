import LogoutButton from "@/ui/components/auth/logout-button";
import Link from "next/link";
import { hasValidToken } from "../../lib/funcs/auth/session";
import clsx from "clsx";

export default async function HomePage() {
    const buttonClasses = clsx(
        "rounded-4xl bg-blue-500/30 p-8 text-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-blue-900",
    );
    const tokenValid = await hasValidToken();
    return (
        <>
            <h1 className="mt-10 text-9xl font-bold text-blue-100 md:mt-20">
                Zirus
            </h1>

            <section className="mt-10 flex flex-wrap gap-5">
                {tokenValid ? (
                    <>
                        <Link href={"/main"} className={buttonClasses}>
                            Continue Playing
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link
                            href={"https://dev.zirus.io"}
                            className={buttonClasses}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Developer Page
                        </Link>
                        <Link
                            href={"https://journey.zirus.io"}
                            className={buttonClasses}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Journey Page
                        </Link>
                        <Link
                            href={"https://github.com/zirus-game/zirus"}
                            className={buttonClasses}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </Link>
                    </>
                )}
            </section>
        </>
    );
}
