import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unauthorized | Zirus",
    description: "You are not authorized to view this page",
};

export default function UnauthorizedPage() {
    return (
        <main className="justify-center p-10">
            <h1 className="justify-self-center">Unauthorized</h1>
            <main className="justify-self-center text-lg">
                <p>You are not authorized to view this page</p>
                <p className="mb-5">
                    Did you login? Or do you not have an active game?
                </p>
                <Link href="/">Go back to home</Link>
                <br />
                or
                <br />
                <Link href="/login">Log In</Link> / <Link href="/signup">Sign Up</Link>
            </main>
        </main>
    );
}
