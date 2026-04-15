"use client";

import clsx from "clsx";
import type { SubmitEventHandler } from "react";

type LogoutButtonProps = {
    className?: string;
    confirmMessage?: string;
};

export default function LogoutButton({
    className,
    confirmMessage = "Are you sure you want to log out?",
}: LogoutButtonProps) {
    const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
        if (!window.confirm(confirmMessage)) {
            event.preventDefault();
        }
    };

    const buttonClassName = clsx(
        "rounded-4xl bg-red-500/30 p-8 text-2xl font-normal text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-red-900",
        className,
    );

    return (
        <form action="/api/logout" method="get" onSubmit={handleSubmit}>
            <button type="submit" className={buttonClassName}>
                Logout
            </button>
        </form>
    );
}
