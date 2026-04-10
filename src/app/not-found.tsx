import Link from "next/link";
export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h1>404 Not Found</h1>
            <Link href={"/"}>Go back to Home</Link>
        </main>
    );
}
