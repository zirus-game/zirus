"use client";

import Link from "next/link";

export default function BackToMainLink() {
    return (
        <Link
            href="/main"
            className="body self-start text-sm text-blue-200/70 hover:text-blue-100"
        >
            ← Back to main
        </Link>
    );
}
