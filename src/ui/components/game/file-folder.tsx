interface FileProps {
    name: string;
}

const fileFolderClasses =
    "mx-3 my-5 flex h-30 w-50 select-none rounded-4xl px-3 py-2 text-center text-2xl pointer-events-none cursor-default";

export function File({ name }: FileProps) {
    return (
        <div
            aria-disabled="true"
            className={`${fileFolderClasses} items-center justify-center border border-black/10 bg-gray-300 text-black`}
        >
            {name}
        </div>
    );
}

export function Folder({ name }: FileProps) {
    return (
        <div
            aria-disabled="true"
            className={`${fileFolderClasses} flex-col bg-gray-500 text-white`}
        >
            <hr className="mt-2 w-50 self-center border border-black" />
            <p className="flex flex-1 items-center justify-center">{name}</p>
        </div>
    );
}
