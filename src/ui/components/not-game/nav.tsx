"use client";

import Link from "next/link";
import Image from "next/image";

export default function NavBar({
    isLoggedIn,
    hasCurrentGame,
}: {
    isLoggedIn: boolean;
    hasCurrentGame: boolean;
}) {
    return (
        <nav className="flex w-full flex-col items-center gap-4 rounded-4xl bg-gray-900/90 p-5 text-center md:min-h-[calc(100vh-5rem)] md:w-40">
            <Image
                src="/vercel.svg" // TODO: Replace with actual logo
                alt="Logo"
                width={1155}
                height={1000}
                style={{ width: "50px", height: "auto" }}
                className="mt-4"
            />
            <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-4 text-2xl md:flex-1 md:flex-col">
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link href={"/main"}>Main</Link>
                        </li>
                        {hasCurrentGame && (
                            <li>
                                <Link href={"/game"}>Game</Link>
                            </li>
                        )}
                    </>
                ) : (
                    <>
                        <li>
                            <Link href={"/login"}>Log In</Link>
                        </li>
                        <li>
                            <Link href={"/signup"}>Sign Up</Link>
                        </li>
                    </>
                )}
                <li>
                    <Link href={"/about"}>About</Link>
                </li>
            </ul>
            <span className="flex items-center gap-4">
                <i>Zirus v1.0.0</i>
                <Link href="https://github.com/zirus-game/zirus">
                    <Image
                        src="/github-logo-black.png"
                        alt="GitHub Logo"
                        width={30}
                        height={30}
                    />
                </Link>
            </span>
        </nav>
    );
}
