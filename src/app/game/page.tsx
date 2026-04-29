import { hasTokenOrUnauthorized } from "@/lib/funcs/auth/session";
import getCurrentGame from "@/lib/funcs/game/getGame";
import { File, Folder } from "@/ui/components/game/file-folder";
import type { Metadata } from "next";
import Image from "next/image";
import { exampleFiles, exampleFolders } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Game | Zirus",
    description: "Continue your last game or start a new one.",
};

export default async function GamePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let { dir } = await searchParams;
    if (typeof dir !== "string") dir = "C:\\";
    else dir = dir.toLowerCase();
    return (
        <main className="flex h-full flex-col">
            <section className="flex flex-1/10 border border-white">
                <section className="flex basis-1/5 items-center justify-center border-r border-white">
                    <button className="rounded-3xl bg-red-500 p-5 px-10 text-2xl hover:bg-red-600">
                        Exit
                    </button>
                </section>
                <section className="flex flex-1 items-center justify-between px-10">
                    <div className="flex items-center gap-5">
                        <Image
                            src={"/settings.png"}
                            alt="settings icon"
                            width={100}
                            height={100}
                            loading="eager"
                        />
                        <Image
                            src={"/save.png"}
                            alt="save icon"
                            width={100}
                            height={100}
                            loading="eager"
                        />
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400 text-center text-black">
                        Profile
                    </div>
                </section>
            </section>
            <section className="flex flex-4/5 border-x border-b border-white">
                <section className="flex flex-1 flex-col border-r border-r-white p-8">
                    <section className="flex flex-1 flex-wrap content-start overflow-y-auto rounded-4xl">
                        {exampleFolders.map((folderName) => (
                            <Folder key={folderName} name={folderName} />
                        ))}
                        {exampleFiles.map((fileName) => (
                            <File key={fileName} name={fileName} />
                        ))}
                    </section>
                    <footer>
                        <p className="text-sm text-gray-500">
                            Current Directory: {dir}
                        </p>
                    </footer>
                </section>
                <section className="flex min-w-56 shrink-0 basis-1/5 flex-col justify-between p-6">
                    <div>
                        <h2 className="mb-4">Status</h2>
                    </div>
                    <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">
                        Preview Only
                    </p>
                </section>
            </section>
        </main>
    );
}
