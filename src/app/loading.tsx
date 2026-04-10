export default function Loading() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 py-12">
            <div
                className="h-20 w-20 animate-spin rounded-full border-4 border-blue-200/30 border-t-blue-900"
                aria-hidden="true"
            />
            <p className="body text-center text-lg text-blue-100/85">
                Loading...
            </p>
        </main>
    );
}
