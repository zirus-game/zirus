"use client";

export default function ActionText({ new: isNew = false }: { new?: boolean }) {
    return (
        <p className="body max-w-2xl text-center text-lg text-blue-100/85">
            {isNew
                ? "Start a fresh run and make it your active game immediately."
                : "Pick one of your saved games and make it the active session."}
        </p>
    );
}
