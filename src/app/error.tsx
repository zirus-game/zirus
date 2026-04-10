"use client";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">An error occurred</h1>
            <p className="mt-4 text-gray-500">
                Sorry, something went wrong. Please try again later.
            </p>
            <button onClick={reset} className="mt-4">
                Try Again
            </button>
        </main>
    );
}
