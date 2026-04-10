"use client";

export default function Heading({ new: isNew = false }: { new?: boolean }) {
    return (
        <>
            <h1 className="w-full self-center justify-self-center text-center font-bold">
                {isNew ? "Create New Game" : "Continue Game"}
            </h1>

            <hr className="w-30 border border-white" />
        </>
    );
}
