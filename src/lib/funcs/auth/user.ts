"use server";

import { getSessionToken } from "./session";
import db from "@/db";

export default async function getCurrentUser() {
    const session = await getSessionToken();
    if (!session) return null;

    const user = await db.query.sessions
        .findFirst({
            where: (sessions, { eq }) => eq(sessions.token, session),
            with: {
                user: true,
            },
        })
        .then((result) => result?.user || null);

    return user;
}
