import Link from "next/link";

type HomeButtonsProps = {
    hasSavedGames: boolean;
    hasCurrentGame: boolean;
};

export default function HomeButtons({
    hasSavedGames,
    hasCurrentGame,
}: HomeButtonsProps) {
    const actionBtnsClasses =
        "body inline-flex items-center justify-center bg-[#5080ad] text-2xl font-bold text-black rounded-4xl hover:bg-[#345ca7] hover:-translate-y-[1px] p-10 hover:no-underline transition-all duration-200 text-center";
    return (
        <div className="mt-5 flex flex-wrap justify-center gap-5">
            <Link href="/main/new" className={actionBtnsClasses}>
                Create a game
            </Link>
            {hasSavedGames && (
                <Link href="/main/continue" className={actionBtnsClasses}>
                    Continue a game
                </Link>
            )}
            {hasCurrentGame && (
                <Link href="/game" className={actionBtnsClasses}>
                    Continue your last game
                </Link>
            )}
        </div>
    );
}
